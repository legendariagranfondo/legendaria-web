"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight, Star, Crown, Sparkles, Play } from "lucide-react"

export default function PremiumExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (!sectionRef.current) return
        const root = sectionRef.current

        const ctx = gsap.context(() => {
          // Animación de entrada suave y elegante
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          })

          if (titleRef.current) {
            tl.fromTo(titleRef.current, 
              { opacity: 0, y: 60, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
            )
          }

          if (subtitleRef.current) {
            tl.fromTo(subtitleRef.current,
              { opacity: 0, y: 40, filter: "blur(10px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" },
              "-=0.6"
            )
          }

          if (ctaRef.current) {
            tl.fromTo(ctaRef.current,
              { opacity: 0, y: 30, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
              "-=0.4"
            )
          }

          const bgEl = root.querySelector('.hero-bg')
          if (bgEl) {
            gsap.to(bgEl, {
              yPercent: -20,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            })
          }
        }, sectionRef)

        return () => { try { ctx.revert() } catch {} }
      } catch (error) {
        console.error("Error loading GSAP:", error)
      }
    }

    let disposer: (() => void) | undefined
    let mounted = true
    loadGSAP().then((fn) => { if (mounted && typeof fn === 'function') disposer = fn })
    return () => { mounted = false; try { if (disposer) disposer() } catch {} }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center bg-black"
    >
      {/* Imagen de fondo heroica - 100% de la sección */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/Valencia_CAC.jpg"
          alt="Experiencia Premium de Pádel en Valencia"
          fill
          className="object-cover w-full h-full"
          priority
          quality={95}
          sizes="100vw"
        />
        {/* Overlay elegante */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Elementos decorativos de lujo */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Partículas doradas flotantes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-gold rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-brand-gold rounded-full animate-ping opacity-40" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-brand-gold rounded-full animate-ping opacity-30" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Badge de exclusividad */}
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 px-6 py-3 text-brand-gold text-sm font-medium backdrop-blur-sm mb-8">
            <Crown className="w-4 h-4" />
            <span>EXPERIENCIA EXCLUSIVA</span>
          </div>

          {/* Título principal */}
          <h2 
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-clash font-black leading-none tracking-tight mb-8"
          >
            VIVE EL PÁDEL
            <br />
            <span className="text-brand-gold">COMO NUNCA ANTES</span>
          </h2>

          {/* Subtítulo aspiracional */}
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto mb-12"
          >
            Experiencias exclusivas en Valencia para verdaderos apasionados del pádel. 
            <span className="text-brand-gold font-medium">Donde la pasión se encuentra con la excelencia.</span>
          </p>

          {/* CTA premium */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group bg-brand-gold text-brand-black px-12 py-5 text-xl font-black transition-all duration-500 shadow-2xl hover:shadow-brand-gold/50 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-gold/50 focus:ring-offset-2 transform -skew-x-3 hover:skew-x-0 flex items-center gap-4">
              <span>DESCUBRE LA EXPERIENCIA</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button className="group border-2 border-white/30 text-white px-8 py-4 text-lg font-medium hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 transform -skew-x-3 hover:skew-x-0 flex items-center gap-3">
              <Play className="w-5 h-5" />
              <span>Ver Video</span>
            </button>
          </div>

        </div>
      </div>

      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-brand-gold/5 to-transparent" />
      </div>
    </section>
  )
}
