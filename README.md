# 🌍 LinguaFlow

> Современное веб-приложение для изучения языков с интерактивными уроками, системой карточек и геймификацией

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

## ✨ Особенности

- 🎓 **Интерактивные уроки** с различными типами упражнений
- 🃏 **Система карточек** с алгоритмом интервального повторения (SRS)
- 🏆 **Геймификация** с достижениями и системой опыта
- 📊 **Детальная аналитика** прогресса обучения
- 🌙 **Темная/светлая тема** с автоматическим переключением
- 📱 **Адаптивный дизайн** для всех устройств
- 🔐 **Безопасная аутентификация** через Supabase
- 🔍 **Глобальный поиск** с быстрой навигацией (Cmd/Ctrl + K)

## 🌐 Поддерживаемые языки

- 🇬🇧 **Английский** (A1-B2)
- 🇩🇪 **Немецкий** (A1-B2)

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- Bun 1.0+
- Аккаунт Supabase

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

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 🛠️ Технологический стек

### Frontend
- **Next.js 16+** - React фреймворк с App Router
- **React 19+** - Библиотека для пользовательских интерфейсов
- **TypeScript** - Типизированный JavaScript
- **Tailwind CSS** - Utility-first CSS фреймворк
- **shadcn/ui** - Современные UI компоненты
- **Zustand** - Управление состоянием
- **Recharts** - Библиотека для графиков

### Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Реляционная база данных
- **Row Level Security** - Безопасность на уровне строк
- **Real-time subscriptions** - Подписки в реальном времени

### Инструменты разработки
- **Bun** - Быстрый пакетный менеджер и runtime
- **ESLint** - Линтер для JavaScript/TypeScript
- **Jest** - Фреймворк для тестирования
- **Vercel** - Платформа для деплоя

## 📋 Доступные команды

```bash
# Разработка
bun dev                 # Запуск dev сервера
bun dev --turbo        # Запуск с Turbopack

# Сборка и продакшн
bun run build          # Сборка для продакшена
bun start              # Запуск продакшн сервера

# Качество кода
bun run lint           # ESLint проверка
bun run lint:fix       # Автоисправление ошибок

# Тестирование
bun test               # Запуск тестов
bun test:watch         # Тесты в watch режиме
bun test:coverage      # Тесты с покрытием

# Утилиты
bun run clean          # Очистка кэша
bun run type-check     # Проверка типов
```

## 📁 Структура проекта

```
linguaflow/
├── docs/                           # 📚 Документация
│   ├── README.md                   # Основная документация
│   ├── api.md                      # API документация
│   ├── components.md               # Руководство по компонентам
│   ├── database.md                 # Документация БД
│   ├── deployment.md               # Руководство по развертыванию
│   └── development.md              # Руководство по разработке
├── src/
│   ├── app/                        # 🎯 Next.js App Router
│   │   ├── achievements/           # Страница достижений
│   │   ├── dashboard/              # Панель управления
│   │   ├── lessons/                # Уроки по языкам
│   │   └── flashcards/             # Система карточек
│   ├── components/                 # 🧩 React компоненты
│   │   ├── ui/                     # Базовые UI компоненты
│   │   ├── charts/                 # Компоненты графиков
│   │   └── search/                 # Поиск и навигация
│   ├── hooks/                      # 🎣 Пользовательские хуки
│   ├── lib/                        # 🔧 Утилиты и конфигурация
│   ├── styles/                     # 🎨 Стили и темы
│   └── types/                      # 📝 TypeScript типы
├── supabase/                       # 🗄️ Конфигурация БД
└── public/                         # 📁 Статические файлы
```

## 🎯 Основные функции

### 📚 Система обучения
- Иерархия: Язык → Курс → Тема → Урок
- Интерактивные слайды: теория, викторины, сопоставления
- Отслеживание прогресса и времени обучения
- Система оценок и обратной связи

### 🃏 Карточки (Flashcards)
- Автоматическое создание из изученной лексики
- Алгоритм интервального повторения (SRS)
- Различные режимы повторения
- Детальная статистика запоминания

### 🏆 Геймификация
- Система достижений с уникальными карточками
- Начисление опыта (XP) за активность
- Уровни пользователей
- Отслеживание серий обучения

### 📊 Аналитика
- Графики прогресса по дням/неделям
- Статистика точности ответов
- Время, проведенное в обучении
- Детальный анализ ошибок

## 🎨 Дизайн и UX

- **Современный интерфейс** с использованием shadcn/ui
- **Темная и светлая темы** с автоматическим переключением
- **Адаптивный дизайн** от мобильных до десктопных устройств
- **Анимации и переходы** для улучшения пользовательского опыта
- **Accessibility** поддержка для всех пользователей

## 🔐 Безопасность

- **Row Level Security (RLS)** в Supabase
- **Защищенные API маршруты**
- **Валидация данных** на клиенте и сервере
- **Безопасная аутентификация** с JWT токенами
- **Изоляция пользовательских данных**

## 📖 Документация

Полная документация доступна в папке `docs/`:

- **[Основная документация](docs/README.md)** - Обзор проекта и архитектуры
- **[Руководство по разработке](docs/development.md)** - Настройка и разработка
- **[API документация](docs/api.md)** - Описание API эндпоинтов
- **[База данных](docs/database.md)** - Схема БД и функции
- **[Компоненты](docs/components.md)** - Руководство по UI компонентам
- **[Развертывание](docs/deployment.md)** - Инструкции по деплою

## 🚀 Развертывание

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Деплой происходит автоматически при push в main

### Другие платформы

Приложение совместимо с:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

Подробные инструкции в [руководстве по развертыванию](docs/deployment.md).

## 🧪 Тестирование

```bash
# Запуск всех тестов
bun test

# Тесты в watch режиме
bun test:watch

# Покрытие кода
bun test:coverage
```

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие LinguaFlow! 

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Внесите изменения и добавьте тесты
4. Commit изменения (`git commit -m 'feat: add amazing feature'`)
5. Push в branch (`git push origin feature/amazing-feature`)
6. Создайте Pull Request

### Соглашения

- Используйте [Conventional Commits](https://www.conventionalcommits.org/)
- Добавляйте тесты для новой функциональности
- Следуйте существующему стилю кода
- Обновляйте документацию при необходимости

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 🙏 Благодарности

- [Next.js](https://nextjs.org/) - За отличный React фреймворк
- [Supabase](https://supabase.com/) - За мощный backend-as-a-service
- [shadcn/ui](https://ui.shadcn.com/) - За красивые UI компоненты
- [Tailwind CSS](https://tailwindcss.com/) - За utility-first CSS
- [Vercel](https://vercel.com/) - За простое развертывание

## 📞 Поддержка

Если у вас есть вопросы или предложения:

- 🐛 [Создайте Issue](https://github.com/your-username/linguaflow/issues) для багов
- 💡 [Обсуждения](https://github.com/your-username/linguaflow/discussions) для идей
- 📧 Email: support@linguaflow.com
- 💬 Telegram: @linguaflow_support

---

<div align="center">
  <p>Сделано с ❤️ для изучающих языки</p>
  <p>
    <a href="#-linguaflow">⬆️ Наверх</a>
  </p>
</div>
