-- Row Level Security (RLS) policies for LinguaFlow
-- This migration enables RLS and creates security policies for all tables

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
-- Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles (anonymized in application layer)
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Languages policies
-- Everyone can read languages (public content)
CREATE POLICY "Anyone can view languages" ON languages
  FOR SELECT USING (true);

-- Only admins can manage languages
CREATE POLICY "Admins can manage languages" ON languages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Courses policies
-- Everyone can read courses (public content)
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (true);

-- Only admins can manage courses
CREATE POLICY "Admins can manage courses" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Themes policies
-- Everyone can read themes (public content)
CREATE POLICY "Anyone can view themes" ON themes
  FOR SELECT USING (true);

-- Only admins can manage themes
CREATE POLICY "Admins can manage themes" ON themes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Lessons policies
-- Everyone can read lessons (public content)
CREATE POLICY "Anyone can view lessons" ON lessons
  FOR SELECT USING (true);

-- Only admins can manage lessons
CREATE POLICY "Admins can manage lessons" ON lessons
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Lesson progress policies
-- Users can only access their own progress
CREATE POLICY "Users can view own lesson progress" ON lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress" ON lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress" ON lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Admins can view all lesson progress for analytics
CREATE POLICY "Admins can view all lesson progress" ON lesson_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Vocabulary policies
-- Everyone can read vocabulary (public content)
CREATE POLICY "Anyone can view vocabulary" ON vocabulary
  FOR SELECT USING (true);

-- Only admins can manage vocabulary
CREATE POLICY "Admins can manage vocabulary" ON vocabulary
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Lesson vocabulary policies
-- Everyone can read lesson vocabulary associations (public content)
CREATE POLICY "Anyone can view lesson vocabulary" ON lesson_vocabulary
  FOR SELECT USING (true);

-- Only admins can manage lesson vocabulary associations
CREATE POLICY "Admins can manage lesson vocabulary" ON lesson_vocabulary
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Flashcard sets policies
-- Users can only access their own flashcard sets
CREATE POLICY "Users can view own flashcard sets" ON flashcard_sets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flashcard sets" ON flashcard_sets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcard sets" ON flashcard_sets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flashcard sets" ON flashcard_sets
  FOR DELETE USING (auth.uid() = user_id);

-- Flashcards policies
-- Users can only access flashcards from their own sets
CREATE POLICY "Users can view own flashcards" ON flashcards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM flashcard_sets 
      WHERE id = flashcards.set_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own flashcards" ON flashcards
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM flashcard_sets 
      WHERE id = flashcards.set_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own flashcards" ON flashcards
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM flashcard_sets 
      WHERE id = flashcards.set_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own flashcards" ON flashcards
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM flashcard_sets 
      WHERE id = flashcards.set_id AND user_id = auth.uid()
    )
  );

-- Flashcard reviews policies
-- Users can only access their own flashcard reviews
CREATE POLICY "Users can view own flashcard reviews" ON flashcard_reviews
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flashcard reviews" ON flashcard_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all flashcard reviews for analytics
CREATE POLICY "Admins can view all flashcard reviews" ON flashcard_reviews
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Achievements policies
-- Everyone can read achievement definitions (public content)
CREATE POLICY "Anyone can view achievements" ON achievements
  FOR SELECT USING (true);

-- Only admins can manage achievements
CREATE POLICY "Admins can manage achievements" ON achievements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User achievements policies
-- Users can only view their own achievements
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- System can insert achievements (via server-side functions)
CREATE POLICY "System can insert user achievements" ON user_achievements
  FOR INSERT WITH CHECK (true);

-- Admins can view all user achievements for analytics
CREATE POLICY "Admins can view all user achievements" ON user_achievements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User statistics policies
-- Users can only view their own statistics
CREATE POLICY "Users can view own statistics" ON user_statistics
  FOR SELECT USING (auth.uid() = user_id);

-- System can insert/update statistics (via server-side functions)
CREATE POLICY "System can manage user statistics" ON user_statistics
  FOR ALL WITH CHECK (true);

-- Admins can view all user statistics for analytics (anonymized in application layer)
CREATE POLICY "Admins can view all user statistics" ON user_statistics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );