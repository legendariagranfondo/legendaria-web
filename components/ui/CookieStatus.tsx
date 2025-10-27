"use client"

import { useCookieConsent } from '@/hooks/use-cookie-consent'
import Link from 'next/link'

export default function CookieStatus() {
  const { hasConsent, analyticsEnabled, marketingEnabled, showBanner } = useCookieConsent()

  // No mostrar si no hay consentimiento o si el banner está visible
  if (hasConsent === null || showBanner) {
    return null
  }

  return (
    <div className="bg-gold-50 border border-gold-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍪</span>
          <div>
            <h3 className="font-semibold text-brand-black text-sm">
              Preferencias de Cookies
            </h3>
            <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
              <span className={`flex items-center gap-1 ${analyticsEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                <span className="w-2 h-2 rounded-full bg-current"></span>
                Analytics: {analyticsEnabled ? 'Activado' : 'Desactivado'}
              </span>
              <span className={`flex items-center gap-1 ${marketingEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                <span className="w-2 h-2 rounded-full bg-current"></span>
                Marketing: {marketingEnabled ? 'Activado' : 'Desactivado'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/politica-cookies"
            className="text-xs text-gold-600 hover:text-gold-700 underline"
          >
            Política de Cookies
          </Link>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-gold-600 hover:text-gold-700 underline"
          >
            Cambiar Preferencias
          </button>
        </div>
      </div>
    </div>
  )
}
