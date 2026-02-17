-- Database functions for LinguaFlow
-- This migration creates utility functions and triggers

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user level based on XP
CREATE OR REPLACE FUNCTION public.calculate_user_level(xp_amount INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Level = sqrt(XP / 100)
  RETURN FLOOR(SQRT(xp_amount::FLOAT / 100.0));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to update user level when XP changes
CREATE OR REPLACE FUNCTION public.update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level = public.calculate_user_level(NEW.xp);
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update level when XP changes
CREATE TRIGGER update_profile_level
  BEFORE UPDATE OF xp ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_user_level();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update updated_at on relevant tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to award XP to user
CREATE OR REPLACE FUNCTION public.award_xp(
  user_uuid UUID,
  xp_amount INTEGER,
  source TEXT DEFAULT 'manual'
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles 
  SET xp = xp + xp_amount
  WHERE id = user_uuid;
  
  -- Log XP award in user statistics for today
  INSERT INTO user_statistics (user_id, date, xp_earned)
  VALUES (user_uuid, CURRENT_DATE, xp_amount)
  ON CONFLICT (user_id, date)
  DO UPDATE SET xp_earned = user_statistics.xp_earned + xp_amount;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION public.check_and_award_achievements(user_uuid UUID)
RETURNS VOID AS $$
DECLARE
  achievement_record RECORD;
  user_data RECORD;
BEGIN
  -- Get user data for achievement checking
  SELECT * INTO user_data FROM profiles WHERE id = user_uuid;
  
  -- Check each achievement type
  FOR achievement_record IN 
    SELECT * FROM achievements 
    WHERE id NOT IN (
      SELECT achievement_id FROM user_achievements WHERE user_id = user_uuid
    )
  LOOP
    -- This is a simplified version - in practice, you'd implement
    -- specific logic for each achievement type based on condition_data
    -- For now, we'll just create the structure
    
    -- Example: Check XP-based achievements
    IF achievement_record.type = 'xp_milestone' AND 
       user_data.xp >= (achievement_record.condition_data->>'required_xp')::INTEGER THEN
      
      INSERT INTO user_achievements (user_id, achievement_id)
      VALUES (user_uuid, achievement_record.id);
      
      -- Award XP bonus if specified
      IF achievement_record.xp_reward > 0 THEN
        PERFORM public.award_xp(user_uuid, achievement_record.xp_reward, 'achievement');
      END IF;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's due flashcards
CREATE OR REPLACE FUNCTION public.get_due_flashcards(user_uuid UUID)
RETURNS TABLE (
  flashcard_id UUID,
  vocabulary_id UUID,
  word TEXT,
  translation TEXT,
  transcription TEXT,
  audio_url TEXT,
  ease_factor DECIMAL,
  interval_days INTEGER,
  repetitions INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id as flashcard_id,
    v.id as vocabulary_id,
    v.word,
    v.translation,
    v.transcription,
    v.audio_url,
    f.ease_factor,
    f.interval_days,
    f.repetitions
  FROM flashcards f
  JOIN flashcard_sets fs ON f.set_id = fs.id
  JOIN vocabulary v ON f.vocabulary_id = v.id
  WHERE fs.user_id = user_uuid
    AND f.next_review <= NOW()
  ORDER BY f.next_review ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update flashcard after review (SRS algorithm)
CREATE OR REPLACE FUNCTION public.update_flashcard_review(
  flashcard_uuid UUID,
  user_uuid UUID,
  rating INTEGER,
  response_time_ms INTEGER DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  current_card RECORD;
  new_ease_factor DECIMAL;
  new_interval INTEGER;
  new_repetitions INTEGER;
BEGIN
  -- Get current flashcard data
  SELECT * INTO current_card FROM flashcards WHERE id = flashcard_uuid;
  
  -- Simplified SRS algorithm (based on SM-2)
  CASE rating
    WHEN 1 THEN -- Again
      new_repetitions := 0;
      new_interval := 1;
      new_ease_factor := GREATEST(1.3, current_card.ease_factor - 0.2);
    WHEN 2 THEN -- Hard
      new_repetitions := current_card.repetitions;
      new_interval := GREATEST(1, ROUND(current_card.interval_days * 1.2));
      new_ease_factor := GREATEST(1.3, current_card.ease_factor - 0.15);
    WHEN 3 THEN -- Good
      new_repetitions := current_card.repetitions + 1;
      IF new_repetitions = 1 THEN
        new_interval := 1;
      ELSIF new_repetitions = 2 THEN
        new_interval := 6;
      ELSE
        new_interval := ROUND(current_card.interval_days * current_card.ease_factor);
      END IF;
      new_ease_factor := current_card.ease_factor;
    WHEN 4 THEN -- Easy
      new_repetitions := current_card.repetitions + 1;
      IF new_repetitions = 1 THEN
        new_interval := 4;
      ELSE
        new_interval := ROUND(current_card.interval_days * current_card.ease_factor * 1.3);
      END IF;
      new_ease_factor := current_card.ease_factor + 0.15;
  END CASE;
  
  -- Update flashcard
  UPDATE flashcards 
  SET 
    ease_factor = new_ease_factor,
    interval_days = new_interval,
    repetitions = new_repetitions,
    next_review = NOW() + (new_interval || ' days')::INTERVAL
  WHERE id = flashcard_uuid;
  
  -- Record the review
  INSERT INTO flashcard_reviews (flashcard_id, user_id, rating, response_time, reviewed_at)
  VALUES (flashcard_uuid, user_uuid, rating, response_time_ms, NOW());
  
  -- Update daily statistics
  INSERT INTO user_statistics (user_id, date, flashcards_reviewed)
  VALUES (user_uuid, CURRENT_DATE, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET flashcards_reviewed = user_statistics.flashcards_reviewed + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;