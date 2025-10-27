"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Trophy, Users, Zap } from "lucide-react"

export default function CompetitionTeams() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
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
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          })

          if (titleRef.current) {
            tl.fromTo(titleRef.current, { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" })
          }
          if (subtitleRef.current) {
            tl.fromTo(subtitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8")
          }
          if (statsRef.current) {
            tl.fromTo(statsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
          }
          if (ctaRef.current) {
            tl.fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
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
      className="relative bg-gradient-to-br from-slate-50 to-white"
      aria-labelledby="teams-heading"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full">
        <div className="w-full h-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
            
            {/* Columna izquierda - Contenido */}
            <div className="text-center lg:text-left flex flex-col justify-center p-8 lg:p-12 order-1 lg:order-1">

              {/* Título principal */}
              <h2 
                ref={titleRef}
                id="teams-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clash font-black leading-none tracking-tight mb-6"
              >
                ENTRENA Y <span className="gold-text-gradient">COMPITE</span>
              </h2>

              {/* Subtítulo inspirador */}
              <p 
                ref={subtitleRef}
                className="text-lg sm:text-xl lg:text-2xl text-brand-black/90 font-light leading-relaxed mb-8"
              >
                Únete a nuestros equipos de competición y vive la experiencia de entrenar y competir 
                <br />
                <span className="text-brand-gold font-medium">en un entorno excepcional de alto nivel deportivo.</span>
              </p>

              {/* CTA */}
              <div ref={ctaRef} className="flex items-center justify-center lg:justify-start mt-8">
                <button className="group bg-brand-gold text-brand-black px-10 py-4 text-lg font-black transition-all duration-500 shadow-2xl hover:shadow-brand-gold/50 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-gold/50 focus:ring-offset-2 transform -skew-x-3 hover:skew-x-0 flex items-center gap-3">
                  <span>ÚNETE AL EQUIPO</span>
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Columna derecha - Imagen */}
            <div className="relative w-full h-full order-2 lg:order-2">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/joan-padelrace.jpg"
                  alt="Equipos de Competición JA Padel Academy en acción"
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
