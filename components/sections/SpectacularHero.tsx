"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import PremiumButton from "@/components/ui/PremiumButton"
import { Play, ArrowRight, Sparkles, MapPin, Award, ThumbsUp, Target } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function SpectacularHero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Hook de traducciones
  const { t, isReady } = useTranslations()

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Desactivar en dispositivos móviles
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
      return;
    }
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  // Función para manejar click de inscripción
  const handleInscriptionClick = () => {
    window.open('https://www.rockthesport.com/es/evento/legendaria-ontinyent-gran-fondo', '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    // Solo ejecutar cuando las traducciones estén listas
    if (!isReady) return
    
    // Variables fuera del bloque para estar disponibles en el cleanup
    let bgScrollTrigger: any | null = null
    let parallaxScrollTrigger: any | null = null
    let masterTL: any = null
    const createdEventListeners: Array<{ target: Window | Element, type: string, handler: EventListenerOrEventListenerObject }> = []

    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)
        
        // Configurar GSAP para mejor rendimiento
        gsap.config({
          nullTargetWarn: false,
          trialWarn: false
        })
        
        setIsLoaded(true)

        if (heroRef.current) {
          const root = heroRef.current
          
          // Asegurar que los elementos existan antes de animar
          const titleElement = root.querySelector('.hero-title')
          const subtitleElement = root.querySelector('.hero-subtitle') as HTMLElement | null
          const ctaElement = root.querySelector('.hero-cta') as HTMLElement | null
          const bgElement = root.querySelector('.hero-bg')
          
          if (!titleElement || !subtitleElement || !ctaElement || !bgElement) {
            console.warn('Hero elements not found, skipping animation')
            return
          }

          const ctx = gsap.context(() => {
            // 🚀 HERO LEVEL MUNDIAL - TÉCNICAS APPLE/STRIPE/VERCEL
            masterTL = gsap.timeline({ delay: 0.5 })

            // Background parallax desactivado para una experiencia más estable en el primer scroll
            // @ts-expect-error gsap types
            bgScrollTrigger = null

            // 2. TITLE - WORLD-CLASS REVEAL
            const titleLines = titleElement.querySelectorAll('.title-line')
            if (titleLines.length > 0) {
              masterTL.fromTo(titleLines,
                { opacity: 0, y: 100, scale: 0.95, filter: "blur(20px)", rotationX: -15 },
                { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, duration: 1.2, ease: "power3.out", stagger: 0.2 },
                0
              )
            }

            // 3. SUBTITLE - TYPEWRITER PREMIUM
            const text = subtitleElement.textContent || ''
            if (text) {
              subtitleElement.textContent = ''
              subtitleElement.style.opacity = '1'
              masterTL.to({}, {
                duration: 2,
                ease: "none",
                onUpdate: function() {
                  const progress = this.progress()
                  const currentLength = Math.floor(progress * text.length)
                  subtitleElement.textContent = text.slice(0, currentLength)
                }
              }, 0.8)
            }


            // 5. FLOATING ELEMENTS - PHYSICS BASED
            const floatingElements = root!.querySelectorAll('.floating-element')
            floatingElements.forEach((element, index) => {
              gsap.to(element, { y: -30 + (index * 10), rotation: index % 2 === 0 ? 5 : -5, duration: 3 + (index * 0.5), ease: "power2.inOut", yoyo: true, repeat: -1, delay: index * 0.2 })
            })

            // 6. GLOBAL MOUSE PARALLAX
            let parallaxActive = true
            const hasParallaxTargets = document.querySelector('.parallax-light, .parallax-medium, .parallax-heavy') !== null
            const onWindowMouseMove = (e: MouseEvent) => {
              if (!parallaxActive || !hasParallaxTargets) return
              const { innerWidth, innerHeight } = window
              const xPercent = (e.clientX / innerWidth - 0.5) * 2
              const yPercent = (e.clientY / innerHeight - 0.5) * 2
              const light = document.querySelectorAll('.parallax-light')
              const medium = document.querySelectorAll('.parallax-medium')
              const heavy = document.querySelectorAll('.parallax-heavy')
              if (light.length) gsap.to(light, { x: xPercent * 30, y: yPercent * 30, duration: 0.5, ease: "power2.out" })
              if (medium.length) gsap.to(medium, { x: xPercent * 20, y: yPercent * 20, duration: 0.3, ease: "power2.out" })
              if (heavy.length) gsap.to(heavy, { x: xPercent * 10, y: yPercent * 10, duration: 0.6, ease: "power2.out" })
            }
            if (hasParallaxTargets) {
              window.addEventListener('mousemove', onWindowMouseMove, { passive: true })
              createdEventListeners.push({ target: window, type: 'mousemove', handler: onWindowMouseMove })
            }

            parallaxScrollTrigger = ScrollTrigger.create({
              trigger: root,
              start: "bottom center",
              onEnter: () => { parallaxActive = false },
              onLeaveBack: () => { parallaxActive = true }
            })
          }, heroRef)

          // Guardar contexto para revert en cleanup
          createdEventListeners.push({ target: { addEventListener() {}, removeEventListener() {} } as any, type: '__ctx__', handler: { handleEvent: () => {} } as any })
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
        setIsLoaded(true)
      }
    }

    loadGSAP()

    return () => {
      // Cleanup robusto al desmontar para evitar errores de removeChild en navegación
      try {
        // Eliminar listeners creados en este efecto
        createdEventListeners.forEach(({ target, type, handler }) => {
          if (target && typeof target.removeEventListener === 'function') {
            target.removeEventListener(type, handler as any)
          }
        })
      } catch (error) {
        console.warn('Error removing event listeners:', error)
      }

      try {
        // Matar timeline principal
        if (masterTL && typeof masterTL.kill === 'function') {
          masterTL.kill()
        }
      } catch (error) {
        console.warn('Error killing master timeline:', error)
      }

      try {
        // Matar ScrollTriggers asociados a este héroe
        const killScopedScrollTriggers = async () => {
          try {
            const { ScrollTrigger } = await import("gsap/ScrollTrigger")
            if (parallaxScrollTrigger && typeof parallaxScrollTrigger.kill === 'function') {
              parallaxScrollTrigger.kill()
            }
            if (bgScrollTrigger && typeof bgScrollTrigger.kill === 'function') {
              bgScrollTrigger.kill()
            }
            // Además, por seguridad, matar cualquier trigger cuyo trigger esté dentro del hero
            const root = heroRef.current
            if (root) {
              const all = ScrollTrigger.getAll()
              all.forEach(t => {
                try {
                  const trig = (t as any).vars?.trigger as Element | undefined
                  if (trig && root.contains(trig)) {
                    t.kill()
                  }
                } catch (error) {
                  console.warn('Error killing scroll trigger:', error)
                }
              })
            }
          } catch (error) {
            console.warn('Error in scroll trigger cleanup:', error)
          }
        }
        // Ejecutar sin bloquear el unmount
        killScopedScrollTriggers()
      } catch (error) {
        console.warn('Error in cleanup:', error)
      }
    }
  }, [isReady])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center section-dark-premium"
      role="banner"
      aria-label="Hero section"
      style={{
        minHeight: '100vh',
        minHeight: '100dvh', // Dynamic viewport height para móvil
      }}
    >
      {/* Imagen Hero Crítica - Optimizada para LCP */}
      <div className="hero-bg absolute inset-0 z-0">
        <Image
          src="/images/hero.horizontal.png"
          alt="Ciclistas en La Legendaria - Gran Fondo de Ontinyent"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            objectPosition: 'center bottom',
            willChange: 'transform'
          }}
        />
        {/* Optimized gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-primary-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-500/10 to-gold-500/20" />
      </div>

      {/* Premium Background Elements - Physics Based */}
      <div className="absolute inset-0 z-5 pointer-events-none" aria-hidden="true">
        {/* Premium particle system - Solo partículas pequeñas */}
        <div className="absolute inset-0 opacity-30">
          {[
            { left: 15, top: 25, size: 'w-2 h-2', class: 'parallax-light' },
            { left: 85, top: 15, size: 'w-1.5 h-1.5', class: 'parallax-medium' },
            { left: 25, top: 80, size: 'w-3 h-3', class: 'parallax-heavy' },
            { left: 75, top: 70, size: 'w-2.5 h-2.5', class: 'parallax-light' },
            { left: 45, top: 12, size: 'w-1 h-1', class: 'parallax-medium' }
          ].map((particle, i) => (
            <div
              key={i}
              className={`floating-element absolute ${particle.size} bg-gold-500 transform rotate-45 ${particle.class}`}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
            />
          ))}
        </div>
      </div>



          {/* Main Content - WORLD-CLASS HERO */}
          <div className="relative z-20 container mx-auto px-4 text-center text-white pt-24 lg:pt-20 flex flex-col items-center justify-center min-h-full w-full hero-mobile-center">

            {/* H1 ÚNICO - Optimizado para SEO */}
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-clash font-black mb-8 lg:mb-12 leading-none text-brand-white tracking-tight perspective-1000">
              <div className="title-line block mb-2 lg:mb-4">
                La Legendaria
              </div>
              <div className="title-line relative block">
                <span className="gold-text-gradient">ONTINYENT GRAN FONDO</span>
                <div className="absolute inset-0 bg-brand-gold/20 blur-3xl -z-10 floating-element" />
              </div>
            </h1>

            {/* SUBHEADLINE - Con keyword Valencia */}
            <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
              <p className="hero-subtitle text-lg sm:text-xl lg:text-2xl text-white/90 font-light leading-relaxed tracking-wide text-center parallax-light" style={{ opacity: isLoaded ? 1 : 0.8 }}>
                Tu próximo gran desafío
              </p>
              <p className="text-base sm:text-lg text-white/80 font-medium mt-4">
                SABADO 9 MAYO
              </p>
            </div>

            {/* CTA PRINCIPAL */}
            <div className="mb-12 lg:mb-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleInscriptionClick}
                className="hero-cta bg-brand-gold text-brand-black px-8 py-4 lg:px-12 lg:py-5 text-lg lg:text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-gold/50 focus:ring-offset-2"
                aria-label="Inscribirse en La Legendaria"
                type="button"
              >
                Inscríbete ahora
              </button>
            </div>

          </div>

      {/* Optimized Mouse follower effect - Solo en desktop */}
      {isLoaded && window.innerWidth > 768 && !('ontouchstart' in window) && (
        <div
          className="fixed w-6 h-6 bg-gold-500/30 rounded-full pointer-events-none z-50 mix-blend-screen transition-transform duration-100 ease-out"
          style={{
            left: Math.max(0, Math.min(window.innerWidth - 24, mousePosition.x - 12)),
            top: Math.max(0, Math.min(window.innerHeight - 24, mousePosition.y - 12)),
            transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
            willChange: "transform",
          }}
          aria-hidden="true"
        />
      )}
    </section>
  )
}
