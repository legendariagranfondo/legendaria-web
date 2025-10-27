# Google Analytics Setup - JA Padel Academy

## 📊 Configuración Completa de Google Analytics

### ✅ Lo que ya está implementado:

1. **Sistema de Analytics completo** (`lib/analytics.ts`)
2. **Consentimiento GDPR** integrado con cookies
3. **Tracking de eventos** en WhatsApp, formularios, etc.
4. **Componente GoogleAnalytics** para inicialización automática
5. **Scripts de Google Analytics** en el layout

### 🔧 Pasos para activar Google Analytics:

#### 1. ✅ Cuenta de Google Analytics configurada
- **ID de medición**: `G-ZVPKJZDJH6`
- **Propiedad**: JA Padel Academy
- **Data Stream**: Web configurado

#### 2. ⚠️ Crear archivo `.env.local`

**Crea manualmente un archivo `.env.local` en la raíz del proyecto con:**

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-ZVPKJZDJH6
```

#### 3. Verificar la configuración

Una vez configurado, Google Analytics se activará automáticamente cuando:
- El usuario acepte las cookies
- Habilite específicamente Analytics en las preferencias

### 🎯 Funcionalidades implementadas:

#### **Tracking automático:**
- ✅ **Page views** - Navegación entre páginas
- ✅ **Scroll depth** - Profundidad de scroll
- ✅ **Time on page** - Tiempo en página
- ✅ **Button clicks** - Clics en botones
- ✅ **Form submissions** - Envío de formularios
- ✅ **WhatsApp interactions** - Interacciones con WhatsApp

#### **Eventos personalizados:**
- ✅ **Conversions** - Conversiones y objetivos
- ✅ **User interactions** - Interacciones del usuario
- ✅ **Engagement** - Métricas de engagement

#### **Privacidad y GDPR:**
- ✅ **Consentimiento requerido** - Solo trackea con consentimiento
- ✅ **IP anonimizada** - Privacidad del usuario
- ✅ **Sin personalización de anuncios** - Cumple con GDPR
- ✅ **Control granular** - Usuario puede desactivar Analytics

### 🔍 Cómo verificar que funciona:

1. **Acepta las cookies** en el sitio web
2. **Habilita Analytics** en las preferencias de cookies
3. **Navega por el sitio** y realiza acciones
4. **Ve a Google Analytics** → Tiempo real → Visitas
5. **Deberías ver tu visita** en tiempo real

### 📈 Métricas que se trackean:

#### **Automáticas:**
- Páginas vistas
- Sesiones
- Usuarios
- Duración de sesión
- Tasa de rebote

#### **Eventos personalizados:**
- Clics en "Reservar Clase"
- Clics en WhatsApp
- Envío de formularios de contacto
- Cambios de idioma
- Interacciones con el menú móvil

#### **Conversiones:**
- WhatsApp clicks (conversión principal)
- Form submissions
- Button interactions

### 🛠️ Personalización avanzada:

#### **Añadir eventos personalizados:**

```tsx
import { event, trackConversion } from "@/lib/analytics"

// Track evento personalizado
event({
  action: "video_play",
  category: "engagement",
  label: "hero_video"
})

// Track conversión
trackConversion("whatsapp_click", 1)
```

#### **Configurar objetivos en Google Analytics:**

1. Ve a **Admin** → **Objetivos**
2. Crea objetivo para **WhatsApp clicks**
3. Crea objetivo para **Form submissions**
4. Configura **Funnels** para el flujo de conversión

### 🔒 Privacidad y cumplimiento:

- ✅ **GDPR compliant** - Solo trackea con consentimiento
- ✅ **IP anonimizada** - Privacidad del usuario
- ✅ **Sin cookies de terceros** - Solo cookies propias
- ✅ **Control del usuario** - Puede desactivar en cualquier momento
- ✅ **Transparencia** - Política de cookies clara

### 🚀 Optimizaciones implementadas:

- **Carga asíncrona** - No bloquea la página
- **Consentimiento primero** - Solo carga con permiso
- **Eventos optimizados** - Tracking eficiente
- **Privacidad por defecto** - Configuración segura

### 📊 Dashboard recomendado:

1. **Audiencia** → **Visión general**
2. **Adquisición** → **Todo el tráfico**
3. **Comportamiento** → **Flujo de comportamiento**
4. **Conversiones** → **Objetivos**

### 🎯 KPIs principales para JA Padel Academy:

- **WhatsApp clicks** (conversión principal)
- **Tiempo en página** (engagement)
- **Páginas por sesión** (interés)
- **Tasa de rebote** (calidad del contenido)
- **Fuentes de tráfico** (marketing efectivo)

---

**¡Google Analytics está completamente configurado y listo para usar!** 🎉
