"use client"

import { useParams } from 'next/navigation'
import { useMemo, useState, useEffect } from 'react'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, getValidLocale } from '@/lib/i18n/config'
import type { Locale } from '@/lib/i18n/config'
import type { Translations } from '@/lib/i18n/types'

// Cache para las traducciones cargadas
const translationCache = new Map<Locale, Translations>()

export function useTranslations() {
  const params = useParams()
  const [translations, setTranslations] = useState<Translations | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Obtener el locale actual
  const locale = useMemo(() => {
    const currentLocale = params?.locale as string
    return getValidLocale(currentLocale)
  }, [params?.locale])

  // Función para cargar traducciones
  const loadTranslations = async (targetLocale: Locale): Promise<Translations> => {
    // Verificar cache primero
    if (translationCache.has(targetLocale)) {
      return translationCache.get(targetLocale)!
    }

    try {
      const translationModule = await import(`@/lib/i18n/translations/${targetLocale}.json`)
      const translations = translationModule.default as Translations
      
      // Guardar en cache
      translationCache.set(targetLocale, translations)
      return translations
    } catch (err) {
      console.error(`Error loading translations for ${targetLocale}:`, err)
      
      // Fallback al español si hay error
      if (targetLocale !== 'es') {
        return loadTranslations('es')
      }
      
      throw new Error(`Failed to load translations for ${targetLocale}`)
    }
  }

  // Cargar traducciones cuando cambie el locale
  useEffect(() => {
    const loadTranslationsForLocale = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const loadedTranslations = await loadTranslations(locale)
        setTranslations(loadedTranslations)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error loading translations:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslationsForLocale()
  }, [locale])

  // Función para obtener traducción por clave
  const t = useMemo(() => {
    return (key: string): string => {
      if (!translations) {
        return key // Devolver la clave si no hay traducciones cargadas
      }

      // Navegar por las claves anidadas (ej: "navigation.home")
      const keys = key.split('.')
      let value: any = translations

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return key // Devolver la clave si no se encuentra
        }
      }

      return typeof value === 'string' ? value : key
    }
  }, [translations])

  // Función para obtener traducción con fallback
  const tWithFallback = (key: string, fallback?: string): string => {
    const translation = t(key)
    return translation !== key ? translation : (fallback || key)
  }

  // Función para cambiar idioma
  const changeLanguage = async (newLocale: Locale) => {
    if (newLocale === locale) return

    try {
      const newTranslations = await loadTranslations(newLocale)
      setTranslations(newTranslations)
    } catch (err) {
      console.error('Error changing language:', err)
    }
  }

  return {
    t,
    tWithFallback,
    translations,
    locale,
    isLoading,
    error,
    changeLanguage,
    isReady: !isLoading && !error && translations !== null
  }
}

// Hook simplificado para casos donde solo necesitas la función t
export function useT() {
  const { t } = useTranslations()
  return t
}
