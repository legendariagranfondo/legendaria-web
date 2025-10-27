# Script de PowerShell para solucionar problemas de desarrollo Next.js

Write-Host "🔧 Solucionando problemas de desarrollo Next.js..." -ForegroundColor Cyan

# Detener procesos existentes de Next.js
Write-Host "📋 Deteniendo procesos existentes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next dev*" } | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process -Name "next" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Limpiar cache de Next.js
Write-Host "🗑️ Limpiando cache de Next.js..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
}

# Limpiar cache de pnpm
Write-Host "📦 Limpiando cache de dependencias..." -ForegroundColor Yellow
pnpm store prune

# Verificar archivos de configuración
Write-Host "⚙️ Verificando configuración..." -ForegroundColor Yellow
if (!(Test-Path "next.config.mjs")) {
    Write-Host "❌ Error: next.config.mjs no encontrado" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Limpieza completada. Ahora ejecuta 'pnpm dev' para reiniciar." -ForegroundColor Green
Write-Host "💡 Si persisten los problemas, ejecuta también 'pnpm install --force'" -ForegroundColor Blue
