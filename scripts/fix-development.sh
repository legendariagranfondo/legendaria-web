#!/bin/bash

echo "🔧 Solucionando problemas de desarrollo Next.js..."

# Detener procesos existentes
echo "📋 Deteniendo procesos existentes..."
pkill -f "next dev" || true
pkill -f "node_modules/.bin/next" || true

# Limpiar cache de Next.js
echo "🗑️ Limpiando cache de Next.js..."
rm -rf .next
rm -rf node_modules/.cache

# Limpiar cache de npm/pnpm
echo "📦 Limpiando cache de dependencias..."
pnpm store prune

# Reinstalar dependencias si es necesario
echo "🔄 Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependencias..."
    pnpm install
fi

# Verificar archivos de configuración
echo "⚙️ Verificando configuración..."
if [ ! -f "next.config.mjs" ]; then
    echo "❌ Error: next.config.mjs no encontrado"
    exit 1
fi

# Reiniciar servidor de desarrollo
echo "🚀 Reiniciando servidor de desarrollo..."
pnpm dev

echo "✅ Proceso completado. El servidor debería estar funcionando correctamente."
