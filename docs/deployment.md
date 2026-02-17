# Руководство по развертыванию

## 🚀 Обзор развертывания

LinguaFlow поддерживает развертывание на различных платформах благодаря использованию Next.js и Supabase.

## 🌐 Vercel (Рекомендуется)

Vercel - это платформа от создателей Next.js, обеспечивающая оптимальную производительность.

### Автоматическое развертывание

1. **Подключение репозитория:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Нажмите "New Project"
   - Импортируйте репозиторий из GitHub/GitLab

2. **Настройка проекта:**
   ```bash
   # Framework Preset: Next.js
   # Build Command: bun run build
   # Output Directory: .next
   # Install Command: bun install
   ```

3. **Переменные окружения:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
   ```

4. **Развертывание:**
   - Нажмите "Deploy"
   - Автоматическое развертывание при каждом push в main

### Настройка домена

1. В настройках проекта перейдите в "Domains"
2. Добавьте свой домен
3. Настройте DNS записи согласно инструкциям

### Настройка окружений

```javascript
// vercel.json
{
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY": "@supabase-anon-key"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY": "@supabase-anon-key"
    }
  }
}
```

## 🌊 Netlify

Альтернативная платформа для статических сайтов и JAMstack приложений.

### Настройка

1. **Подключение репозитория:**
   - Зайдите на [netlify.com](https://netlify.com)
   - "New site from Git"
   - Выберите репозиторий

2. **Настройки сборки:**
   ```toml
   # netlify.toml
   [build]
     command = "bun run build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Переменные окружения:**
   - Site settings → Environment variables
   - Добавьте необходимые переменные

### Функции Netlify

```javascript
// netlify/functions/api.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify Functions!' })
  }
}
```

## 🚂 Railway

Современная платформа для развертывания приложений.

### Настройка

1. **Создание проекта:**
   ```bash
   # Установка Railway CLI
   npm install -g @railway/cli
   
   # Вход в аккаунт
   railway login
   
   # Инициализация проекта
   railway init
   ```

2. **Конфигурация:**
   ```toml
   # railway.toml
   [build]
     builder = "nixpacks"
   
   [deploy]
     startCommand = "bun start"
     healthcheckPath = "/"
   ```

3. **Развертывание:**
   ```bash
   railway up
   ```

## 🌊 DigitalOcean App Platform

Платформа для развертывания современных приложений.

### Настройка

1. **Создание приложения:**
   - Зайдите в DigitalOcean App Platform
   - Создайте новое приложение
   - Подключите репозиторий

2. **Конфигурация:**
   ```yaml
   # .do/app.yaml
   name: linguaflow
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/linguaflow
       branch: main
     run_command: bun start
     build_command: bun run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: NEXT_PUBLIC_SUPABASE_URL
       value: your_supabase_url
     - key: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
       value: your_supabase_anon_key
   ```

## 🐳 Docker

Контейнеризация для любой платформы.

### Dockerfile

```dockerfile
# Dockerfile
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN bun run build

# Production stage
FROM oven/bun:1-slim as production
WORKDIR /app

# Copy built application
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000

CMD ["bun", "start"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  linguaflow:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY}
    restart: unless-stopped
```

### Команды Docker

```bash
# Сборка образа
docker build -t linguaflow .

# Запуск контейнера
docker run -p 3000:3000 linguaflow

# Использование Docker Compose
docker-compose up -d
```

## ☁️ AWS

Развертывание на Amazon Web Services.

### AWS Amplify

1. **Настройка:**
   ```yaml
   # amplify.yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install -g bun
           - bun install
       build:
         commands:
           - bun run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### AWS Lambda + CloudFront

```javascript
// lambda/index.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const app = next({ dev: false })
const handle = app.getRequestHandler()

exports.handler = async (event, context) => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  return new Promise((resolve, reject) => {
    server.listen(3000, (err) => {
      if (err) reject(err)
      resolve({ statusCode: 200, body: 'Server started' })
    })
  })
}
```

## 🔧 Настройка CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Bun
      uses: oven-sh/setup-bun@v1
      with:
        bun-version: latest
    
    - name: Install dependencies
      run: bun install
    
    - name: Run tests
      run: bun test
    
    - name: Build application
      run: bun run build
      env:
        NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: oven/bun:1
  script:
    - bun install
    - bun test
  only:
    - merge_requests
    - main

build:
  stage: build
  image: oven/bun:1
  script:
    - bun install
    - bun run build
  artifacts:
    paths:
      - .next/
    expire_in: 1 hour
  only:
    - main

deploy:
  stage: deploy
  image: node:18
  script:
    - npm install -g vercel
    - vercel --token $VERCEL_TOKEN --prod
  only:
    - main
```

## 🔍 Мониторинг и логирование

### Vercel Analytics

```typescript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

### Sentry для отслеживания ошибок

```bash
# Установка
bun add @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

### Логирование

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data)
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error)
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data)
  }
}
```

## 🔒 Безопасность

### Переменные окружения

```bash
# Никогда не коммитьте секретные ключи
# Используйте переменные окружения

# .env.local (не коммитится)
SUPABASE_SERVICE_ROLE_KEY=your_secret_key

# .env.example (коммитится)
SUPABASE_SERVICE_ROLE_KEY=your_secret_key_here
```

### Заголовки безопасности

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

## 📊 Производительность

### Оптимизация сборки

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'recharts']
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60
  },
  compress: true
}
```

### Bundle анализ

```bash
# Установка анализатора
bun add @next/bundle-analyzer

# Анализ bundle
ANALYZE=true bun run build
```

## 🔄 Откат версий

### Vercel

```bash
# Список деплоев
vercel ls

# Откат к предыдущей версии
vercel rollback [deployment-url]
```

### Git-based откат

```bash
# Откат к предыдущему коммиту
git revert HEAD

# Откат к конкретному коммиту
git revert <commit-hash>

# Принудительный откат (осторожно!)
git reset --hard <commit-hash>
git push --force
```

## 📋 Чеклист развертывания

### Перед развертыванием

- [ ] Все тесты проходят
- [ ] Переменные окружения настроены
- [ ] База данных мигрирована
- [ ] Статические ресурсы оптимизированы
- [ ] SEO метатеги настроены
- [ ] Аналитика подключена

### После развертывания

- [ ] Приложение доступно по URL
- [ ] Все страницы загружаются
- [ ] Аутентификация работает
- [ ] База данных подключена
- [ ] Мониторинг настроен
- [ ] SSL сертификат активен

### Мониторинг

- [ ] Время отклика < 2 сек
- [ ] Uptime > 99.9%
- [ ] Ошибки отслеживаются
- [ ] Логи доступны
- [ ] Резервные копии создаются

## 🆘 Устранение неполадок

### Частые проблемы

**Ошибка сборки:**
```bash
# Очистка кэша
bun run clean
rm -rf .next node_modules
bun install
bun run build
```

**Проблемы с переменными окружения:**
```bash
# Проверка переменных
echo $NEXT_PUBLIC_SUPABASE_URL
```

**Ошибки Supabase:**
- Проверьте URL и ключи
- Убедитесь в настройке RLS политик
- Проверьте сетевые настройки

**Медленная загрузка:**
- Оптимизируйте изображения
- Включите сжатие
- Используйте CDN
- Настройте кэширование