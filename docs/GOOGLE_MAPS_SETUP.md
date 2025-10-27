# Configuración de Google Maps

Este documento explica cómo configurar Google Maps en el proyecto JA Padel Academy.

## Paso 1: Obtener una clave de API de Google Maps

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las siguientes APIs:
   - **Maps JavaScript API**
   - **Places API** (opcional, para funcionalidades adicionales)

4. Ve a "Credenciales" en el menú lateral
5. Haz clic en "Crear credenciales" > "Clave de API"
6. Copia la clave generada

## Paso 2: Configurar la clave en el proyecto

1. Crea un archivo `.env.local` en la raíz del proyecto (si no existe)
2. Añade la siguiente línea:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_clave_de_api_aqui
   ```

## Paso 3: Configurar restricciones de seguridad (Recomendado)

1. En Google Cloud Console, ve a "Credenciales"
2. Haz clic en tu clave de API
3. En "Restricciones de aplicación", selecciona "Referentes HTTP"
4. Añade las siguientes URLs:
   ```
   https://tu-dominio.com/*
   https://www.tu-dominio.com/*
   http://localhost:3000/*
   ```

## Paso 4: Actualizar ubicación de Origen Padel Valencia

En el archivo `lib/config.ts`, actualiza las coordenadas reales:

```typescript
export const ORIGEN_PADEL_LOCATION = {
  lat: 39.XXXXX, // Latitud real
  lng: -0.XXXXX, // Longitud real
  title: "Origen Padel Valencia",
  address: "Dirección real del club",
  phone: "+34 XXX XXX XXX", // Teléfono real
  hours: "7:00 - 23:00",
  website: "https://www.origenpadel.com", // URL real
}
```

## Características implementadas

- ✅ Mapa interactivo de Google Maps
- ✅ Marcador personalizado en la ubicación del club
- ✅ InfoWindow con información del club
- ✅ Botón para abrir en Google Maps
- ✅ Estilo personalizado que combina con el diseño del sitio
- ✅ Fallback cuando no hay API key configurada
- ✅ Responsive design
- ✅ Integración con animaciones GSAP existentes

## Solución de problemas

### El mapa no se carga
- Verifica que la clave de API esté correctamente configurada en `.env.local`
- Asegúrate de que la Maps JavaScript API esté habilitada
- Revisa la consola del navegador para errores específicos

### Error de cuota excedida
- Verifica el uso en Google Cloud Console
- Google proporciona $200 USD de crédito gratuito mensual

### El marcador no aparece en la ubicación correcta
- Actualiza las coordenadas en `lib/config.ts` con la ubicación real de Origen Padel Valencia

## Costes

Google Maps ofrece:
- **$200 USD gratis por mes**
- Esto equivale aproximadamente a **28,000 cargas de mapa por mes**
- Para sitios web pequeños y medianos, normalmente es suficiente con el plan gratuito

## Próximos pasos opcionales

1. **Personalizar el estilo del mapa**: Usar [Snazzy Maps](https://snazzymaps.com/) para crear estilos personalizados
2. **Añadir direcciones**: Integrar la Directions API para mostrar rutas
3. **Street View**: Añadir vista de calle integrada
4. **Múltiples ubicaciones**: Si hay varias sedes o puntos de interés

## Soporte

Para más información, consulta la [documentación oficial de Google Maps](https://developers.google.com/maps/documentation).
