"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, ArrowRight, Sparkles, Phone, Smartphone } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

// Icono personalizado de WhatsApp
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)
import { cn } from "@/lib/utils"

interface WhatsAppCTAProps {
  phoneNumber?: string
  message?: string
  className?: string
  variant?: "premium" | "simple" | "card"
  title?: string
  description?: string
  pageContext?: "home" | "academia" | "programas" | "experiencias" | "contact"
}

export default function WhatsAppCTA({
  phoneNumber = "+34644465873",
  message = "",
  className = "",
  variant = "premium",
  title = "¿Tienes dudas?",
  description = "Chatea con nosotros por WhatsApp",
  pageContext = "home"
}: WhatsAppCTAProps) {
  const { t, isReady } = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Mensajes personalizados según el contexto
  const getContextualMessage = () => {
    const baseMessage = "¡Hola! Me interesa conocer más sobre JA Padel Academy."
    
    const contextualMessages = {
      home: `${baseMessage} Vi la web y quiero información sobre los programas.`,
      academia: `${baseMessage} Quiero saber más sobre la metodología y entrenamientos.`,
      programas: `${baseMessage} Me interesa conocer los programas disponibles.`,
      experiencias: `${baseMessage} Quiero información sobre las experiencias premium.`,
      contact: `${baseMessage} Tengo una consulta específica.`
    }

    return message || contextualMessages[pageContext] || baseMessage
  }

  // Generar URL de WhatsApp
  const getWhatsAppUrl = () => {
    const encodedMessage = encodeURIComponent(getContextualMessage())
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
  }

  // Tracking de conversión
  const trackWhatsAppClick = () => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_cta_click', {
        event_category: 'conversion',
        event_label: `${pageContext}_${variant}`,
        value: 1
      })
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: `WhatsApp CTA ${pageContext}`,
        content_category: 'contact'
      })
    }

    console.log(`WhatsApp CTA clicked from ${pageContext}`)
  }

  // Animaciones GSAP
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (sectionRef.current && contentRef.current) {
          // Animación de entrada
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            },
          )

          // Animación de hover en el botón
          const button = contentRef.current.querySelector('.whatsapp-button')
          if (button) {
            gsap.set(button, { transformOrigin: "center" })
          }
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
      }
    }

    loadGSAP()
  }, [])

  // Variantes del componente
  const getVariantClasses = () => {
    switch (variant) {
      case "premium":
        return "bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-8 shadow-lg hover:shadow-xl"
      case "simple":
        return "bg-white border border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md"
      case "card":
        return "bg-gradient-to-br from-brand-black to-brand-black/90 text-brand-white rounded-2xl p-8 shadow-2xl hover:shadow-green-500/25"
      default:
        return "bg-green-50 border border-green-200 rounded-lg p-6"
    }
  }

  const getButtonClasses = () => {
    switch (variant) {
      case "premium":
        return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      case "simple":
        return "bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
      case "card":
        return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
      default:
        return "bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
    }
  }

  return (
    <section ref={sectionRef} className={cn("transition-all duration-300 overflow-hidden whatsapp-container", className)}>
      <div ref={contentRef} className={cn(getVariantClasses(), "overflow-hidden")}>
        <div className="text-center">
          {/* Icono */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <WhatsAppIcon className="w-12 h-12 text-green-500" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Título */}
          <h3 className={cn(
            "text-2xl font-bold mb-3",
            variant === "card" ? "text-brand-white" : "text-brand-black"
          )}>
            {title}
          </h3>

          {/* Descripción */}
          <p className={cn(
            "text-lg mb-6",
            variant === "card" ? "text-cement-300" : "text-cement-600"
          )}>
            {description}
          </p>

          {/* Botón de WhatsApp */}
          <button
            onClick={() => {
              trackWhatsAppClick()
              window.open(getWhatsAppUrl(), '_blank')
            }}
            className={cn(
              "whatsapp-button group flex items-center justify-center gap-3 mx-auto transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/50",
              getButtonClasses()
            )}
            aria-label={isReady ? t("whatsapp.ariaLabel") : "Contactar por WhatsApp"}
          >
            <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>{isReady ? t("whatsapp.button") : "Chatear por WhatsApp"}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Texto adicional para variante premium */}
          {variant === "premium" && null}

          {/* Texto adicional para variante card */}
          {variant === "card" && (
            <div className="mt-6 flex items-center justify-center gap-2 text-cement-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Soporte premium 24/7</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
