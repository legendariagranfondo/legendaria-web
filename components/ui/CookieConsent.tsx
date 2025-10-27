"use client"

import { useState, useEffect } from 'react'
import { useCookieConsentSimple } from '@/hooks/use-cookie-consent-simple'
import Link from 'next/link'

export default function CookieConsentPremium() {
  const {
    hasConsent,
    showBanner,
    acceptAll,
    declineAll,
    acceptWithPreferences,
    hideBanner
  } = useCookieConsentSimple()

  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  })

  // Debug: mostrar estado actual
  console.log('Estado del banner:', { hasConsent, showBanner })

  // No mostrar banner si ya hay consentimiento
  if (hasConsent !== null && !showBanner) {
    console.log('No mostrando banner - ya hay consentimiento')
    return null
  }

  const handleAcceptAll = () => {
    console.log('Aceptando todas las cookies...')
    acceptAll()
    hideBanner()
    console.log('Cookies aceptadas')
  }

  const handleDeclineAll = () => {
    declineAll()
    hideBanner()
  }

  const handleShowPreferences = () => {
    setShowPreferences(true)
  }

  const handleSavePreferences = () => {
    acceptWithPreferences(preferences)
    setShowPreferences(false)
    hideBanner()
  }

  const handleCancelPreferences = () => {
    setShowPreferences(false)
  }

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'essential') return // Essential siempre debe estar activo
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <>
      {/* Cookie Consent Banner */}
      {showBanner && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"></div>
          <div className="cookie-consent-premium">
          <div className="cookie-content">
            <div className="cookie-title">
              <span className="text-2xl">🍪</span>
              <span>Uso de Cookies en JA Padel Academy</span>
            </div>
            
            <div className="cookie-description">
              Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. 
              Al continuar navegando, aceptas nuestro uso de cookies según nuestra política de privacidad.
            </div>
            
            <div className="cookie-links">
              <Link 
                href="/politica-cookies" 
                className="cookie-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Cookies
              </Link>
              <Link 
                href="/politica-privacidad" 
                className="cookie-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad
              </Link>
              <button
                onClick={handleShowPreferences}
                className="cookie-link cursor-pointer"
                type="button"
              >
                Configurar Preferencias
              </button>
            </div>
            
            <div className="cookie-buttons">
              <button
                onClick={handleAcceptAll}
                className="cookie-button"
                type="button"
              >
                Aceptar Todas
              </button>
              <button
                onClick={handleDeclineAll}
                className="cookie-decline-button"
                type="button"
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
        </>
      )}

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="cookie-preferences-modal">
          <div className="cookie-preferences-content">
            <div className="cookie-preferences-header">
              <div className="cookie-preferences-title">
                <span className="text-2xl">🍪</span>
                <span>Configuración de Cookies</span>
              </div>
              <p className="text-gray-300 text-sm mt-2">
                Personaliza tu experiencia seleccionando qué tipos de cookies aceptas.
              </p>
            </div>
            
            <div className="cookie-preferences-body">
              {/* Essential Cookies */}
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <div>
                    <div className="cookie-category-title">Cookies Esenciales</div>
                    <div className="cookie-category-description">
                      Necesarias para el funcionamiento básico del sitio web. No se pueden desactivar.
                    </div>
                  </div>
                  <div className="cookie-toggle checked">
                    <div className="cookie-toggle-thumb"></div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <div>
                    <div className="cookie-category-title">Cookies Analíticas</div>
                    <div className="cookie-category-description">
                      Nos ayudan a entender cómo interactúas con nuestro sitio para mejorarlo.
                    </div>
                  </div>
                  <button
                    className={`cookie-toggle ${preferences.analytics ? 'checked' : ''}`}
                    onClick={() => togglePreference('analytics')}
                    type="button"
                  >
                    <div className="cookie-toggle-thumb"></div>
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <div>
                    <div className="cookie-category-title">Cookies de Marketing</div>
                    <div className="cookie-category-description">
                      Para mostrarte contenido personalizado y ofertas relevantes.
                    </div>
                  </div>
                  <button
                    className={`cookie-toggle ${preferences.marketing ? 'checked' : ''}`}
                    onClick={() => togglePreference('marketing')}
                    type="button"
                  >
                    <div className="cookie-toggle-thumb"></div>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="cookie-preferences-footer">
              <button
                className="cookie-cancel-button"
                onClick={handleCancelPreferences}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="cookie-save-button"
                onClick={handleSavePreferences}
                type="button"
              >
                Guardar Preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
