"use client"

import { useState, useEffect, useCallback } from 'react'

export interface CookieConsentState {
  hasConsent: boolean | null
  showBanner: boolean
  consentGiven: boolean
  analyticsEnabled: boolean
  marketingEnabled: boolean
}

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'JA_PADEL_COOKIE_CONSENT'
const COOKIE_PREFERENCES_KEY = 'JA_PADEL_COOKIE_PREFERENCES'

export function useCookieConsent() {
  const [state, setState] = useState<CookieConsentState>({
    hasConsent: null,
    showBanner: false,
    consentGiven: false,
    analyticsEnabled: false,
    marketingEnabled: false
  })

  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Siempre true
    analytics: false,
    marketing: false
  })

  // Cargar estado inicial
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)

      if (savedConsent === null) {
        // Primera visita - mostrar banner
        setState(prev => ({
          ...prev,
          showBanner: true,
          hasConsent: null
        }))
      } else {
        // Ya hay consentimiento guardado
        const consentData = JSON.parse(savedConsent)
        const prefsData = savedPreferences ? JSON.parse(savedPreferences) : preferences

        setState({
          hasConsent: consentData.given,
          showBanner: false,
          consentGiven: consentData.given,
          analyticsEnabled: consentData.given && prefsData.analytics,
          marketingEnabled: consentData.given && prefsData.marketing
        })

        setPreferences(prefsData)
      }
    } catch (error) {
      console.error('Error loading cookie consent:', error)
      // En caso de error, mostrar banner
      setState(prev => ({
        ...prev,
        showBanner: true,
        hasConsent: null
      }))
    }
  }, [])

  // Aceptar todas las cookies
  const acceptAll = useCallback(() => {
    console.log('Hook acceptAll ejecutándose...')
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

    console.log('Guardando en localStorage:', consentData)
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences))

    console.log('Actualizando estado...')
    setState({
      hasConsent: true,
      showBanner: false,
      consentGiven: true,
      analyticsEnabled: true,
      marketingEnabled: true
    })

    setPreferences(newPreferences)
    console.log('Estado actualizado, banner debería ocultarse')

    // Activar analytics con consentimiento completo
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

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences))

    setState({
      hasConsent: false,
      showBanner: false,
      consentGiven: false,
      analyticsEnabled: false,
      marketingEnabled: false
    })

    setPreferences(newPreferences)

    // Desactivar analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      })
    }
  }, [])

  // Aceptar con preferencias personalizadas
  const acceptWithPreferences = useCallback((customPreferences: Partial<CookiePreferences>) => {
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

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences))

    setState({
      hasConsent: true,
      showBanner: false,
      consentGiven: true,
      analyticsEnabled: newPreferences.analytics,
      marketingEnabled: newPreferences.marketing
    })

    setPreferences(newPreferences)

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

  // Mostrar banner de nuevo (para cambiar preferencias)
  const showBanner = useCallback(() => {
    setState(prev => ({
      ...prev,
      showBanner: true
    }))
  }, [])

  // Ocultar banner
  const hideBanner = useCallback(() => {
    setState(prev => ({
      ...prev,
      showBanner: false
    }))
  }, [])

  // Resetear consentimiento
  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    localStorage.removeItem(COOKIE_PREFERENCES_KEY)
    
    setState({
      hasConsent: null,
      showBanner: true,
      consentGiven: false,
      analyticsEnabled: false,
      marketingEnabled: false
    })

    setPreferences({
      essential: true,
      analytics: false,
      marketing: false
    })
  }, [])

  return {
    ...state,
    preferences,
    acceptAll,
    declineAll,
    acceptWithPreferences,
    showBanner,
    hideBanner,
    resetConsent
  }
}

// Extender el objeto window para TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
