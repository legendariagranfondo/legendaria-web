"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react"
import GoogleMap, { GoogleMapFallback } from "@/components/maps/GoogleMap"
import SimpleGoogleMap from "@/components/maps/SimpleGoogleMap"
import { GOOGLE_MAPS_CONFIG, isGoogleMapsConfigured } from "@/lib/config"
import { trackWhatsAppEvent, WHATSAPP_CONFIG } from "@/lib/whatsapp-config"
import { useTranslations } from "@/hooks/use-translations"


export default function OrigenPadelSection() {
  const { t, isReady } = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (sectionRef.current && imageRef.current && contentRef.current) {
          // Animate image with parallax - Sin scale que cause overflow
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            },
          )

          // Animate content - Sin transformaciones que causen overflow
          gsap.fromTo(
            contentRef.current.children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contentRef.current,
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
    <section ref={sectionRef} className="py-20 lg:py-32 bg-gradient-to-b from-white to-cement-50 relative">
      {/* Separator Element - Transición suave */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-cement-50/30" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Map Section */}
          <div ref={imageRef} className="relative w-full overflow-hidden">
            <div className="relative w-full">
              {/* Usar iframe simple temporalmente mientras se configura la API */}
              <SimpleGoogleMap height="h-[400px] md:h-[600px]" />
              {/* Angular info card - Compacto y con opacidad - Oculto en móvil */}
              <div className="hidden md:block absolute bottom-4 left-4 max-w-xs bg-white/90 backdrop-blur-md border-l-4 border-brand-gold p-4 shadow-xl hover:bg-white/95 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-brand-gold text-brand-black flex items-center justify-center transform rotate-45">
                    <MapPin className="w-4 h-4 transform -rotate-45" />
                  </div>
                  <div>
                    <h4 className="font-clash font-black text-brand-black text-sm">ORIGEN PADEL CLUB</h4>
                    <p className="text-cement-600 text-xs font-bold">PATERNA, VALENCIA</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs mb-3">
                  <div className="flex items-center gap-2 text-cement-700 font-medium">
                    <div className="w-2 h-2 bg-brand-gold transform rotate-45"></div>
                    <span>7:00 - 23:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-cement-700 font-medium">
                    <div className="w-2 h-2 bg-brand-gold transform rotate-45"></div>
                    <span>+34 961 34 46 73</span>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(`https://maps.google.com/?q=39.52161,-0.47234`, '_blank')}
                  className="w-full bg-brand-black text-white px-3 py-2 text-xs font-black hover:bg-brand-gold hover:text-brand-black transition-all duration-300 transform -skew-x-3 hover:skew-x-0"
                >
                  VER EN MAPAS
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="space-y-8 w-full overflow-hidden">
            <div>
              <div className="inline-flex items-center px-4 md:px-8 py-3 md:py-4 bg-brand-gold text-brand-black font-black mb-6 md:mb-8 transform -skew-x-6 hover:skew-x-0 transition-transform duration-300 shadow-lg">
                <MapPin className="w-6 h-6 mr-3" />
                {isReady ? t("origenPadel.badge") : "NUESTRO HOGAR"}
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-clash font-black text-brand-black mb-6 md:mb-8 leading-none tracking-tight">
                <span className="text-brand-gold">{isReady ? t("origenPadel.title") : "ORIGEN PADEL"}</span>
                <br />
                {isReady ? t("origenPadel.subtitle") : "CLUB"}
              </h2>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 md:mb-8">
                {isReady ? t("origenPadel.description") : "Ubicado en Paterna, Origen Padel Club es el hogar de JA Padel Academy. Nuestras instalaciones de última generación en Carrer Ciutat d'Ontinyent ofrecen el entorno perfecto para que desarrolles tu máximo potencial en el pádel."}
              </p>
            </div>


            {/* CTA Angular */}
            <div className="flex justify-center">
              <a 
                href="https://www.origenpadelclub.es/#1" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  // Tracking del click
                  trackWhatsAppEvent(
                    WHATSAPP_CONFIG.tracking.events.origen_padel_website_click,
                    'home',
                    'origen_padel'
                  )
                }}
                className="bg-brand-black text-white px-4 md:px-8 py-3 md:py-4 font-black text-base md:text-lg transform -skew-x-3 hover:skew-x-0 hover:scale-105 hover:bg-brand-gold hover:text-brand-black transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
              >
{isReady ? t("origenPadel.cta") : "CONOCER CLUB"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
