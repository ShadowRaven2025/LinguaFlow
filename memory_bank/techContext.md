# Технологический контекст

## Стек технологий
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth)
- **State**: Zustand
- **Deployment**: Vercel

## Окружение
- Node.js 18+
- Bun (пакетный менеджер)
- Vercel для деплоя

## Ограничения
- 100MB для Vercel Edge Functions
- SSR для динамических страниц
- SSG для статических уроков

## CI/CD
- GitHub -> Vercel (автоматический деплой)
- Линтинг через ESLint
