# Google OAuth Setup Guide

## Настройка Google OAuth в Supabase

### Шаг 1: Создание проекта в Google Cloud Console

1. Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Перейдите в **APIs & Services** → **Library**
4. Найдите и включите **Google+ API**

### Шаг 2: Создание OAuth credentials

1. Перейдите в **APIs & Services** → **Credentials**
2. Нажмите **Create Credentials** → **OAuth client ID**
3. Выберите **Web application** как тип приложения
4. Заполните:
   - **Name**: LinguaFlow OAuth
   - **Authorized JavaScript origins**: `http://localhost:3000` (для разработки)
   - **Authorized redirect URIs**: `https://your-project.supabase.co/auth/v1/callback`
5. Скопируйте **Client ID** и **Client Secret**

### Шаг 3: Настройка в Supabase Dashboard

1. Перейдите в [Supabase Dashboard](https://supabase.com/dashboard)
2. Выберите проект
3. Перейдите в **Authentication** → **Providers** → **Google**
4. Включите провайдер Google
5. Вставьте:
   - **Client ID**: из Google Cloud Console
   - **Client Secret**: из Google Cloud Console
6. Нажмите **Save**

### Шаг 4: Настройка переменных окружения

Добавьте в `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

### Шаг 5: Перезапустите приложение

```bash
bun run dev
```

## Тестирование

1. Откройте `/login` или `/signup`
2. Нажмите кнопку **Continue with Google**
3. Войдите через аккаунт Google
4. После авторизации вы будете перенаправлены на `/dashboard`

## Возможные проблемы

### OAuth callback error
- Проверьте, что redirect URI в Google Cloud Console точно соответствует URI в Supabase
- Для локальной разработки добавьте `http://localhost:3000` в authorized origins

### "Provider not enabled"
- Убедитесь, что Google провайдер включен в Supabase Dashboard

### CORS error
- Проверьте настройки CORS в Supabase
