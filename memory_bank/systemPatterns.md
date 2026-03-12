# Технические решения

## Архитектура
- Next.js 16 App Router
- React 19 с Server Components
- Supabase для backend (Auth + Database)

## Паттерны
- Компонентный подход с переиспользуемыми UI компонентами
- Zustand для управления состоянием
- shadcn/ui для базовых компонентов

## Связи подсистем
- Auth -> Supabase Auth
- Dashboard -> Supabase Database
- Lessons -> Local state + localStorage
- Achievements -> Supabase Database
