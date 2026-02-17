# База данных LinguaFlow

## 🗄️ Обзор

LinguaFlow использует PostgreSQL через Supabase с полной поддержкой Row Level Security (RLS), триггеров и пользовательских функций. База данных спроектирована для поддержки всех функций приложения: обучения, геймификации, аналитики и системы карточек.

## 📊 Схема базы данных

### Основные таблицы

#### Пользователи и аутентификация

**profiles** - Профили пользователей
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**user_settings** - Настройки пользователя
```sql
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  language_preference TEXT DEFAULT 'ru',
  theme_preference TEXT DEFAULT 'system',
  notifications_enabled BOOLEAN DEFAULT true,
  sound_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**user_streaks** - Серии обучения
```sql
CREATE TABLE user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Учебный контент

**languages** - Поддерживаемые языки
```sql
CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  flag_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**courses** - Курсы по уровням
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language_id UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color_scheme JSONB,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**themes** - Темы курсов
```sql
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  color_scheme JSONB,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**lessons** - Интерактивные уроки
```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  slides JSONB NOT NULL DEFAULT '[]',
  estimated_duration INTEGER DEFAULT 15,
  xp_reward INTEGER DEFAULT 50,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**vocabulary** - Словарь
```sql
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language_id UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  translation TEXT NOT NULL,
  transcription TEXT,
  part_of_speech TEXT,
  difficulty_level INTEGER DEFAULT 1,
  usage_examples JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Прогресс и аналитика

**lesson_progress** - Прогресс уроков
```sql
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  current_slide INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  score DECIMAL(5,2) DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);
```

**learning_sessions** - Сессии обучения
```sql
CREATE TABLE learning_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  session_type TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  activities_completed INTEGER DEFAULT 0,
  accuracy_rate DECIMAL(5,2) DEFAULT 0,
  xp_earned INTEGER DEFAULT 0
);
```

**user_answers** - Детальные ответы
```sql
CREATE TABLE user_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  session_id UUID REFERENCES learning_sessions(id) ON DELETE SET NULL,
  slide_id TEXT NOT NULL,
  question_type TEXT NOT NULL,
  user_answer JSONB NOT NULL,
  correct_answer JSONB NOT NULL,
  is_correct BOOLEAN NOT NULL,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**user_statistics** - Ежедневная статистика
```sql
CREATE TABLE user_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  lessons_completed INTEGER DEFAULT 0,
  flashcards_reviewed INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  accuracy_rate DECIMAL(5,2) DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

#### Система карточек (SRS)

**flashcard_sets** - Наборы карточек
```sql
CREATE TABLE flashcard_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_system_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**flashcards** - Карточки с SRS данными
```sql
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vocabulary_id UUID NOT NULL REFERENCES vocabulary(id) ON DELETE CASCADE,
  flashcard_set_id UUID REFERENCES flashcard_sets(id) ON DELETE SET NULL,
  ease_factor DECIMAL(3,2) DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  next_review TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, vocabulary_id)
);
```

**flashcard_reviews** - История повторений
```sql
CREATE TABLE flashcard_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 4),
  response_time INTEGER,
  previous_ease_factor DECIMAL(3,2),
  new_ease_factor DECIMAL(3,2),
  previous_interval INTEGER,
  new_interval INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Геймификация

**achievements** - Определения достижений
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  condition_data JSONB NOT NULL,
  icon_name TEXT,
  color_scheme JSONB,
  xp_reward INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**user_achievements** - Полученные достижения
```sql
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
```

**notifications** - Уведомления
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔧 Функции базы данных

### Система обучения

**start_learning_session** - Начать сессию обучения
```sql
CREATE OR REPLACE FUNCTION start_learning_session(
  p_user_id UUID,
  p_lesson_id UUID DEFAULT NULL,
  p_session_type TEXT DEFAULT 'lesson'
)
RETURNS UUID AS $$
DECLARE
  session_id UUID;
BEGIN
  INSERT INTO learning_sessions (user_id, lesson_id, session_type)
  VALUES (p_user_id, p_lesson_id, p_session_type)
  RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**end_learning_session** - Завершить сессию
```sql
CREATE OR REPLACE FUNCTION end_learning_session(
  p_session_id UUID,
  p_activities_completed INTEGER DEFAULT 0,
  p_accuracy_rate DECIMAL DEFAULT 0
)
RETURNS VOID AS $$
DECLARE
  session_record learning_sessions%ROWTYPE;
  xp_earned INTEGER;
BEGIN
  SELECT * INTO session_record 
  FROM learning_sessions 
  WHERE id = p_session_id;
  
  -- Рассчитать заработанный опыт
  xp_earned := GREATEST(p_activities_completed * 10, 0);
  IF p_accuracy_rate >= 90 THEN
    xp_earned := xp_earned * 1.5;
  ELSIF p_accuracy_rate >= 80 THEN
    xp_earned := xp_earned * 1.2;
  END IF;
  
  -- Обновить сессию
  UPDATE learning_sessions 
  SET 
    ended_at = NOW(),
    activities_completed = p_activities_completed,
    accuracy_rate = p_accuracy_rate,
    xp_earned = xp_earned
  WHERE id = p_session_id;
  
  -- Начислить опыт пользователю
  PERFORM award_xp(session_record.user_id, xp_earned, 'session', p_session_id);
  
  -- Обновить статистику
  PERFORM update_user_statistics(
    session_record.user_id,
    CURRENT_DATE,
    CASE WHEN session_record.session_type = 'lesson' THEN 1 ELSE 0 END,
    CASE WHEN session_record.session_type = 'flashcard' THEN p_activities_completed ELSE 0 END,
    EXTRACT(EPOCH FROM (NOW() - session_record.started_at))::INTEGER,
    p_accuracy_rate,
    xp_earned
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**record_user_answer** - Записать ответ пользователя
```sql
CREATE OR REPLACE FUNCTION record_user_answer(
  p_user_id UUID,
  p_lesson_id UUID,
  p_session_id UUID,
  p_slide_id TEXT,
  p_question_type TEXT,
  p_user_answer JSONB,
  p_correct_answer JSONB,
  p_is_correct BOOLEAN,
  p_response_time_ms INTEGER DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO user_answers (
    user_id, lesson_id, session_id, slide_id, question_type,
    user_answer, correct_answer, is_correct, response_time_ms
  )
  VALUES (
    p_user_id, p_lesson_id, p_session_id, p_slide_id, p_question_type,
    p_user_answer, p_correct_answer, p_is_correct, p_response_time_ms
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Система достижений

**award_xp** - Начислить опыт
```sql
CREATE OR REPLACE FUNCTION award_xp(
  p_user_id UUID,
  p_xp_amount INTEGER,
  p_source_type TEXT DEFAULT 'manual',
  p_source_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  old_level INTEGER;
  new_level INTEGER;
BEGIN
  -- Получить текущий уровень
  SELECT level INTO old_level FROM profiles WHERE id = p_user_id;
  
  -- Обновить опыт
  UPDATE profiles 
  SET xp = xp + p_xp_amount,
      updated_at = NOW()
  WHERE id = p_user_id;
  
  -- Рассчитать новый уровень
  SELECT calculate_user_level(xp) INTO new_level 
  FROM profiles WHERE id = p_user_id;
  
  -- Обновить уровень если изменился
  IF new_level > old_level THEN
    UPDATE profiles SET level = new_level WHERE id = p_user_id;
    
    -- Создать уведомление о повышении уровня
    PERFORM create_notification(
      p_user_id,
      'level_up',
      'Поздравляем!',
      format('Вы достигли %s уровня!', new_level),
      jsonb_build_object('old_level', old_level, 'new_level', new_level)
    );
  END IF;
  
  -- Проверить достижения
  PERFORM check_and_award_achievements(p_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**check_and_award_achievements** - Проверить и выдать достижения
```sql
CREATE OR REPLACE FUNCTION check_and_award_achievements(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  achievement_record achievements%ROWTYPE;
  user_stats RECORD;
BEGIN
  -- Получить статистику пользователя
  SELECT 
    p.xp, p.level,
    COUNT(DISTINCT lp.lesson_id) as lessons_completed,
    COUNT(DISTINCT fr.id) as flashcards_reviewed,
    us.current_streak
  INTO user_stats
  FROM profiles p
  LEFT JOIN lesson_progress lp ON lp.user_id = p.id AND lp.completed = true
  LEFT JOIN flashcard_reviews fr ON fr.user_id = p.id
  LEFT JOIN user_streaks us ON us.user_id = p.id
  WHERE p.id = p_user_id
  GROUP BY p.id, us.current_streak;
  
  -- Проверить каждое достижение
  FOR achievement_record IN 
    SELECT * FROM achievements 
    WHERE is_active = true 
    AND id NOT IN (
      SELECT achievement_id FROM user_achievements WHERE user_id = p_user_id
    )
  LOOP
    CASE achievement_record.type
      WHEN 'lesson_completion' THEN
        IF user_stats.lessons_completed >= (achievement_record.condition_data->>'lessons_count')::INTEGER THEN
          PERFORM award_achievement(p_user_id, achievement_record.id);
        END IF;
        
      WHEN 'xp_milestone' THEN
        IF user_stats.xp >= (achievement_record.condition_data->>'xp_amount')::INTEGER THEN
          PERFORM award_achievement(p_user_id, achievement_record.id);
        END IF;
        
      WHEN 'streak' THEN
        IF user_stats.current_streak >= (achievement_record.condition_data->>'days')::INTEGER THEN
          PERFORM award_achievement(p_user_id, achievement_record.id);
        END IF;
        
      WHEN 'flashcard_reviews' THEN
        IF user_stats.flashcards_reviewed >= (achievement_record.condition_data->>'reviews_count')::INTEGER THEN
          PERFORM award_achievement(p_user_id, achievement_record.id);
        END IF;
    END CASE;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Система карточек (SRS)

**get_due_flashcards** - Получить карточки для повторения
```sql
CREATE OR REPLACE FUNCTION get_due_flashcards(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  flashcard_id UUID,
  vocabulary_id UUID,
  word TEXT,
  translation TEXT,
  transcription TEXT,
  ease_factor DECIMAL,
  interval_days INTEGER,
  next_review TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.vocabulary_id,
    v.word,
    v.translation,
    v.transcription,
    f.ease_factor,
    f.interval_days,
    f.next_review
  FROM flashcards f
  JOIN vocabulary v ON v.id = f.vocabulary_id
  WHERE f.user_id = p_user_id
    AND f.next_review <= NOW()
  ORDER BY f.next_review ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**update_flashcard_review** - Обновить карточку после повторения
```sql
CREATE OR REPLACE FUNCTION update_flashcard_review(
  p_flashcard_id UUID,
  p_rating INTEGER,
  p_response_time INTEGER DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  card_record flashcards%ROWTYPE;
  new_ease_factor DECIMAL;
  new_interval INTEGER;
  new_repetitions INTEGER;
BEGIN
  -- Получить текущие данные карточки
  SELECT * INTO card_record FROM flashcards WHERE id = p_flashcard_id;
  
  -- Рассчитать новые параметры по алгоритму SM-2
  CASE p_rating
    WHEN 1 THEN -- Снова
      new_repetitions := 0;
      new_interval := 1;
      new_ease_factor := GREATEST(card_record.ease_factor - 0.2, 1.3);
      
    WHEN 2 THEN -- Трудно
      new_repetitions := card_record.repetitions + 1;
      new_interval := GREATEST(card_record.interval_days * 1.2, 1)::INTEGER;
      new_ease_factor := GREATEST(card_record.ease_factor - 0.15, 1.3);
      
    WHEN 3 THEN -- Хорошо
      new_repetitions := card_record.repetitions + 1;
      IF new_repetitions = 1 THEN
        new_interval := 1;
      ELSIF new_repetitions = 2 THEN
        new_interval := 6;
      ELSE
        new_interval := (card_record.interval_days * card_record.ease_factor)::INTEGER;
      END IF;
      new_ease_factor := card_record.ease_factor;
      
    WHEN 4 THEN -- Легко
      new_repetitions := card_record.repetitions + 1;
      new_interval := (card_record.interval_days * card_record.ease_factor * 1.3)::INTEGER;
      new_ease_factor := card_record.ease_factor + 0.15;
  END CASE;
  
  -- Записать историю повторения
  INSERT INTO flashcard_reviews (
    user_id, flashcard_id, rating, response_time,
    previous_ease_factor, new_ease_factor,
    previous_interval, new_interval
  )
  VALUES (
    card_record.user_id, p_flashcard_id, p_rating, p_response_time,
    card_record.ease_factor, new_ease_factor,
    card_record.interval_days, new_interval
  );
  
  -- Обновить карточку
  UPDATE flashcards
  SET 
    ease_factor = new_ease_factor,
    interval_days = new_interval,
    repetitions = new_repetitions,
    next_review = NOW() + (new_interval || ' days')::INTERVAL,
    updated_at = NOW()
  WHERE id = p_flashcard_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Утилиты

**calculate_user_level** - Рассчитать уровень по опыту
```sql
CREATE OR REPLACE FUNCTION calculate_user_level(p_xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Формула: Уровень = sqrt(XP / 100)
  RETURN GREATEST(FLOOR(SQRT(p_xp / 100.0))::INTEGER, 1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;
```

**update_user_streak** - Обновить серию обучения
```sql
CREATE OR REPLACE FUNCTION update_user_streak(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  streak_record user_streaks%ROWTYPE;
  today DATE := CURRENT_DATE;
  yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
BEGIN
  SELECT * INTO streak_record FROM user_streaks WHERE user_id = p_user_id;
  
  IF streak_record.last_activity_date IS NULL THEN
    -- Первая активность
    UPDATE user_streaks 
    SET 
      current_streak = 1,
      longest_streak = 1,
      last_activity_date = today,
      updated_at = NOW()
    WHERE user_id = p_user_id;
    
  ELSIF streak_record.last_activity_date = yesterday THEN
    -- Продолжение серии
    UPDATE user_streaks 
    SET 
      current_streak = current_streak + 1,
      longest_streak = GREATEST(longest_streak, current_streak + 1),
      last_activity_date = today,
      updated_at = NOW()
    WHERE user_id = p_user_id;
    
  ELSIF streak_record.last_activity_date < yesterday THEN
    -- Серия прервана
    UPDATE user_streaks 
    SET 
      current_streak = 1,
      last_activity_date = today,
      updated_at = NOW()
    WHERE user_id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 🔒 Row Level Security (RLS)

### Политики безопасности

**Профили пользователей**
```sql
-- Пользователи видят только свой профиль
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

**Прогресс обучения**
```sql
-- Пользователи видят только свой прогресс
CREATE POLICY "Users can view own progress" ON lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);
```

**Карточки**
```sql
-- Пользователи управляют только своими карточками
CREATE POLICY "Users can manage own flashcards" ON flashcards
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own flashcard reviews" ON flashcard_reviews
  FOR SELECT USING (auth.uid() = user_id);
```

**Публичный контент**
```sql
-- Все могут читать учебный контент
CREATE POLICY "Anyone can view languages" ON languages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view lessons" ON lessons
  FOR SELECT USING (is_active = true);
```

**Административный доступ**
```sql
-- Админы могут управлять контентом
CREATE POLICY "Admins can manage content" ON lessons
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND (profiles.role = 'admin' OR profiles.role = 'content_manager')
    )
  );
```

## 🔄 Триггеры

### Автоматические действия

**Создание профиля при регистрации**
```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  
  INSERT INTO user_settings (user_id) VALUES (NEW.id);
  INSERT INTO user_streaks (user_id) VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

**Обновление уровня при изменении опыта**
```sql
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
DECLARE
  new_level INTEGER;
BEGIN
  IF NEW.xp != OLD.xp THEN
    new_level := calculate_user_level(NEW.xp);
    IF new_level != NEW.level THEN
      NEW.level := new_level;
    END IF;
  END IF;
  
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profile_level
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_user_level();
```

**Обновление timestamp полей**
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Применить ко всем таблицам с updated_at
CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 📈 Индексы для производительности

### Основные индексы

```sql
-- Пользовательские данные
CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_flashcards_user_id ON flashcards(user_id);
CREATE INDEX idx_flashcards_next_review ON flashcards(next_review) WHERE next_review <= NOW();

-- Учебный контент
CREATE INDEX idx_lessons_theme_id ON lessons(theme_id);
CREATE INDEX idx_themes_course_id ON themes(course_id);
CREATE INDEX idx_courses_language_id ON courses(language_id);

-- Статистика и аналитика
CREATE INDEX idx_user_statistics_user_date ON user_statistics(user_id, date);
CREATE INDEX idx_learning_sessions_user_id ON learning_sessions(user_id);
CREATE INDEX idx_user_answers_user_lesson ON user_answers(user_id, lesson_id);

-- Геймификация
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id) WHERE is_read = false;
```

## 🚀 Миграции

### Применение миграций

Все миграции находятся в папке `supabase/migrations/` и применяются автоматически при деплое:

1. **20240101000000_initial_schema.sql** - Основная схема БД
2. **20240101000001_rls_policies.sql** - RLS политики
3. **20240101000002_database_functions.sql** - Пользовательские функции
4. **20240101000003_seed_data.sql** - Начальные данные
5. **20240101000004_additional_tables.sql** - Дополнительные таблицы
6. **20240101000005_additional_rls_policies.sql** - RLS для новых таблиц
7. **20240101000006_additional_functions.sql** - Дополнительные функции
8. **20240101000007_additional_triggers.sql** - Триггеры

### Создание новой миграции

```bash
# Создать новую миграцию
supabase migration new add_new_feature

# Применить миграции локально
supabase db reset

# Применить на продакшене
supabase db push
```

## 📊 Аналитика и отчеты

### Полезные запросы

**Статистика пользователя**
```sql
SELECT 
  p.name,
  p.xp,
  p.level,
  COUNT(DISTINCT lp.lesson_id) as lessons_completed,
  COUNT(DISTINCT fr.id) as flashcards_reviewed,
  us.current_streak,
  us.longest_streak
FROM profiles p
LEFT JOIN lesson_progress lp ON lp.user_id = p.id AND lp.completed = true
LEFT JOIN flashcard_reviews fr ON fr.user_id = p.id
LEFT JOIN user_streaks us ON us.user_id = p.id
WHERE p.id = $1
GROUP BY p.id, us.current_streak, us.longest_streak;
```

**Топ активных пользователей**
```sql
SELECT 
  p.name,
  p.xp,
  p.level,
  COUNT(DISTINCT lp.lesson_id) as lessons_completed
FROM profiles p
LEFT JOIN lesson_progress lp ON lp.user_id = p.id AND lp.completed = true
GROUP BY p.id
ORDER BY p.xp DESC
LIMIT 10;
```

**Статистика по урокам**
```sql
SELECT 
  l.name,
  COUNT(lp.id) as total_attempts,
  COUNT(CASE WHEN lp.completed THEN 1 END) as completions,
  AVG(lp.score) as average_score,
  AVG(lp.time_spent) as average_time
FROM lessons l
LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id
GROUP BY l.id, l.name
ORDER BY completions DESC;
```

## 🔧 Обслуживание

### Регулярные задачи

**Очистка старых сессий**
```sql
DELETE FROM learning_sessions 
WHERE ended_at IS NULL 
AND started_at < NOW() - INTERVAL '24 hours';
```

**Архивация старых уведомлений**
```sql
DELETE FROM notifications 
WHERE created_at < NOW() - INTERVAL '30 days' 
AND is_read = true;
```

**Обновление статистики**
```sql
-- Пересчет уровней всех пользователей
UPDATE profiles 
SET level = calculate_user_level(xp) 
WHERE level != calculate_user_level(xp);
```

### Мониторинг производительности

```sql
-- Медленные запросы
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;

-- Размер таблиц
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## 🛡️ Безопасность

### Лучшие практики

1. **RLS включен** для всех пользовательских таблиц
2. **Функции SECURITY DEFINER** для системных операций
3. **Валидация данных** на уровне БД (CHECK constraints)
4. **Аудит изменений** через триггеры
5. **Регулярные бэкапы** через Supabase

### Проверка безопасности

```sql
-- Проверить включен ли RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = false;

-- Проверить политики RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public';
```

База данных LinguaFlow спроектирована для высокой производительности, безопасности и масштабируемости, поддерживая все функции современного приложения для изучения языков.