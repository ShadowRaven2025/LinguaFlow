# Скрипт для применения glass-стилей ко всему проекту

Write-Host "Применение glass-стилей ко всему проекту..." -ForegroundColor Cyan

# Получаем все .tsx файлы в src
$files = Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse

$totalFiles = $files.Count
$processedFiles = 0

foreach ($file in $files) {
    $processedFiles++
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Замены для HTML контента в строках
    $content = $content -replace 'bg-blue-900/30', 'glass'
    $content = $content -replace 'bg-indigo-900/30', 'glass'
    $content = $content -replace 'bg-purple-900/30', 'glass'
    $content = $content -replace 'bg-green-900/30', 'glass'
    $content = $content -replace 'bg-orange-900/30', 'glass'
    
    # Замены для rounded
    $content = $content -replace 'rounded-lg(["\s])', 'rounded-xl$1'
    
    # Замены цветов текста на white/primary
    $content = $content -replace 'text-blue-300', 'text-primary'
    $content = $content -replace 'text-indigo-300', 'text-primary'
    $content = $content -replace 'text-purple-300', 'text-primary'
    $content = $content -replace 'text-slate-300', 'text-white/80'
    $content = $content -replace 'text-slate-400', 'text-white/60'
    
    # Сохраняем только если были изменения
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "✓ Обновлен: $($file.Name)" -ForegroundColor Green
    }
    
    # Показываем прогресс
    $percent = [math]::Round(($processedFiles / $totalFiles) * 100)
    Write-Progress -Activity "Обработка файлов" -Status "$processedFiles из $totalFiles" -PercentComplete $percent
}

Write-Progress -Activity "Обработка файлов" -Completed

Write-Host "`n✓ Готово! Обработано файлов: $processedFiles" -ForegroundColor Green
Write-Host "Теперь:" -ForegroundColor Yellow
Write-Host "1. Удалите кэш: Remove-Item -Path '.next' -Recurse -Force" -ForegroundColor White
Write-Host "2. Перезапустите сервер разработки" -ForegroundColor White
Write-Host "3. Жесткое обновление браузера: Ctrl+Shift+R" -ForegroundColor White
