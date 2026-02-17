# Миграция с pnpm на bun

Проект LinguaFlow был успешно мигрирован с pnpm на bun для улучшения производительности и упрощения управления зависимостями.

## Что изменилось

### Удаленные файлы
- `pnpm-lock.yaml` - заменен на `bun.lockb` (создается автоматически)

### Добавленные файлы
- `bunfig.toml` - конфигурация bun
- `MIGRATION_TO_BUN.md` - этот файл

### Обновленные файлы
- `.gitignore` - добавлен `bun.lockb`, обновлен `.bun-debug.log*`
- `README.md` - обновлены инструкции по установке и запуску
- `netlify.toml` - команда сборки изменена на `bun install && bun run build`
- `PRD.md` - обновлен пакетный менеджер
- `.kiro/specs/language-learning-platform/design.md` - обновлен пакетный менеджер
- `.kiro/specs/language-learning-platform/tasks.md` - обновлены задачи

## Команды для разработчиков

### Старые команды (pnpm)
```bash
pnpm install
pnpm dev
pnpm build
pnpm start
```

### Новые команды (bun)
```bash
bun install
bun dev
bun run build
bun start
```

## Преимущества bun

1. **Скорость**: bun значительно быстрее устанавливает зависимости
2. **Встроенный bundler**: не требует дополнительных инструментов сборки
3. **TypeScript поддержка**: нативная поддержка TypeScript
4. **Совместимость**: полная совместимость с npm пакетами
5. **Меньший размер**: более компактные lock файлы

## Инструкции для команды

1. Удалите старые зависимости: `rm -rf node_modules`
2. Установите bun: https://bun.sh/docs/installation
3. Установите зависимости: `bun install`
4. Запустите проект: `bun dev`

## Конфигурация

Файл `bunfig.toml` содержит настройки для:
- Автоматической установки peer dependencies
- Использования legacy peer deps resolution
- Отключения strict peer dependencies
- Настройки кеша установки