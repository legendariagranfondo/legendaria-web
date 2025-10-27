# Legendaria Web

Sitio web para Legendaria, una vuelta cicloturista única y emocionante.

## 🚀 Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: GSAP + ScrollTrigger + SplitText
- **3D**: React Three Fiber (opcional)
- **Analytics**: Vercel Analytics + Google Analytics 4
- **Despliegue**: Vercel

## 📁 Estructura del Proyecto

\`\`\`
legendaria-web/
├── app/                    # App Router (Next.js 15)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── experiencias/      # Página de experiencias
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── layout/           # Header, Footer
│   ├── sections/         # Secciones de página
│   ├── cards/            # Tarjetas de contenido
│   ├── animations/       # Componentes con animaciones
│   └── ui/               # Componentes UI base
├── lib/                  # Utilidades y configuración
├── public/               # Assets estáticos
└── styles/               # Estilos adicionales
\`\`\`

## 🎨 Características

### SEO Optimizado
- Meta tags dinámicos
- Open Graph y Twitter Cards
- Sitemap automático
- Robots.txt configurado
- Structured data ready

### Animaciones Avanzadas
- GSAP con ScrollTrigger
- SplitText para animaciones de texto
- Parallax effects
- Hover animations
- Contadores animados

### Performance
- Next.js Image optimization
- Font optimization
- Code splitting automático
- Lazy loading
- Web Vitals tracking

### Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Flexible grid systems
- Touch-friendly interactions

## 🛠️ Instalación

\`\`\`bash
# Clonar repositorio
git clone https://github.com/tu-usuario/legendaria-web.git
cd legendaria-web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
\`\`\`

## 📦 Scripts Disponibles

\`\`\`bash
npm run dev          # Desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting
npm run type-check   # Verificación de tipos
\`\`\`

## 🎯 Componentes Clave

### Hero Section
- Animación de texto con máscara
- Parallax background
- CTAs animados

### ProgramCard
- Hover effects
- Información estructurada
- Responsive design

### ExperienciaCard
- Rating system
- Price display
- Feature highlights

### CounterStats
- Números animados
- Scroll-triggered
- Icon animations

### SectionReveal
- Scroll-based animations
- Multiple animation types
- Configurable delays

## 🔧 Configuración

### Variables de Entorno

\`\`\`env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://legendaria.com
\`\`\`

### GSAP Configuration

\`\`\`javascript
// lib/gsap.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

export { gsap, ScrollTrigger, SplitText }
\`\`\`

### Tailwind Customization

El archivo `tailwind.config.js` incluye:
- Fuentes personalizadas (Inter, Montserrat)
- Paleta de colores de marca
- Animaciones extendidas
- Utilidades responsive

## 🚀 Despliegue

### Vercel (Recomendado)

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### Variables de Entorno en Vercel
1. `NEXT_PUBLIC_GA_ID`
2. `NEXT_PUBLIC_GTM_ID`
3. `NEXT_PUBLIC_SITE_URL`

## 📈 Analytics y Tracking

### Google Analytics 4
- Page views automáticos
- Event tracking
- Conversion tracking
- Custom dimensions

### Eventos Personalizados
\`\`\`typescript
import { trackConversion } from '@/lib/analytics'

// Tracking de reservas
trackConversion('booking_started', 129)
trackConversion('booking_completed', 129)
\`\`\`

## 🌐 Internacionalización

Preparado para next-i18next:

\`\`\`bash
npm install next-i18next
\`\`\`

Estructura de idiomas:
\`\`\`
public/
├── locales/
│   ├── es/
│   │   └── common.json
│   └── en/
│       └── common.json
\`\`\`

## 🎨 Guía de Estilos

### Colores Principales
- **Naranja**: `#f97316` (orange-500)
- **Slate**: `#0f172a` (slate-900)
- **Blanco**: `#ffffff`

### Tipografía
- **Headings**: Montserrat (700)
- **Body**: Inter (400, 500, 600)

### Espaciado
- **Secciones**: `py-20` (80px)
- **Contenedores**: `px-4` (16px)
- **Elementos**: `gap-8` (32px)

## 🔄 Flujo de Trabajo Git

\`\`\`bash
# Feature branch
git checkout -b feature/nueva-funcionalidad

# Commits atómicos
git commit -m "feat: add hero animation"
git commit -m "style: update button hover states"
git commit -m "fix: resolve mobile menu issue"

# Push y PR
git push origin feature/nueva-funcionalidad
\`\`\`

## 📱 Responsive Breakpoints

\`\`\`css
/* Mobile First */
sm: 640px   /* Tablet */
md: 768px   /* Desktop small */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop large */
2xl: 1536px /* Desktop XL */
\`\`\`

## 🧪 Testing (Próximamente)

\`\`\`bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Visual regression
npm run test:visual
\`\`\`

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una feature branch
3. Commit tus cambios
4. Push a la branch
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE.md](LICENSE.md)

---

**Legendaria** - Una vuelta cicloturista única y emocionante.
