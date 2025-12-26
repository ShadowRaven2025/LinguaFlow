# Requirements Document

## Introduction

LinguaFlow - это адаптивное веб-приложение для самостоятельного изучения английского и немецкого языков с акцентом на интерактивное обучение через слайдовые уроки и эффективное запоминание лексики с помощью интеллектуальных карточек и геймификации.

## Glossary

- **System**: LinguaFlow веб-приложение
- **User**: Зарегистрированный пользователь приложения
- **Admin**: Администратор с правами управления контентом
- **Lesson**: Урок, состоящий из последовательности слайдов
- **Slide**: Отдельный элемент урока (теория, тест, упражнение)
- **Flashcard**: Карточка для изучения слов с алгоритмом интервального повторения
- **SRS**: Система интервального повторения (Spaced Repetition System)
- **XP**: Очки опыта пользователя
- **Achievement**: Достижение/ачивка пользователя
- **Course**: Курс определенного уровня (A1, B2 и т.д.)
- **Theme**: Тема внутри курса
- **Language**: Изучаемый язык (английский, немецкий)

## Requirements

### Requirement 1: User Authentication and Registration

**User Story:** Как пользователь, я хочу зарегистрироваться и войти в систему, чтобы получить доступ к персонализированному обучению.

#### Acceptance Criteria

1. WHEN a user provides valid email and password, THE System SHALL create a new account and send confirmation email
2. WHEN a user provides invalid email format, THE System SHALL reject registration and display validation error
3. WHEN a user enters correct credentials, THE System SHALL authenticate and redirect to dashboard
4. WHEN a user enters incorrect credentials, THE System SHALL display authentication error
5. WHEN a user requests password reset, THE System SHALL send reset link to registered email
6. THE System SHALL protect all authenticated routes from unauthorized access

### Requirement 2: User Profile Management

**User Story:** Как пользователь, я хочу управлять своим профилем и видеть свой прогресс, чтобы отслеживать достижения в изучении языка.

#### Acceptance Criteria

1. WHEN a user accesses profile page, THE System SHALL display avatar, name, email, and current level
2. WHEN displaying user level, THE System SHALL calculate it using formula: Level = sqrt(XP / 100)
3. WHEN showing progress panel, THE System SHALL visualize current level based on completed lessons and learned words
4. WHEN displaying statistics, THE System SHALL show graphs and numbers for daily and weekly metrics
5. THE System SHALL display collection of earned achievements as visual cards
6. WHEN a user changes password, THE System SHALL validate new password and update securely

### Requirement 3: Interactive Lesson System

**User Story:** Как пользователь, я хочу проходить интерактивные уроки, чтобы изучать язык через структурированный контент.

#### Acceptance Criteria

1. WHEN displaying lesson hierarchy, THE System SHALL organize content as Language -> Course -> Theme -> Lesson
2. WHEN a user starts a lesson, THE System SHALL present slides in linear sequence with navigation controls
3. WHEN displaying theory slide, THE System SHALL show text, images, and examples
4. WHEN presenting quiz_single slide, THE System SHALL show question with 4 answer options allowing single selection
5. WHEN presenting quiz_multiple slide, THE System SHALL show question allowing multiple correct answers selection
6. WHEN presenting fill_gap slide, THE System SHALL show sentence with fillable gaps
7. WHEN presenting match slide, THE System SHALL show two columns for element matching
8. WHEN a user answers interactive slide, THE System SHALL provide instant feedback with explanations
9. WHEN a user navigates lesson, THE System SHALL show progress indicator and enable Next/Back buttons
10. WHEN a user exits lesson, THE System SHALL save completion progress for later continuation

### Requirement 4: Flashcard Learning System

**User Story:** Как пользователь, я хочу изучать слова с помощью карточек и системы интервального повторения, чтобы эффективно запоминать лексику.

#### Acceptance Criteria

1. WHEN a user completes lessons, THE System SHALL automatically create flashcard sets from lesson vocabulary
2. WHEN a user creates custom flashcard set, THE System SHALL allow manual word addition and organization
3. WHEN displaying flashcard in learning mode, THE System SHALL show word/phrase in target language with audio playback option
4. WHEN a user flips flashcard, THE System SHALL reveal translation and usage examples
5. WHEN a user rates flashcard difficulty, THE System SHALL accept ratings ("Again", "Hard", "Good", "Easy") for SRS algorithm
6. WHEN running test mode, THE System SHALL present various formats: word writing by translation, translation selection by word
7. WHEN applying SRS algorithm, THE System SHALL schedule next review based on user's difficulty rating and previous performance

### Requirement 5: Gamification and Motivation System

**User Story:** Как пользователь, я хочу получать достижения и очки опыта, чтобы оставаться мотивированным в изучении языка.

#### Acceptance Criteria

1. WHEN a user completes lessons or flashcard tests, THE System SHALL award XP points based on performance
2. WHEN a user achieves specific milestones, THE System SHALL unlock achievements and display instant notification
3. WHEN displaying achievements, THE System SHALL show unique cards with title, description, icon, and earned date
4. THE System SHALL track "Streak" achievements for consecutive correct answers (5/10/20)
5. THE System SHALL track "Explorer" achievements for completing N themes
6. THE System SHALL track "Sprinter" achievements for completing lessons with >90% accuracy within time limit
7. THE System SHALL track "Consistent" achievements for daily app usage streaks
8. WHEN calculating user level, THE System SHALL use XP points with direct correlation to level progression

### Requirement 6: Administrative Content Management

**User Story:** Как администратор, я хочу управлять учебным контентом, чтобы создавать и редактировать уроки для пользователей.

#### Acceptance Criteria

1. WHEN an admin accesses admin panel, THE System SHALL verify admin role and grant access to /admin route
2. WHEN managing content hierarchy, THE System SHALL provide CRUD operations for languages, courses, themes, and lessons
3. WHEN creating lessons, THE System SHALL provide visual editor for assembling slides with live preview
4. WHEN editing lesson slides, THE System SHALL support all slide types: theory, quiz_single, quiz_multiple, fill_gap, match
5. THE System SHALL allow admins to preview lessons before publishing to users

### Requirement 7: Vocabulary Management

**User Story:** Как администратор, я хочу управлять словарем, чтобы обеспечить качественный контент для изучения.

#### Acceptance Criteria

1. WHEN adding vocabulary, THE System SHALL store word, transcription, translation, and part of speech
2. WHEN linking vocabulary to lessons, THE System SHALL allow association of words with specific lesson content
3. WHEN uploading audio files, THE System SHALL provide drag-and-drop interface for pronunciation files
4. THE System SHALL validate audio file formats and associate them with corresponding vocabulary entries

### Requirement 8: Achievement Management

**User Story:** Как администратор, я хочу создавать и настраивать достижения, чтобы мотивировать пользователей.

#### Acceptance Criteria

1. WHEN creating achievement templates, THE System SHALL allow configuration of title, description, icon, and trigger conditions
2. THE System SHALL support different achievement types with customizable logic and thresholds
3. WHEN achievement conditions are met, THE System SHALL automatically award achievement to qualifying users

### Requirement 9: User Monitoring and Analytics

**User Story:** Как администратор, я хочу видеть статистику пользователей, чтобы понимать использование приложения.

#### Acceptance Criteria

1. WHEN viewing user list, THE System SHALL display anonymized user information for privacy protection
2. WHEN showing platform statistics, THE System SHALL display active user count and completed lessons for specified periods
3. THE System SHALL provide basic analytics dashboard with key performance metrics

### Requirement 10: Performance and Security

**User Story:** Как пользователь, я хочу быстрое и безопасное приложение, чтобы комфортно изучать языки.

#### Acceptance Criteria

1. THE System SHALL achieve Core Web Vitals in green zone with FID < 100ms
2. THE System SHALL provide responsive design for all screen sizes from 320px to 1920px+
3. WHEN processing API requests, THE System SHALL use secure server actions or protected Supabase clients with RLS
4. THE System SHALL implement RLS policies for data isolation and content access control
5. THE System SHALL protect against common vulnerabilities (XSS, CSRF)
6. THE System SHALL use static generation (SSG) and incremental static regeneration (ISR) for lesson catalog pages