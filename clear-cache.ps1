# Скрипт для очистки всех кэшей Next.js

Write-Host "Очистка кэшей Next.js..." -ForegroundColor Cyan

# Удаляем папку .next
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host "✓ Удалена папка .next" -ForegroundColor Green
}

# Удаляем папку node_modules/.cache
if (Test-Path "node_modules/.cache") {
    Remove-Item -Path "node_modules/.cache" -Recurse -Force
    Write-Host "✓ Удален кэш node_modules" -ForegroundColor Green
}

Write-Host "`nКэш очищен! Теперь:" -ForegroundColor Yellow
Write-Host "1. Перезапустите сервер разработки" -ForegroundColor White
Write-Host "2. В браузере нажмите Ctrl+Shift+R для жесткого обновления" -ForegroundColor White
