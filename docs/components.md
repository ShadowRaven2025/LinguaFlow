# Руководство по компонентам

## 🧩 Обзор компонентов

LinguaFlow использует модульную архитектуру компонентов, основанную на shadcn/ui и собственных специализированных компонентах.

## 🎨 UI компоненты (shadcn/ui)

### Button

Универсальный компонент кнопки с различными вариантами стилизации.

```tsx
import { Button } from '@/components/ui/button'

// Основные варианты
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Размеры
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>

// С иконками
<Button>
  <Play className="w-4 h-4 mr-2" />
  Начать урок
</Button>
```

### Card

Контейнер для группировки связанного контента.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Название карточки</CardTitle>
    <CardDescription>Описание карточки</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Содержимое карточки</p>
  </CardContent>
</Card>
```

### Progress

Индикатор прогресса с анимацией.

```tsx
import { Progress } from '@/components/ui/progress'

<Progress value={75} className="h-3" />

// С подписями
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Прогресс</span>
    <span>75%</span>
  </div>
  <Progress value={75} />
</div>
```

### Dialog

Модальные окна для важных действий.

```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Открыть диалог</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Заголовок</DialogTitle>
      <DialogDescription>Описание диалога</DialogDescription>
    </DialogHeader>
    <div>Содержимое диалога</div>
  </DialogContent>
</Dialog>
```

### Toast

Уведомления для обратной связи с пользователем.

```tsx
import { useToast } from '@/hooks/use-toast'

const { toast } = useToast()

// Успешное уведомление
toast({
  title: "Успешно!",
  description: "Урок завершен",
})

// Ошибка
toast({
  variant: "destructive",
  title: "Ошибка",
  description: "Что-то пошло не так",
})
```

## 🎓 Специализированные компоненты

### LessonPlayer

Основной компонент для проигрывания интерактивных уроков.

```tsx
import { LessonPlayer } from '@/components/lessons/lesson-player'

<LessonPlayer
  lesson={lesson}
  onProgress={(slideIndex, progress) => {
    // Сохранить прогресс
  }}
  onComplete={(score, timeSpent) => {
    // Урок завершен
  }}
/>
```

**Пропсы:**
- `lesson: Lesson` - Данные урока
- `onProgress?: (slideIndex: number, progress: number) => void` - Колбэк прогресса
- `onComplete?: (score: number, timeSpent: number) => void` - Колбэк завершения

**Поддерживаемые типы слайдов:**
- `theory` - Теоретический материал
- `quiz_single` - Одиночный выбор
- `quiz_multiple` - Множественный выбор
- `fill_gap` - Заполнение пропусков
- `match` - Сопоставление

### FlashcardReview

Компонент для повторения карточек с SRS алгоритмом.

```tsx
import { FlashcardReview } from '@/components/flashcards/flashcard-review'

<FlashcardReview
  flashcards={flashcards}
  onReview={(flashcardId, rating, responseTime) => {
    // Обработать результат повторения
  }}
  onComplete={(reviewedCount, accuracy) => {
    // Сессия повторения завершена
  }}
/>
```

**Пропсы:**
- `flashcards: Flashcard[]` - Карточки для повторения
- `onReview?: (id: string, rating: number, responseTime: number) => void`
- `onComplete?: (reviewedCount: number, accuracy: number) => void`

**Рейтинги:**
- `1` - Снова (неправильно)
- `2` - Трудно (правильно, но сложно)
- `3` - Хорошо (правильно)
- `4` - Легко (очень легко)

### ProgressChart

Компонент для отображения графиков прогресса пользователя.

```tsx
import { ProgressChart } from '@/components/charts/progress-chart'

<ProgressChart
  data={[
    { date: '2024-01-01', xp: 100, lessonsCompleted: 2, wordsLearned: 15 },
    { date: '2024-01-02', xp: 150, lessonsCompleted: 1, wordsLearned: 8 },
  ]}
/>
```

**Пропсы:**
- `data: ProgressData[]` - Данные для графика

**Типы графиков:**
- Линейный график XP
- Столбчатая диаграмма уроков и слов

### AchievementCard

Карточка достижения с анимацией.

```tsx
import { AchievementCard } from '@/components/achievements/achievement-card'

<AchievementCard
  achievement={achievement}
  earned={true}
  earnedAt="2024-01-01T12:00:00Z"
  onClick={() => {
    // Показать детали достижения
  }}
/>
```

**Пропсы:**
- `achievement: Achievement` - Данные достижения
- `earned: boolean` - Получено ли достижение
- `earnedAt?: string` - Дата получения
- `onClick?: () => void` - Обработчик клика

### ThemeToggle

Переключатель темы с анимацией.

```tsx
import { ThemeToggle } from '@/components/theme-toggle'

<ThemeToggle />
```

Автоматически определяет текущую тему и позволяет переключаться между светлой и темной.

### SearchDialog

Диалог поиска с быстрыми клавишами.

```tsx
import { SearchDialog } from '@/components/search/search-dialog'

<SearchDialog
  open={searchOpen}
  onOpenChange={setSearchOpen}
/>
```

**Особенности:**
- Открывается по Cmd/Ctrl + K
- Поиск по урокам, словам, достижениям
- Быстрая навигация

## 🎯 Паттерны использования

### Композиция компонентов

```tsx
// Карточка урока
<Card className="group hover:shadow-lg transition-all">
  <CardHeader>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <div>
        <CardTitle>{lesson.name}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span>Прогресс</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} />
      <Button className="w-full">
        <Play className="w-4 h-4 mr-2" />
        Продолжить
      </Button>
    </div>
  </CardContent>
</Card>
```

### Условный рендеринг

```tsx
// Отображение разного контента в зависимости от состояния
{lesson.completed ? (
  <Badge variant="success">
    <CheckCircle className="w-4 h-4 mr-1" />
    Завершено
  </Badge>
) : lesson.progress > 0 ? (
  <Badge variant="warning">
    <Clock className="w-4 h-4 mr-1" />
    В процессе
  </Badge>
) : (
  <Badge variant="secondary">
    <Play className="w-4 h-4 mr-1" />
    Начать
  </Badge>
)}
```

### Обработка состояний загрузки

```tsx
// Скелетон для загрузки
{loading ? (
  <div className="space-y-4">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-8 w-1/2" />
  </div>
) : (
  <LessonContent lesson={lesson} />
)}
```

## 🎨 Стилизация

### Tailwind CSS классы

```tsx
// Градиенты
<div className="bg-gradient-to-r from-blue-500 to-purple-600">

// Анимации
<div className="transition-all duration-300 hover:scale-105">

// Адаптивность
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Темная тема
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### CSS переменные

```css
/* Основные цвета */
--primary: 222.2 84% 4.9%;
--primary-foreground: 210 40% 98%;

/* Фоновые цвета */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;

/* Границы */
--border: 214.3 31.8% 91.4%;
--input: 214.3 31.8% 91.4%;
```

## 🔧 Создание собственных компонентов

### Базовый шаблон

```tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface MyComponentProps {
  className?: string
  children?: React.ReactNode
  // Другие пропсы
}

const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "base-styles",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

MyComponent.displayName = "MyComponent"

export { MyComponent }
```

### Компонент с вариантами

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const myComponentVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles",
      },
      size: {
        default: "default-size",
        sm: "small-size",
        lg: "large-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface MyComponentProps extends VariantProps<typeof myComponentVariants> {
  className?: string
}

const MyComponent = ({ className, variant, size, ...props }: MyComponentProps) => {
  return (
    <div
      className={cn(myComponentVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

## 📱 Адаптивность

### Breakpoints

```tsx
// Tailwind breakpoints
sm: '640px'   // Планшеты
md: '768px'   // Планшеты (альбомная)
lg: '1024px'  // Ноутбуки
xl: '1280px'  // Десктопы
2xl: '1536px' // Большие экраны

// Использование
<div className="text-sm md:text-base lg:text-lg">
  Адаптивный текст
</div>
```

### Mobile-first подход

```tsx
// Сначала мобильные стили, затем для больших экранов
<div className="
  flex flex-col gap-2
  md:flex-row md:gap-4
  lg:gap-6
">
  Адаптивная раскладка
</div>
```

## ♿ Доступность

### ARIA атрибуты

```tsx
<Button
  aria-label="Начать урок Family Members"
  aria-describedby="lesson-description"
>
  Начать урок
</Button>

<div id="lesson-description" className="sr-only">
  Урок о членах семьи, продолжительность 15 минут
</div>
```

### Навигация с клавиатуры

```tsx
<div
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  Интерактивный элемент
</div>
```

### Screen reader поддержка

```tsx
<div aria-live="polite" aria-atomic="true">
  {notification && (
    <div role="alert">
      {notification.message}
    </div>
  )}
</div>
```