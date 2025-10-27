"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"

export default function PoliticaPrivacidad() {
  const { t, isReady } = useTranslations()
  return (
    <div className="min-h-screen bg-brand-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-black via-gray-900 to-brand-black text-brand-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              {isReady ? t("privacyPage.hero.title") : "Política de"} <span className="gold-text-gradient">{isReady ? t("privacyPage.hero.titleHighlight") : "Privacidad"}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {isReady ? t("privacyPage.hero.description") : "Protección y tratamiento responsable de tus datos personales"}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>{isReady ? t("privacyPage.hero.lastUpdate") : "Última actualización:"}</span>
              <span className="text-gold-400 font-semibold">{isReady ? t("privacyPage.hero.date") : "10 de enero de 2025"}</span>
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
                <span className="text-2xl">🔒</span>
                {isReady ? t("privacyPage.intro.title") : "Información General"}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isReady ? t("privacyPage.intro.description") : "En JA Padel Academy, nos comprometemos a proteger tu privacidad y tratar tus datos personales de manera responsable y transparente, cumpliendo con la normativa vigente (GDPR, LOPD-GDD)."}
              </p>
              <div className="bg-gold-50 border border-gold-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>{isReady ? t("privacyPage.intro.responsible") : "Responsable del tratamiento:"}</strong> JA Padel Academy Valencia<br/>
                  <strong>{isReady ? t("privacyPage.intro.email") : "Email:"}</strong> japadelacademy@gmail.com<br/>
                  <strong>{isReady ? t("privacyPage.intro.phone") : "Teléfono:"}</strong> +34 644 46 58 73<br/>
                  <strong>{isReady ? t("privacyPage.intro.address") : "Dirección:"}</strong> Origen Padel, Valencia, España
                </p>
              </div>
            </div>

            {/* Datos que Recopilamos */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {isReady ? t("privacyPage.data.title") : "Datos que recopilamos"}
              </h2>
              
              <div className="space-y-6">
                <div className="border border-gold-200 rounded-xl p-6 bg-gradient-to-r from-gold-50 to-transparent">
                  <h3 className="text-xl font-semibold text-brand-black mb-3">
                    {isReady ? t("privacyPage.data.identification.title") : "Datos de identificación"}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>{isReady ? t("privacyPage.data.identification.item1") : "Nombre y apellidos"}</li>
                    <li>{isReady ? t("privacyPage.data.identification.item2") : "Dirección de correo electrónico"}</li>
                    <li>{isReady ? t("privacyPage.data.identification.item3") : "Número de teléfono"}</li>
                    <li>{isReady ? t("privacyPage.data.identification.item4") : "Fecha de nacimiento"}</li>
                  </ul>
                </div>

                <div className="border border-cement-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-brand-black mb-3">
                    {isReady ? t("privacyPage.data.navigation.title") : "Datos de navegación"}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>{isReady ? t("privacyPage.data.navigation.item1") : "Dirección IP"}</li>
                    <li>{isReady ? t("privacyPage.data.navigation.item2") : "Información del navegador"}</li>
                    <li>{isReady ? t("privacyPage.data.navigation.item3") : "Páginas visitadas"}</li>
                    <li>{isReady ? t("privacyPage.data.navigation.item4") : "Tiempo de permanencia"}</li>
                  </ul>
                </div>

                <div className="border border-cement-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-brand-black mb-3">
                    {isReady ? t("privacyPage.data.preferences.title") : "Datos de preferencias"}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>{isReady ? t("privacyPage.data.preferences.item1") : "Preferencias de cookies"}</li>
                    <li>{isReady ? t("privacyPage.data.preferences.item2") : "Configuraciones de notificaciones"}</li>
                    <li>{isReady ? t("privacyPage.data.preferences.item3") : "Intereses deportivos"}</li>
                    <li>{isReady ? t("privacyPage.data.preferences.item4") : "Nivel de pádel"}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Finalidades del Tratamiento */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {isReady ? t("privacyPage.purposes.title") : "Finalidades del tratamiento"}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mt-2"></span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.purposes.service.title") : "Gestión de servicios"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.purposes.service.description") : "Procesar reservas y gestionar clases"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mt-2"></span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.purposes.communication.title") : "Comunicación"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.purposes.communication.description") : "Enviar confirmaciones y actualizaciones"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mt-2"></span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.purposes.improvement.title") : "Mejora del servicio"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.purposes.improvement.description") : "Analizar el uso para optimizar la experiencia"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mt-2"></span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.purposes.marketing.title") : "Marketing"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.purposes.marketing.description") : "Enviar ofertas y promociones (con consentimiento)"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mt-2"></span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.purposes.legal.title") : "Cumplimiento legal"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.purposes.legal.description") : "Cumplir con obligaciones fiscales y contables"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mt-2"></span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.purposes.security.title") : "Seguridad"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.purposes.security.description") : "Proteger contra fraudes y garantizar la seguridad"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Base Legal */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {isReady ? t("privacyPage.legal.title") : "Base legal del tratamiento"}
              </h2>
              <div className="space-y-4">
                <div className="border border-gold-200 rounded-lg p-4 bg-gold-50">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.legal.consent.title") : "Consentimiento"}</h3>
                  <p className="text-sm text-gray-600">
                    {isReady ? t("privacyPage.legal.consent.description") : "Para el envío de comunicaciones comerciales y el uso de cookies no esenciales."}
                  </p>
                </div>
                <div className="border border-cement-200 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.legal.contractual.title") : "Ejecución contractual"}</h3>
                  <p className="text-sm text-gray-600">
                    {isReady ? t("privacyPage.legal.contractual.description") : "Para la prestación de servicios de entrenamiento y gestión de reservas."}
                  </p>
                </div>
                <div className="border border-cement-200 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.legal.legitimate.title") : "Interés legítimo"}</h3>
                  <p className="text-sm text-gray-600">
                    {isReady ? t("privacyPage.legal.legitimate.description") : "Para la mejora de nuestros servicios y análisis de uso del sitio web."}
                  </p>
                </div>
                <div className="border border-cement-200 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.legal.obligation.title") : "Obligación legal"}</h3>
                  <p className="text-sm text-gray-600">
                    {isReady ? t("privacyPage.legal.obligation.description") : "Para el cumplimiento de obligaciones fiscales y contables."}
                  </p>
                </div>
              </div>
            </div>

            {/* Derechos del Usuario */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {isReady ? t("privacyPage.rights.title") : "Tus derechos"}
              </h2>
              <p className="text-gray-700 mb-6">
                {isReady ? t("privacyPage.rights.description") : "Tienes derecho a acceder, rectificar, suprimir, limitar, portar y oponerte al tratamiento de tus datos personales."}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gold-200 rounded-lg p-4 bg-gold-50">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.rights.access.title") : "Acceso"}</h3>
                  <p className="text-sm text-gray-600">{isReady ? t("privacyPage.rights.access.description") : "Conocer qué datos tenemos sobre ti"}</p>
                </div>
                <div className="border border-cement-200 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.rights.rectification.title") : "Rectificación"}</h3>
                  <p className="text-sm text-gray-600">{isReady ? t("privacyPage.rights.rectification.description") : "Corregir datos inexactos o incompletos"}</p>
                </div>
                <div className="border border-cement-200 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.rights.erasure.title") : "Supresión"}</h3>
                  <p className="text-sm text-gray-600">{isReady ? t("privacyPage.rights.erasure.description") : "Eliminar tus datos cuando sea posible"}</p>
                </div>
                <div className="border border-cement-200 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.rights.limitation.title") : "Limitación"}</h3>
                  <p className="text-sm text-gray-600">{isReady ? t("privacyPage.rights.limitation.description") : "Restringir el tratamiento de tus datos"}</p>
                </div>
                <div className="border border-cement-200 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.rights.portability.title") : "Portabilidad"}</h3>
                  <p className="text-sm text-gray-600">{isReady ? t("privacyPage.rights.portability.description") : "Recibir tus datos en formato estructurado"}</p>
                </div>
                <div className="border border-cement-200 rounded-lg p-4">
                  <h3 className="font-semibold text-brand-black mb-2">{isReady ? t("privacyPage.rights.opposition.title") : "Oposición"}</h3>
                  <p className="text-sm text-gray-600">{isReady ? t("privacyPage.rights.opposition.description") : "Oponerte al tratamiento de tus datos"}</p>
                </div>
              </div>
            </div>

            {/* Conservación de Datos */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {isReady ? t("privacyPage.retention.title") : "Conservación de datos"}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
                  <span className="text-gray-700">
                    <strong>{isReady ? t("privacyPage.retention.active.title") : "Datos de clientes activos:"}</strong> {isReady ? t("privacyPage.retention.active.description") : "Mientras mantengas relación comercial con nosotros"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
                  <span className="text-gray-700">
                    <strong>{isReady ? t("privacyPage.retention.navigation.title") : "Datos de navegación:"}</strong> {isReady ? t("privacyPage.retention.navigation.description") : "Máximo 2 años desde la última visita"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
                  <span className="text-gray-700">
                    <strong>{isReady ? t("privacyPage.retention.accounting.title") : "Datos contables:"}</strong> {isReady ? t("privacyPage.retention.accounting.description") : "6 años según normativa fiscal"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
                  <span className="text-gray-700">
                    <strong>{isReady ? t("privacyPage.retention.marketing.title") : "Datos de marketing:"}</strong> {isReady ? t("privacyPage.retention.marketing.description") : "Hasta que retires el consentimiento"}
                  </span>
                </div>
              </div>
            </div>

            {/* Seguridad */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-black mb-6">
                {isReady ? t("privacyPage.security.title") : "Medidas de seguridad"}
              </h2>
              <p className="text-gray-700 mb-6">
                {isReady ? t("privacyPage.security.description") : "Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales:"}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-gold-400 text-xl">🔐</span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.security.ssl.title") : "Cifrado SSL"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.security.ssl.description") : "Todas las comunicaciones están cifradas"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold-400 text-xl">🛡️</span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.security.access.title") : "Acceso restringido"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.security.access.description") : "Solo personal autorizado accede a los datos"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-gold-400 text-xl">🔄</span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.security.backup.title") : "Copias de seguridad"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.security.backup.description") : "Respaldo regular de todos los datos"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gold-400 text-xl">📊</span>
                    <div>
                      <h3 className="font-semibold text-brand-black">{isReady ? t("privacyPage.security.audit.title") : "Auditorías regulares"}</h3>
                      <p className="text-sm text-gray-600">{isReady ? t("privacyPage.security.audit.description") : "Revisión periódica de medidas de seguridad"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacto y Reclamaciones */}
            <div className="bg-gradient-to-r from-brand-black to-gray-800 text-brand-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">
                {isReady ? t("privacyPage.contact.title") : "Ejercer tus derechos"}
              </h2>
              <p className="text-gray-300 mb-6">
                {isReady ? t("privacyPage.contact.description") : "Para ejercer cualquiera de tus derechos o si tienes preguntas sobre el tratamiento de tus datos, puedes contactarnos de las siguientes formas:"}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-3">{isReady ? t("privacyPage.contact.direct.title") : "Contacto directo"}</h3>
                  <p className="text-sm text-gray-300 mb-2">{isReady ? t("privacyPage.contact.direct.email") : "Email: japadelacademy@gmail.com"}</p>
                  <p className="text-sm text-gray-300 mb-2">{isReady ? t("privacyPage.contact.direct.phone") : "Teléfono: +34 644 46 58 73"}</p>
                  <p className="text-sm text-gray-300">{isReady ? t("privacyPage.contact.direct.address") : "Dirección: Origen Padel, Valencia, España"}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">{isReady ? t("privacyPage.contact.authority.title") : "Autoridad de control"}</h3>
                  <p className="text-sm text-gray-300 mb-2">{isReady ? t("privacyPage.contact.authority.name") : "Agencia Española de Protección de Datos"}</p>
                  <p className="text-sm text-gray-300 mb-2">{isReady ? t("privacyPage.contact.authority.web") : "Web: www.aepd.es"}</p>
                  <p className="text-sm text-gray-300">{isReady ? t("privacyPage.contact.authority.phone") : "Teléfono: 901 100 099"}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${isReady ? t("locale") : "es"}/contacto`}
                  className="gold-gradient text-brand-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 text-center"
                >
                  {isReady ? t("privacyPage.contact.contactButton") : "Contactar con nosotros"}
                </Link>
                <Link
                  href={`/${isReady ? t("locale") : "es"}/politica-cookies`}
                  className="bg-transparent text-brand-white border border-gold-400 px-6 py-3 rounded-lg hover:bg-gold-400 hover:text-brand-black transition-all duration-300 text-center"
                >
                  {isReady ? t("privacyPage.contact.cookiesButton") : "Ver Política de Cookies"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
