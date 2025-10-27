"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isValidLocale } from '@/lib/i18n/config'
import type { Locale } from '@/lib/i18n/config'

const LANGUAGE_STORAGE_KEY = 'ja-padel-language-preference'

export function useLanguagePreference() {
  const router = useRouter()
  const pathname = usePathname()
  const [preferredLocale, setPreferredLocale] = useState<Locale>(DEFAULT_LOCALE)
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar preferencia guardada al montar
  useEffect(() => {
    // Intentar cargar de localStorage primero
    const savedLocale = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (savedLocale && isValidLocale(savedLocale)) {
      setPreferredLocale(savedLocale as Locale)
    } else {
      // Si no hay localStorage, intentar cargar de cookie
      const cookieLocale = document.cookie
        .split('; ')
        .find(row => row.startsWith('ja-padel-locale='))
        ?.split('=')[1]
      
      if (cookieLocale && isValidLocale(cookieLocale)) {
        setPreferredLocale(cookieLocale as Locale)
        // Sincronizar con localStorage
        localStorage.setItem(LANGUAGE_STORAGE_KEY, cookieLocale)
      }
    }
    setIsLoaded(true)
  }, [])

  // Función para cambiar idioma y persistir
  const changeLanguage = (newLocale: Locale) => {
    // Guardar en localStorage
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLocale)
    
    // Guardar en cookie para el middleware
    document.cookie = `ja-padel-locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 año
    
    setPreferredLocale(newLocale)

    // Navegar a la nueva URL manteniendo la estructura
    const pathSegments = (pathname || '').split('/')
    pathSegments[1] = newLocale
    const newPath = pathSegments.join('/')
    
    router.push(newPath)
  }

  // Obtener el locale actual del pathname o usar el preferido
  const getCurrentLocale = (): Locale => {
    if (!isLoaded) return DEFAULT_LOCALE
    
    const pathLocale = pathname?.split('/')[1] as Locale
    if (pathLocale && isValidLocale(pathLocale)) {
      return pathLocale
    }
    
    return preferredLocale
  }

  return {
    currentLocale: getCurrentLocale(),
    preferredLocale,
    changeLanguage,
    isLoaded
  }
}
