# Git Setup для LinguaFlow

## ✅ Настройка завершена

Репозиторий успешно настроен и синхронизирован с GitHub:
- **Репозиторий**: https://github.com/ShadowRaven2025/LinguaFlow.git
- **Ветка**: main
- **Аутентификация**: Personal Access Token

## 🔧 Основные команды Git

### Проверка статуса
```bash
git status
```

### Добавление файлов
```bash
# Добавить все изменения
git add .

# Добавить конкретный файл
git add filename.txt
```

### Создание коммита
```bash
git commit -m "Описание изменений"
```

### Отправка в GitHub
```bash
git push
```

### Получение изменений из GitHub
```bash
git pull
```

### Просмотр истории коммитов
```bash
git log --oneline
```

## 🌿 Работа с ветками

### Создание новой ветки
```bash
git checkout -b feature/new-feature
```

### Переключение между ветками
```bash
git checkout main
git checkout feature/new-feature
```

### Слияние веток
```bash
git checkout main
git merge feature/new-feature
```

### Удаление ветки
```bash
git branch -d feature/new-feature
```

## 📋 Рекомендуемый workflow

1. **Перед началом работы**:
   ```bash
   git pull
   ```

2. **Создание новой функции**:
   ```bash
   git checkout -b feature/lesson-improvements
   ```

3. **После внесения изменений**:
   ```bash
   git add .
   git commit -m "Add new lesson exercises"
   git push -u origin feature/lesson-improvements
   ```

4. **Слияние с основной веткой**:
   ```bash
   git checkout main
   git merge feature/lesson-improvements
   git push
   ```

## 🔐 Безопасность

- ✅ Personal Access Token настроен
- ✅ Токен сохранен в credential helper
- ✅ Репозиторий готов к работе

## 📁 Структура коммитов

Используйте понятные сообщения коммитов:
- `feat: add new lesson type`
- `fix: correct answer validation`
- `docs: update README`
- `style: improve UI components`
- `refactor: optimize lesson loading`

## 🚀 Готово к работе!

Репозиторий полностью настроен и готов к разработке. Все изменения будут автоматически синхронизироваться с GitHub.