"use client"

import { useState, useEffect, useCallback } from 'react'

const COOKIE_CONSENT_KEY = 'JA_PADEL_COOKIE_CONSENT'
const COOKIE_PREFERENCES_KEY = 'JA_PADEL_COOKIE_PREFERENCES'

export function useCookieConsentSimple() {
  const [showBanner, setShowBanner] = useState(false)
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)

  // Cargar estado inicial
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
      
      if (savedConsent === null) {
        // Primera visita - mostrar banner
        console.log('Primera visita - mostrando banner')
        setShowBanner(true)
        setHasConsent(null)
      } else {
        // Ya hay consentimiento guardado
        const consentData = JSON.parse(savedConsent)
        console.log('Consentimiento encontrado:', consentData)
        setHasConsent(consentData.given)
        setShowBanner(false)
      }
    } catch (error) {
      console.error('Error loading cookie consent:', error)
      // En caso de error, mostrar banner
      setShowBanner(true)
      setHasConsent(null)
    }
  }, [])

  // Aceptar todas las cookies
  const acceptAll = useCallback(() => {
    console.log('Aceptando todas las cookies...')
    
    const newPreferences = {
      essential: true,
      analytics: true,
      marketing: true
    }

    const consentData = {
      given: true,
      timestamp: new Date().toISOString(),
      preferences: newPreferences
    }

    // Guardar en localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences))

    // Actualizar estado
    setHasConsent(true)
    setShowBanner(false)

    console.log('Cookies aceptadas y guardadas')

    // Activar analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted'
      })
    }
  }, [])

  // Rechazar cookies no esenciales
  const declineAll = useCallback(() => {
    console.log('Rechazando cookies no esenciales...')
    
    const newPreferences = {
      essential: true,
      analytics: false,
      marketing: false
    }

    const consentData = {
      given: false,
      timestamp: new Date().toISOString(),
      preferences: newPreferences
    }

    // Guardar en localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences))

    // Actualizar estado
    setHasConsent(false)
    setShowBanner(false)

    console.log('Cookies rechazadas y guardadas')

    // Desactivar analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted'
      })
    }
  }, [])

  // Aceptar con preferencias personalizadas
  const acceptWithPreferences = useCallback((customPreferences: any) => {
    console.log('Aceptando con preferencias:', customPreferences)
    
    const newPreferences = {
      essential: true,
      analytics: customPreferences.analytics || false,
      marketing: customPreferences.marketing || false
    }

    const consentData = {
      given: true,
      timestamp: new Date().toISOString(),
      preferences: newPreferences
    }

    // Guardar en localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences))

    // Actualizar estado
    setHasConsent(true)
    setShowBanner(false)

    console.log('Preferencias personalizadas guardadas')

    // Actualizar consentimiento de Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: newPreferences.analytics ? 'granted' : 'denied',
        ad_storage: newPreferences.marketing ? 'granted' : 'denied',
        functionality_storage: 'granted',
        personalization_storage: newPreferences.marketing ? 'granted' : 'denied',
        security_storage: 'granted'
      })
    }
  }, [])

  // Mostrar banner de nuevo
  const showBannerAgain = useCallback(() => {
    setShowBanner(true)
  }, [])

  // Ocultar banner
  const hideBanner = useCallback(() => {
    setShowBanner(false)
  }, [])

  return {
    hasConsent,
    showBanner,
    acceptAll,
    declineAll,
    acceptWithPreferences,
    showBannerAgain,
    hideBanner
  }
}

// Extender el objeto window para TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
