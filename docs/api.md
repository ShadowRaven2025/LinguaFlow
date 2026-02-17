# API Документация

## 🔗 Обзор API

LinguaFlow использует Supabase в качестве backend-as-a-service, что обеспечивает:
- Автоматическую аутентификацию
- Row Level Security (RLS)
- Real-time подписки
- Автоматическую генерацию API

## 🔐 Аутентификация

Все API запросы требуют аутентификации через Supabase Auth.

### Получение токена

```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data: { session } } = await supabase.auth.getSession()
const token = session?.access_token
```

### Заголовки запросов

```http
Authorization: Bearer <access_token>
apikey: <supabase_anon_key>
Content-Type: application/json
```

## 📚 Основные эндпоинты

### Аутентификация

#### Регистрация пользователя
```http
POST /auth/v1/signup
```

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Ответ:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

#### Вход пользователя
```http
POST /auth/v1/token?grant_type=password
```

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Профиль пользователя

#### Получить профиль
```http
GET /rest/v1/profiles?id=eq.{user_id}
```

**Ответ:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "xp": 1250,
  "level": 3,
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Обновить профиль
```http
PATCH /rest/v1/profiles?id=eq.{user_id}
```

**Тело запроса:**
```json
{
  "name": "John Smith",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

### Языки и курсы

#### Получить все языки
```http
GET /rest/v1/languages
```

**Ответ:**
```json
[
  {
    "id": "uuid",
    "code": "en",
    "name": "English",
    "flag_url": "https://flagcdn.com/w320/us.png"
  }
]
```

#### Получить курсы языка
```http
GET /rest/v1/courses?language_id=eq.{language_id}
```

**Ответ:**
```json
[
  {
    "id": "uuid",
    "language_id": "uuid",
    "level": "A1",
    "name": "English Beginner",
    "description": "Базовый курс английского языка"
  }
]
```

### Уроки

#### Получить темы курса
```http
GET /rest/v1/themes?course_id=eq.{course_id}
```

**Ответ:**
```json
[
  {
    "id": "uuid",
    "course_id": "uuid",
    "name": "Family and Relationships",
    "description": "Семья и отношения",
    "order_index": 1
  }
]
```

#### Получить уроки темы
```http
GET /rest/v1/lessons?theme_id=eq.{theme_id}
```

**Ответ:**
```json
[
  {
    "id": "uuid",
    "theme_id": "uuid",
    "name": "Family Members",
    "description": "Изучаем названия членов семьи",
    "slides": [...],
    "estimated_duration": 15
  }
]
```

#### Получить урок с прогрессом
```http
GET /rest/v1/lessons?id=eq.{lesson_id}&select=*,lesson_progress(*)
```

### Прогресс обучения

#### Сохранить прогресс урока
```http
POST /rest/v1/lesson_progress
```

**Тело запроса:**
```json
{
  "lesson_id": "uuid",
  "current_slide": 5,
  "completed": false,
  "score": 85.5,
  "time_spent": 900
}
```

#### Завершить урок
```http
PATCH /rest/v1/lesson_progress?lesson_id=eq.{lesson_id}&user_id=eq.{user_id}
```

**Тело запроса:**
```json
{
  "completed": true,
  "score": 92.0,
  "completed_at": "2024-01-01T12:00:00Z"
}
```

### Карточки (Flashcards)

#### Получить карточки для повторения
```http
GET /rest/v1/flashcards?next_review=lte.{current_timestamp}&select=*,vocabulary(*)
```

**Ответ:**
```json
[
  {
    "id": "uuid",
    "vocabulary_id": "uuid",
    "ease_factor": 2.5,
    "interval_days": 3,
    "next_review": "2024-01-01T12:00:00Z",
    "vocabulary": {
      "word": "family",
      "translation": "семья",
      "transcription": "/ˈfæməli/"
    }
  }
]
```

#### Отправить результат повторения
```http
POST /rest/v1/flashcard_reviews
```

**Тело запроса:**
```json
{
  "flashcard_id": "uuid",
  "rating": 3,
  "response_time": 2500
}
```

### Статистика

#### Получить статистику пользователя
```http
GET /rest/v1/user_statistics?user_id=eq.{user_id}&order=date.desc&limit=30
```

**Ответ:**
```json
[
  {
    "date": "2024-01-01",
    "lessons_completed": 2,
    "flashcards_reviewed": 15,
    "time_spent": 1800,
    "accuracy_rate": 88.5,
    "xp_earned": 120
  }
]
```

### Достижения

#### Получить все достижения
```http
GET /rest/v1/achievements
```

**Ответ:**
```json
[
  {
    "id": "uuid",
    "name": "Первые шаги",
    "description": "Завершите свой первый урок",
    "type": "lesson_completion",
    "condition_data": {"lessons_count": 1},
    "xp_reward": 50
  }
]
```

#### Получить достижения пользователя
```http
GET /rest/v1/user_achievements?user_id=eq.{user_id}&select=*,achievements(*)
```

## 🔧 Функции базы данных

### Пользовательские функции

#### Начать сессию обучения
```sql
SELECT start_learning_session(lesson_id, session_type);
```

#### Завершить сессию обучения
```sql
SELECT end_learning_session(session_id, activities_completed, accuracy_rate);
```

#### Записать ответ пользователя
```sql
SELECT record_user_answer(
  lesson_id, 
  session_id, 
  slide_id, 
  question_type, 
  user_answer, 
  correct_answer, 
  is_correct, 
  response_time_ms
);
```

#### Начислить опыт
```sql
SELECT award_xp(user_id, xp_amount, source_type, source_id);
```

#### Проверить достижения
```sql
SELECT check_and_award_achievements(user_id);
```

### Утилиты

#### Рассчитать уровень пользователя
```sql
SELECT calculate_user_level(xp_amount);
```

#### Получить карточки для повторения
```sql
SELECT get_due_flashcards(user_id, limit_count);
```

#### Обновить карточку после повторения
```sql
SELECT update_flashcard_review(flashcard_id, rating);
```

## 📊 Real-time подписки

### Подписка на изменения прогресса
```typescript
const subscription = supabase
  .channel('lesson_progress')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'lesson_progress',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    console.log('Progress updated:', payload)
  })
  .subscribe()
```

### Подписка на новые достижения
```typescript
const subscription = supabase
  .channel('user_achievements')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'user_achievements',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    console.log('New achievement:', payload)
  })
  .subscribe()
```

## ⚠️ Ограничения и лимиты

- **Rate limiting:** 100 запросов в минуту на пользователя
- **Размер запроса:** Максимум 1MB
- **Размер ответа:** Максимум 10MB
- **Timeout:** 30 секунд для обычных запросов
- **Real-time connections:** Максимум 100 одновременных подключений

## 🔍 Фильтрация и сортировка

### Операторы фильтрации
- `eq` - равно
- `neq` - не равно
- `gt` - больше
- `gte` - больше или равно
- `lt` - меньше
- `lte` - меньше или равно
- `like` - LIKE (с подстановочными знаками)
- `ilike` - ILIKE (без учета регистра)
- `in` - в списке значений
- `is` - IS (для null значений)

### Примеры фильтрации
```http
# Уроки с прогрессом больше 50%
GET /rest/v1/lesson_progress?score=gte.50

# Поиск по названию урока
GET /rest/v1/lessons?name=ilike.*family*

# Карточки с определенными рейтингами
GET /rest/v1/flashcard_reviews?rating=in.(3,4)
```

### Сортировка
```http
# По дате создания (убывание)
GET /rest/v1/lessons?order=created_at.desc

# По нескольким полям
GET /rest/v1/user_statistics?order=date.desc,xp_earned.desc
```

## 🚨 Обработка ошибок

### Коды ошибок HTTP
- `200` - Успешно
- `201` - Создано
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Доступ запрещен
- `404` - Не найдено
- `409` - Конфликт
- `422` - Неверные данные
- `500` - Внутренняя ошибка сервера

### Формат ошибок
```json
{
  "error": {
    "message": "Описание ошибки",
    "details": "Дополнительная информация",
    "hint": "Подсказка для исправления",
    "code": "ERROR_CODE"
  }
}
```

### Примеры обработки ошибок
```typescript
try {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single()

  if (error) {
    throw error
  }

  return data
} catch (error) {
  console.error('Error fetching lesson:', error.message)
  // Обработка ошибки
}
```