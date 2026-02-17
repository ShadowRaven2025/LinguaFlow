# Руководство по разработке

## 🚀 Быстрый старт

### Предварительные требования

- **Node.js** 18+ (рекомендуется 20+)
- **Bun** 1.0+ (пакетный менеджер)
- **Git** для контроля версий
- **Аккаунт Supabase** для базы данных

### Установка

1. **Клонирование репозитория:**
```bash
git clone https://github.com/your-username/linguaflow.git
cd linguaflow
```

2. **Установка зависимостей:**
```bash
bun install
```

3. **Настройка переменных окружения:**
```bash
cp .env.example .env.local
```

Заполните `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

4. **Запуск в режиме разработки:**
```bash
bun dev
```

Приложение будет доступно по адресу: http://localhost:3000

## 🛠️ Команды разработки

### Основные команды

```bash
# Разработка
bun dev                 # Запуск dev сервера
bun dev --turbo        # Запуск с Turbopack (экспериментально)

# Сборка
bun run build          # Сборка для продакшена
bun start              # Запуск продакшен сервера

# Качество кода
bun run lint           # ESLint проверка
bun run lint:fix       # Автоисправление ESLint ошибок

# Тестирование
bun test               # Запуск тестов
bun test:watch         # Тесты в watch режиме
bun test:coverage      # Тесты с покрытием

# Утилиты
bun run clean          # Очистка кэша и build файлов
bun run type-check     # Проверка типов TypeScript
```

### Дополнительные команды

```bash
# Анализ bundle
ANALYZE=true bun run build

# Проверка производительности
bun run lighthouse

# Генерация компонентов
bun run generate:component ComponentName

# Обновление зависимостей
bun update
```

## 📁 Структура разработки

### Организация кода

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Группа маршрутов аутентификации
│   ├── (dashboard)/       # Группа маршрутов панели
│   ├── api/               # API маршруты
│   └── globals.css        # Глобальные стили
├── components/            # React компоненты
│   ├── ui/               # Базовые UI компоненты
│   ├── forms/            # Формы
│   ├── layouts/          # Layout компоненты
│   └── features/         # Функциональные компоненты
├── hooks/                # Пользовательские хуки
├── lib/                  # Утилиты и конфигурация
├── stores/               # Zustand stores
├── styles/               # Стили и темы
└── types/                # TypeScript типы
```

### Соглашения по именованию

#### Файлы и папки
- **Компоненты**: `PascalCase.tsx` (например, `UserProfile.tsx`)
- **Хуки**: `use-kebab-case.ts` (например, `use-user-data.ts`)
- **Утилиты**: `kebab-case.ts` (например, `format-date.ts`)
- **Типы**: `kebab-case.ts` (например, `user-types.ts`)
- **Страницы**: `page.tsx`, `layout.tsx`, `loading.tsx`

#### Переменные и функции
- **Компоненты**: `PascalCase` (например, `UserProfile`)
- **Функции**: `camelCase` (например, `getUserData`)
- **Константы**: `UPPER_SNAKE_CASE` (например, `API_BASE_URL`)
- **Типы**: `PascalCase` с суффиксом (например, `UserType`, `ApiResponse`)

## 🎨 Стилизация

### Tailwind CSS

Проект использует Tailwind CSS с кастомной конфигурацией:

```typescript
// tailwind.config.ts
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // CSS переменные для тем
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... другие цвета
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

### CSS переменные

```css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... другие переменные */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... темные переменные */
}
```

### Компонентные стили

```typescript
// Использование cva для вариантов
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## 🧩 Создание компонентов

### Базовый шаблон компонента

```typescript
// components/ui/my-component.tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Базовые стили
          "rounded-lg border",
          // Варианты
          {
            'bg-white text-black': variant === 'default',
            'bg-gray-100 text-gray-800': variant === 'secondary',
          },
          {
            'p-2 text-sm': size === 'sm',
            'p-4 text-base': size === 'md',
            'p-6 text-lg': size === 'lg',
          },
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

export { MyComponent, type MyComponentProps }
```

### Функциональный компонент

```typescript
// components/features/user-profile.tsx
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface UserProfileProps {
  userId: string
  onUpdate?: (user: User) => void
}

export function UserProfile({ userId, onUpdate }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchUser() {
      try {
        // Загрузка данных пользователя
        const userData = await getUserById(userId)
        setUser(userData)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось загрузить профиль пользователя",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId, toast])

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (!user) {
    return <div>Пользователь не найден</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Email: {user.email}</p>
        <p>Уровень: {user.level}</p>
        <p>Опыт: {user.xp} XP</p>
        <Button onClick={() => onUpdate?.(user)}>
          Обновить профиль
        </Button>
      </CardContent>
    </Card>
  )
}
```

## 🔗 Работа с API

### Supabase клиент

```typescript
// lib/supabase/client.ts
import { createBrowserSupabaseClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  return createBrowserSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )
}
```

### API функции

```typescript
// lib/api/users.ts
import { createClient } from '@/lib/supabase/client'

export async function getUserProfile(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error(`Failed to fetch user profile: ${error.message}`)
  }

  return data
}

export async function updateUserProfile(userId: string, updates: Partial<Profile>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update user profile: ${error.message}`)
  }

  return data
}
```

### Server Actions

```typescript
// app/actions/user-actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserProfileAction(
  userId: string,
  formData: FormData
) {
  const supabase = createClient()
  
  const name = formData.get('name') as string
  const bio = formData.get('bio') as string

  const { error } = await supabase
    .from('profiles')
    .update({ name, bio })
    .eq('id', userId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
```

## 🎣 Пользовательские хуки

### Хук для данных

```typescript
// hooks/use-user-data.ts
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@/types'

export function useUserData(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        setError(null)
        
        const supabase = createClient()
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) throw error
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  return { user, loading, error, refetch: () => fetchUser() }
}
```

### Хук для локального состояния

```typescript
// hooks/use-local-storage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
```

## 🧪 Тестирование

### Настройка Jest

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Тестирование компонентов

```typescript
// __tests__/components/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant styles', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })
})
```

### Тестирование хуков

```typescript
// __tests__/hooks/use-user-data.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useUserData } from '@/hooks/use-user-data'

// Мокаем Supabase
jest.mock('@/lib/supabase/client')

describe('useUserData', () => {
  it('fetches user data successfully', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' }
    
    // Настройка мока
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockUser, error: null }),
    }
    
    require('@/lib/supabase/client').createClient.mockReturnValue(mockSupabase)

    const { result } = renderHook(() => useUserData('1'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.error).toBe(null)
    })
  })
})
```

## 🔧 Отладка

### Инструменты разработки

```typescript
// lib/debug.ts
export const isDev = process.env.NODE_ENV === 'development'

export function debugLog(message: string, data?: any) {
  if (isDev) {
    console.log(`[DEBUG] ${message}`, data)
  }
}

export function debugError(message: string, error?: any) {
  if (isDev) {
    console.error(`[ERROR] ${message}`, error)
  }
}
```

### React DevTools

Установите расширения для браузера:
- React Developer Tools
- Redux DevTools (для Zustand)

### Supabase отладка

```typescript
// lib/supabase/debug.ts
import { createClient } from './client'

export async function testSupabaseConnection() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    
    console.log('Supabase connection successful')
    return true
  } catch (error) {
    console.error('Supabase connection failed:', error)
    return false
  }
}
```

## 📊 Производительность

### Мониторинг производительности

```typescript
// lib/performance.ts
export function measurePerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  const start = performance.now()
  
  const result = fn()
  
  if (result instanceof Promise) {
    return result.finally(() => {
      const end = performance.now()
      console.log(`${name} took ${end - start} milliseconds`)
    })
  } else {
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
    return result
  }
}
```

### Оптимизация изображений

```typescript
// components/optimized-image.tsx
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false 
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      className="rounded-lg"
    />
  )
}
```

## 🚀 Деплой и CI/CD

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Bun
      uses: oven-sh/setup-bun@v1
      with:
        bun-version: latest
    
    - name: Install dependencies
      run: bun install
    
    - name: Run linter
      run: bun run lint
    
    - name: Run type check
      run: bun run type-check
    
    - name: Run tests
      run: bun test --coverage
    
    - name: Build application
      run: bun run build
      env:
        NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 📝 Лучшие практики

### Код

1. **Используйте TypeScript** для всех файлов
2. **Следуйте ESLint правилам** и исправляйте предупреждения
3. **Пишите тесты** для критичной функциональности
4. **Документируйте сложную логику** комментариями
5. **Используйте семантические коммиты** (feat, fix, docs, etc.)

### Производительность

1. **Lazy loading** для больших компонентов
2. **Мемоизация** для дорогих вычислений
3. **Оптимизация изображений** через Next.js Image
4. **Code splitting** на уровне маршрутов
5. **Минимизация bundle size** через анализ

### Безопасность

1. **Валидация данных** на клиенте и сервере
2. **Санитизация пользовательского ввода**
3. **Использование HTTPS** для всех запросов
4. **Защита API ключей** через переменные окружения
5. **Регулярное обновление зависимостей**

### UX/UI

1. **Loading состояния** для всех асинхронных операций
2. **Error boundaries** для обработки ошибок
3. **Accessibility** (ARIA атрибуты, keyboard navigation)
4. **Responsive design** для всех компонентов
5. **Consistent design system** через shadcn/ui

## 🤝 Вклад в проект

### Git workflow

1. **Создайте feature branch** от `develop`
2. **Внесите изменения** с понятными коммитами
3. **Напишите/обновите тесты**
4. **Создайте Pull Request** в `develop`
5. **После ревью** - merge в `develop`
6. **Периодически** merge `develop` в `main`

### Коммиты

Используйте conventional commits:

```bash
feat: добавить компонент UserProfile
fix: исправить ошибку в навигации
docs: обновить README
style: исправить форматирование
refactor: переработать API клиент
test: добавить тесты для Button
chore: обновить зависимости
```

### Code Review

Чеклист для ревью:
- [ ] Код соответствует стандартам проекта
- [ ] Есть тесты для новой функциональности
- [ ] Документация обновлена
- [ ] Нет console.log в продакшен коде
- [ ] Производительность не пострадала
- [ ] Accessibility соблюдена
- [ ] Мобильная версия работает корректно

## 📚 Полезные ресурсы

### Документация
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

### Инструменты
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Сообщество
- [Next.js Discord](https://discord.gg/nextjs)
- [React Discord](https://discord.gg/react)
- [Supabase Discord](https://discord.supabase.com)