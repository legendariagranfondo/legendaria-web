"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"

export default function PoliticaCookies() {
  const { t, isReady } = useTranslations()
  return (
    <div className="min-h-screen bg-brand-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-black via-gray-900 to-brand-black text-brand-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              {isReady ? t("cookiesPage.hero.title") : "Política de"} <span className="gold-text-gradient">{isReady ? t("cookiesPage.hero.titleHighlight") : "Cookies"}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {isReady ? t("cookiesPage.hero.description") : "Información transparente sobre el uso de cookies en JA Padel Academy"}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>{isReady ? t("cookiesPage.hero.lastUpdate") : "Última actualización:"}</span>
              <span className="text-gold-400 font-semibold">{isReady ? t("cookiesPage.hero.date") : "10 de enero de 2025"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            
            {/* Introducción */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6 flex items-center gap-3">
                <span className="text-2xl">🍪</span>
                {isReady ? t("cookiesPage.intro.title") : "¿Qué son las cookies?"}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isReady ? t("cookiesPage.intro.description1") : "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Estas cookies nos ayudan a mejorar tu experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido."}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {isReady ? t("cookiesPage.intro.description2") : "En JA Padel Academy, utilizamos cookies de manera responsable y transparente, siempre respetando tu privacidad y cumpliendo con la normativa vigente (GDPR, LOPD)."}
              </p>
            </div>

            {/* Tipos de Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {isReady ? t("cookiesPage.types.title") : "Tipos de cookies que utilizamos"}
              </h2>
              
              <div className="space-y-6">
                {/* Cookies Esenciales */}
                <div className="border border-gold-200 rounded-xl p-6 bg-gradient-to-r from-gold-50 to-transparent">
                  <h3 className="text-xl font-semibold text-brand-black mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-gold-400 rounded-full"></span>
                    {isReady ? t("cookiesPage.types.essential.title") : "Cookies Esenciales"}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {isReady ? t("cookiesPage.types.essential.description") : "Estas cookies son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar."}
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>{isReady ? t("cookiesPage.types.essential.item1") : "Cookies de sesión para mantener tu sesión activa"}</li>
                    <li>{isReady ? t("cookiesPage.types.essential.item2") : "Cookies de seguridad para proteger contra ataques"}</li>
                    <li>{isReady ? t("cookiesPage.types.essential.item3") : "Cookies de preferencias de idioma"}</li>
                    <li>{isReady ? t("cookiesPage.types.essential.item4") : "Cookies de consentimiento de cookies"}</li>
                  </ul>
                </div>

                {/* Cookies Analíticas */}
                <div className="border border-cement-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-brand-black mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    {isReady ? t("cookiesPage.types.analytics.title") : "Cookies Analíticas"}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {isReady ? t("cookiesPage.types.analytics.description") : "Nos ayudan a entender cómo interactúas con nuestro sitio para mejorarlo y optimizar la experiencia."}
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>{isReady ? t("cookiesPage.types.analytics.item1") : "Google Analytics para análisis de tráfico"}</li>
                    <li>{isReady ? t("cookiesPage.types.analytics.item2") : "Métricas de rendimiento del sitio"}</li>
                    <li>{isReady ? t("cookiesPage.types.analytics.item3") : "Análisis de comportamiento del usuario"}</li>
                    <li>{isReady ? t("cookiesPage.types.analytics.item4") : "Estadísticas de uso de funcionalidades"}</li>
                  </ul>
                </div>

                {/* Cookies de Marketing */}
                <div className="border border-cement-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-brand-black mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    {isReady ? t("cookiesPage.types.marketing.title") : "Cookies de Marketing"}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {isReady ? t("cookiesPage.types.marketing.description") : "Para mostrarte contenido personalizado y ofertas relevantes sobre nuestros servicios."}
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>{isReady ? t("cookiesPage.types.marketing.item1") : "Facebook Pixel para remarketing"}</li>
                    <li>{isReady ? t("cookiesPage.types.marketing.item2") : "Google Ads para publicidad personalizada"}</li>
                    <li>{isReady ? t("cookiesPage.types.marketing.item3") : "Cookies de redes sociales"}</li>
                    <li>{isReady ? t("cookiesPage.types.marketing.item4") : "Segmentación de audiencia"}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Gestión de Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {isReady ? t("cookiesPage.management.title") : "Cómo gestionar las cookies"}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-brand-black mb-3">
                    {isReady ? t("cookiesPage.management.website.title") : "En nuestro sitio web"}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {isReady ? t("cookiesPage.management.website.description") : "Puedes configurar tus preferencias de cookies en cualquier momento utilizando el banner de cookies que aparece en la parte inferior de la página."}
                  </p>
                  <div className="bg-gold-50 border border-gold-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>💡 {isReady ? t("cookiesPage.management.website.tip") : "Consejo:"}</strong> {isReady ? t("cookiesPage.management.website.tipText") : "Si ya has aceptado las cookies, puedes cambiar tus preferencias haciendo clic en \"Configurar Preferencias\" en el banner de cookies."}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-brand-black mb-3">
                    {isReady ? t("cookiesPage.management.browser.title") : "En tu navegador"}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {isReady ? t("cookiesPage.management.browser.description") : "También puedes gestionar las cookies directamente desde la configuración de tu navegador:"}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-cement-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-black mb-2">{isReady ? t("cookiesPage.management.browser.chrome.title") : "Google Chrome"}</h4>
                      <p className="text-sm text-gray-600">
                        {isReady ? t("cookiesPage.management.browser.chrome.path") : "Configuración → Privacidad y seguridad → Cookies y datos de sitios"}
                      </p>
                    </div>
                    <div className="border border-cement-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-black mb-2">{isReady ? t("cookiesPage.management.browser.firefox.title") : "Mozilla Firefox"}</h4>
                      <p className="text-sm text-gray-600">
                        {isReady ? t("cookiesPage.management.browser.firefox.path") : "Opciones → Privacidad y seguridad → Cookies y datos del sitio"}
                      </p>
                    </div>
                    <div className="border border-cement-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-black mb-2">{isReady ? t("cookiesPage.management.browser.safari.title") : "Safari"}</h4>
                      <p className="text-sm text-gray-600">
                        {isReady ? t("cookiesPage.management.browser.safari.path") : "Preferencias → Privacidad → Cookies y datos de sitios web"}
                      </p>
                    </div>
                    <div className="border border-cement-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-black mb-2">{isReady ? t("cookiesPage.management.browser.edge.title") : "Microsoft Edge"}</h4>
                      <p className="text-sm text-gray-600">
                        {isReady ? t("cookiesPage.management.browser.edge.path") : "Configuración → Cookies y permisos de sitio → Cookies y datos almacenados"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Duración de Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {isReady ? t("cookiesPage.duration.title") : "Duración de las cookies"}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
                  <span className="text-gray-700">
                    <strong>{isReady ? t("cookiesPage.duration.session.title") : "Cookies de sesión:"}</strong> {isReady ? t("cookiesPage.duration.session.description") : "Se eliminan al cerrar el navegador"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
                  <span className="text-gray-700">
                    <strong>{isReady ? t("cookiesPage.duration.persistent.title") : "Cookies persistentes:"}</strong> {isReady ? t("cookiesPage.duration.persistent.description") : "Permanecen hasta 365 días o hasta que las elimines"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
                  <span className="text-gray-700">
                    <strong>{isReady ? t("cookiesPage.duration.consent.title") : "Cookies de consentimiento:"}</strong> {isReady ? t("cookiesPage.duration.consent.description") : "Se mantienen hasta que cambies tus preferencias"}
                  </span>
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-gradient-to-r from-brand-black to-gray-800 text-brand-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">
                {isReady ? t("cookiesPage.contact.title") : "¿Tienes preguntas sobre nuestras cookies?"}
              </h2>
              <p className="text-gray-300 mb-6">
                {isReady ? t("cookiesPage.contact.description") : "Si tienes alguna duda sobre nuestra política de cookies o quieres ejercer tus derechos, no dudes en contactarnos."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${isReady ? t("locale") : "es"}/contacto`}
                  className="gold-gradient text-brand-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 text-center"
                >
                  {isReady ? t("cookiesPage.contact.contactButton") : "Contactar con nosotros"}
                </Link>
                <Link
                  href={`/${isReady ? t("locale") : "es"}/politica-privacidad`}
                  className="bg-transparent text-brand-white border border-gold-400 px-6 py-3 rounded-lg hover:bg-gold-400 hover:text-brand-black transition-all duration-300 text-center"
                >
                  {isReady ? t("cookiesPage.contact.privacyButton") : "Ver Política de Privacidad"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
