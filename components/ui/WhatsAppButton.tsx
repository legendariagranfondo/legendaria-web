"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Phone, Calendar, Sparkles, Smartphone } from "lucide-react"

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

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  className?: string
  variant?: "floating" | "inline" | "cta"
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  tooltipText?: string
  pageContext?: "home" | "academia" | "programas" | "experiencias" | "contact"
}

export default function WhatsAppButton({
  phoneNumber = "+34644465873",
  message = "",
  className = "",
  variant = "floating",
  size = "md",
  showTooltip = true,
  tooltipText = "WhatsApp",
  pageContext = "home"
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

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
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: pageContext,
        value: 1
      })
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: `WhatsApp ${pageContext}`,
        content_category: 'contact'
      })
    }

    console.log(`WhatsApp clicked from ${pageContext}`)
  }

  // Animaciones GSAP
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        
        if (buttonRef.current) {
          // Animación de entrada más suave
          gsap.fromTo(
            buttonRef.current,
            { 
              scale: 0, 
              opacity: 0,
              y: 30,
              rotation: -10
            },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.4)"
            }
          )
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
      }
    }

    loadGSAP()
  }, [])

  // Animación del tooltip cuando aparece
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        
        if (tooltipRef.current && showTooltip && isHovered) {
          gsap.fromTo(
            tooltipRef.current,
            { opacity: 0, scale: 0.8, y: 5 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "back.out(1.7)"
            }
          )
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
      }
    }

    if (isHovered) {
      loadGSAP()
    }
  }, [isHovered, showTooltip])

  // Detectar scroll y mostrar botón después de pasar la primera sección
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Mostrar botón después de pasar la primera sección (aproximadamente 100vh)
      if (scrollY > windowHeight * 0.8 && !hasScrolled) {
        setHasScrolled(true)
        // Delay adicional para que aparezca suavemente
        setTimeout(() => {
          setIsVisible(true)
          // Animación adicional después de aparecer
          setTimeout(async () => {
            if (buttonRef.current) {
              try {
                const { gsap } = await import("gsap")
                gsap.to(buttonRef.current, {
                  scale: 1.1,
                  duration: 0.2,
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.out"
                })
              } catch (error) {
                console.error("Error loading GSAP for bounce animation:", error)
              }
            }
          }, 300)
        }, 500)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])


  // Tamaños del botón
  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-16 h-16 text-xl",
    lg: "w-20 h-20 text-2xl"
  }

  // Variantes del botón
  const getVariantClasses = () => {
    switch (variant) {
      case "floating":
        return "fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white shadow-2xl hover:shadow-green-500/25"
      case "inline":
        return "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
      case "cta":
        return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl hover:shadow-2xl"
      default:
        return "bg-green-500 hover:bg-green-600 text-white"
    }
  }

  if (!isVisible) return null

  return (
    <div className="relative overflow-hidden whatsapp-container">
      {/* Icono de WhatsApp en lugar del tooltip */}
      {showTooltip && isHovered && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full right-0 mb-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-50"
        >
          <WhatsAppIcon className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Botón principal */}
      <button
        ref={buttonRef}
        onClick={() => {
          trackWhatsAppClick()
          window.open(getWhatsAppUrl(), '_blank')
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50",
          sizeClasses[size],
          getVariantClasses(),
          className
        )}
        aria-label="Contactar por WhatsApp"
        title="Chatea con nosotros por WhatsApp"
      >
        {/* Icono de WhatsApp */}
        <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
        
        {/* Efecto sutil de brillo en hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        
        {/* Borde sutil */}
        <div className="absolute inset-0 rounded-full border-2 border-green-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Indicador sutil de notificación */}
      {variant === "floating" && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center shadow-sm">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      )}
    </div>
  )
}
