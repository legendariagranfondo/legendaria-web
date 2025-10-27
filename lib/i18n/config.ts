// Configuración de internacionalización para JA Padel Academy
export const SUPPORTED_LOCALES = ['es', 'en'] as const
export const DEFAULT_LOCALE = 'es' as const

export const LOCALE_NAMES = {
  es: 'Español',
  en: 'English'
} as const

export const LOCALE_FLAGS = {
  es: '🇪🇸',
  en: '🇬🇧'
} as const

export type Locale = typeof SUPPORTED_LOCALES[number]

// Configuración de idiomas para el selector
export const LANGUAGES = [
  { 
    code: 'es' as Locale, 
    name: 'Español', 
    flag: '🇪🇸',
    nativeName: 'Español'
  },
  { 
    code: 'en' as Locale, 
    name: 'English', 
    flag: '🇬🇧',
    nativeName: 'English'
  }
] as const

// Función para validar si un locale es soportado
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale)
}

// Función para obtener el locale por defecto si no es válido
export function getValidLocale(locale: string | undefined): Locale {
  if (locale && isValidLocale(locale)) {
    return locale
  }
  return DEFAULT_LOCALE
}
