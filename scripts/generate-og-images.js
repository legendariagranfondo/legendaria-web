#!/usr/bin/env node

/**
 * Script para generar imágenes Open Graph optimizadas
 * Requiere: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const TWITTER_WIDTH = 1200;
const TWITTER_HEIGHT = 630;

// Configuración de colores de marca
const BRAND_COLORS = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  primary: '#1E3A8A'
};

async function createOGImage() {
  try {
    // Crear imagen base con gradiente
    const baseImage = sharp({
      create: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        channels: 3,
        background: { r: 26, g: 26, b: 26 } // Negro de marca
      }
    });

    // Añadir gradiente dorado
    const gradient = await sharp({
      create: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([{
      input: Buffer.from(`
        <svg width="${OG_WIDTH}" height="${OG_HEIGHT}">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:#D4AF37;stop-opacity:0.1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#goldGradient)" />
        </svg>
      `),
      top: 0,
      left: 0
    }])
    .png()
    .toBuffer();

    // Crear texto SVG
    const textSVG = `
      <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .title { font-family: 'Arial', sans-serif; font-size: 72px; font-weight: 900; fill: #D4AF37; }
            .subtitle { font-family: 'Arial', sans-serif; font-size: 36px; font-weight: 600; fill: #FFFFFF; }
            .academy { font-family: 'Arial', sans-serif; font-size: 48px; font-weight: 700; fill: #FFFFFF; }
          </style>
        </defs>
        
        <!-- Logo placeholder -->
        <rect x="60" y="60" width="120" height="60" fill="#D4AF37" rx="8"/>
        <text x="120" y="100" text-anchor="middle" class="academy" fill="#1A1A1A">JA</text>
        
        <!-- Título principal -->
        <text x="60" y="200" class="title">JA PADEL ACADEMY</text>
        
        <!-- Subtítulo -->
        <text x="60" y="260" class="subtitle">ACADEMIA PREMIUM DE PÁDEL EN VALENCIA</text>
        
        <!-- Línea decorativa -->
        <rect x="60" y="300" width="200" height="4" fill="#D4AF37"/>
        
        <!-- Texto inferior -->
        <text x="60" y="380" class="subtitle">ENTRENA DISTINTO</text>
        <text x="60" y="420" class="subtitle">FAIL AGAIN. FAIL BETTER.</text>
        
        <!-- Ubicación -->
        <text x="60" y="520" class="subtitle" font-size="28">📍 Origen Padel Valencia</text>
        <text x="60" y="560" class="subtitle" font-size="24">🏆 Metodología Exclusiva</text>
      </svg>
    `;

    // Combinar todo
    const finalImage = await baseImage
      .composite([
        {
          input: gradient,
          blend: 'overlay'
        },
        {
          input: Buffer.from(textSVG),
          top: 0,
          left: 0
        }
      ])
      .jpeg({ quality: 90 })
      .toBuffer();

    // Guardar imagen
    const outputPath = path.join(__dirname, '../public/images/og-valencia.jpg');
    fs.writeFileSync(outputPath, finalImage);
    
    console.log('✅ Imagen Open Graph creada:', outputPath);
    
    // Crear versión Twitter
    const twitterImage = await sharp(finalImage)
      .resize(TWITTER_WIDTH, TWITTER_HEIGHT)
      .jpeg({ quality: 90 })
      .toBuffer();
    
    const twitterPath = path.join(__dirname, '../public/images/twitter-valencia.jpg');
    fs.writeFileSync(twitterPath, twitterImage);
    
    console.log('✅ Imagen Twitter creada:', twitterPath);
    
  } catch (error) {
    console.error('❌ Error creando imágenes:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createOGImage();
}

module.exports = { createOGImage };
