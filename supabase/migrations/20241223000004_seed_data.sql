-- Seed data for LinguaFlow
-- This migration adds initial data for languages, sample courses, and achievements

-- Insert languages
INSERT INTO languages (id, code, name, flag_url) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'en', 'English', '/flags/en.svg'),
  ('550e8400-e29b-41d4-a716-446655440002', 'de', 'German', '/flags/de.svg');

-- Insert sample courses for English
INSERT INTO courses (id, language_id, level, name, description, order_index) VALUES
  ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 'A1', 'English Beginner', 'Basic English for absolute beginners', 1),
  ('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440001', 'A2', 'English Elementary', 'Elementary English skills', 2),
  ('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440001', 'B1', 'English Intermediate', 'Intermediate English proficiency', 3),
  ('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440001', 'B2', 'English Upper-Intermediate', 'Upper-intermediate English skills', 4);

-- Insert sample courses for German
INSERT INTO courses (id, language_id, level, name, description, order_index) VALUES
  ('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440002', 'A1', 'Deutsch Anfänger', 'Grundlegendes Deutsch für absolute Anfänger', 1),
  ('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440002', 'A2', 'Deutsch Grundstufe', 'Grundlegende Deutschkenntnisse', 2),
  ('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440002', 'B1', 'Deutsch Mittelstufe', 'Mittlere Deutschkenntnisse', 3),
  ('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440002', 'B2', 'Deutsch Oberstufe', 'Fortgeschrittene Deutschkenntnisse', 4);

-- Insert sample themes for English A1
INSERT INTO themes (id, course_id, name, description, order_index) VALUES
  ('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440011', 'Greetings and Introductions', 'Learn basic greetings and how to introduce yourself', 1),
  ('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440011', 'Numbers and Time', 'Master numbers, dates, and telling time', 2),
  ('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440011', 'Family and Friends', 'Vocabulary and expressions about family and relationships', 3);

-- Insert sample themes for German A1
INSERT INTO themes (id, course_id, name, description, order_index) VALUES
  ('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440021', 'Begrüßung und Vorstellung', 'Grundlegende Begrüßungen und Selbstvorstellung lernen', 1),
  ('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440021', 'Zahlen und Zeit', 'Zahlen, Datum und Uhrzeiten meistern', 2),
  ('550e8400-e29b-41d4-a716-446655440043', '550e8400-e29b-41d4-a716-446655440021', 'Familie und Freunde', 'Wortschatz über Familie und Beziehungen', 3);

-- Insert sample lesson for English greetings theme
INSERT INTO lessons (id, theme_id, name, description, slides, order_index, estimated_duration) VALUES
  ('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440031', 'Basic Greetings', 'Learn essential greeting phrases', 
  '[
    {
      "id": "slide1",
      "type": "theory",
      "content": {
        "title": "Basic Greetings",
        "text": "In English, we use different greetings depending on the time of day and formality level.",
        "examples": ["Hello", "Hi", "Good morning", "Good afternoon", "Good evening"]
      }
    },
    {
      "id": "slide2",
      "type": "quiz_single",
      "content": {
        "question": "Which greeting is most appropriate in the morning?",
        "options": ["Good evening", "Good morning", "Good night", "Goodbye"],
        "correctAnswers": [1]
      },
      "feedback": "Good morning is the correct greeting to use in the morning hours."
    },
    {
      "id": "slide3",
      "type": "fill_gap",
      "content": {
        "question": "Complete the greeting: Good _____, how are you?",
        "gaps": [{"position": 0, "correctAnswers": ["morning", "afternoon", "evening"]}]
      },
      "feedback": "You can use morning, afternoon, or evening depending on the time of day."
    }
  ]'::jsonb, 1, 10);

-- Insert sample vocabulary
INSERT INTO vocabulary (id, language_id, word, transcription, translation, part_of_speech, example_sentence) VALUES
  ('550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440001', 'hello', '/həˈloʊ/', 'привет', 'interjection', 'Hello, how are you today?'),
  ('550e8400-e29b-41d4-a716-446655440062', '550e8400-e29b-41d4-a716-446655440001', 'good morning', '/ɡʊd ˈmɔrnɪŋ/', 'доброе утро', 'phrase', 'Good morning, everyone!'),
  ('550e8400-e29b-41d4-a716-446655440063', '550e8400-e29b-41d4-a716-446655440001', 'thank you', '/θæŋk ju/', 'спасибо', 'phrase', 'Thank you for your help.'),
  ('550e8400-e29b-41d4-a716-446655440064', '550e8400-e29b-41d4-a716-446655440002', 'hallo', '/ˈhalo/', 'привет', 'interjection', 'Hallo, wie geht es dir?'),
  ('550e8400-e29b-41d4-a716-446655440065', '550e8400-e29b-41d4-a716-446655440002', 'guten Morgen', '/ˈɡuːtən ˈmɔʁɡən/', 'доброе утро', 'phrase', 'Guten Morgen, alle zusammen!'),
  ('550e8400-e29b-41d4-a716-446655440066', '550e8400-e29b-41d4-a716-446655440002', 'danke', '/ˈdaŋkə/', 'спасибо', 'interjection', 'Danke für deine Hilfe.');

-- Link vocabulary to lesson
INSERT INTO lesson_vocabulary (lesson_id, vocabulary_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440061'),
  ('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440062'),
  ('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440063');

-- Insert achievement templates
INSERT INTO achievements (id, name, description, icon_url, type, condition_data, xp_reward) VALUES
  ('550e8400-e29b-41d4-a716-446655440071', 'First Steps', 'Complete your first lesson', '/icons/first-steps.svg', 'lesson_completion', '{"lessons_required": 1}', 50),
  ('550e8400-e29b-41d4-a716-446655440072', 'Streak Master', 'Answer 5 questions correctly in a row', '/icons/streak.svg', 'streak', '{"correct_answers": 5}', 100),
  ('550e8400-e29b-41d4-a716-446655440073', 'Explorer', 'Complete 3 different themes', '/icons/explorer.svg', 'explorer', '{"themes_required": 3}', 200),
  ('550e8400-e29b-41d4-a716-446655440074', 'Speed Learner', 'Complete a lesson with >90% accuracy in under 5 minutes', '/icons/sprinter.svg', 'sprinter', '{"accuracy_threshold": 90, "time_limit_minutes": 5}', 150),
  ('550e8400-e29b-41d4-a716-446655440075', 'Consistent Learner', 'Use the app for 7 consecutive days', '/icons/consistent.svg', 'consistent', '{"consecutive_days": 7}', 300),
  ('550e8400-e29b-41d4-a716-446655440076', 'Vocabulary Master', 'Learn 50 new words', '/icons/vocabulary.svg', 'vocabulary', '{"words_learned": 50}', 250),
  ('550e8400-e29b-41d4-a716-446655440077', 'XP Collector', 'Earn 1000 XP points', '/icons/xp.svg', 'xp_milestone', '{"required_xp": 1000}', 100);

-- Create a sample admin user profile (this would normally be created through the auth system)
-- This is just for demonstration - in practice, admin role would be assigned after user registration
-- INSERT INTO profiles (id, email, name, role) VALUES
--   ('550e8400-e29b-41d4-a716-446655440999', 'admin@linguaflow.com', 'Admin User', 'admin');