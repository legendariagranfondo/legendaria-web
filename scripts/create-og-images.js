#!/usr/bin/env node

/**
 * Script simple para crear imágenes Open Graph usando imágenes existentes
 */

const fs = require('fs');
const path = require('path');

// Crear directorio si no existe
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Crear imágenes Open Graph usando las existentes como base
const createOGImages = () => {
  try {
    // Para og-valencia.jpg - usar Valencia_CAC.jpg como base
    const valenciaImage = path.join(imagesDir, 'Valencia_CAC.jpg');
    const ogImage = path.join(imagesDir, 'og-valencia.jpg');
    
    if (fs.existsSync(valenciaImage)) {
      fs.copyFileSync(valenciaImage, ogImage);
      console.log('✅ Imagen Open Graph creada:', ogImage);
    } else {
      console.log('⚠️  Imagen base Valencia_CAC.jpg no encontrada');
    }
    
    // Para twitter-valencia.jpg - usar guille-adri.jpg como base
    const guilleImage = path.join(imagesDir, 'guille-adri.jpg');
    const twitterImage = path.join(imagesDir, 'twitter-valencia.jpg');
    
    if (fs.existsSync(guilleImage)) {
      fs.copyFileSync(guilleImage, twitterImage);
      console.log('✅ Imagen Twitter creada:', twitterImage);
    } else {
      console.log('⚠️  Imagen base guille-adri.jpg no encontrada');
    }
    
    console.log('🎉 Imágenes Open Graph creadas exitosamente');
    
  } catch (error) {
    console.error('❌ Error creando imágenes:', error);
  }
};

// Ejecutar
createOGImages();
