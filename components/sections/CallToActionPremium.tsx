"use client"

import { useEffect, useRef } from "react"
import PremiumButton from "@/components/ui/PremiumButton"
import WhatsAppCTA from "@/components/ui/WhatsAppCTA"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"
import { WHATSAPP_CONFIG, generateWhatsAppUrl, trackWhatsAppEvent } from "@/lib/whatsapp-config"
import { useTranslations } from "@/hooks/use-translations"

export default function CallToActionPremium() {
  const { t, isReady } = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Función para abrir inscripción
  const openInscription = () => {
    window.open('https://www.rockthesport.com/es/evento/legendaria-ontinyent-gran-fondo', '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (sectionRef.current && contentRef.current) {
          // Simple entrance animation - NO floating
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 50 },
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
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
      }
    }

    loadGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-cement-50 to-white text-brand-black relative"
    >
      {/* Separator Element - Transición suave */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-cement-50/30" aria-hidden="true" />
      

      <div className="container mx-auto px-4 relative z-10">
        <div ref={contentRef} className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-clash font-black mb-8 lg:mb-12 leading-none tracking-tight">
            <span className="text-brand-black">Reserva tu</span>
            <br />
            <span className="text-brand-gold">PLAZA</span>
          </h2>

          <p className="text-lg text-cement-500 mb-8">
            También puedes suscribirte al boletín para novedades, sorteos y descuentos.
          </p>

          {/* CTA Buttons - Angular y limpio */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              onClick={openInscription}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black px-12 py-5 font-black text-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-4 group transform -skew-x-3 hover:skew-x-0"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              INSCRÍBETE
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => {
                // Aquí se podría abrir un modal de suscripción al boletín
                alert('Próximamente: Suscripción al boletín')
              }}
              className="bg-transparent border-2 border-brand-black text-brand-black px-12 py-5 font-black text-xl hover:bg-brand-black hover:text-brand-white transition-all duration-300 flex items-center gap-4 group transform -skew-x-3 hover:skew-x-0"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              SUSCRIBIRSE AL BOLETÍN
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
