"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

interface FounderRevealProps {
  name: string
  role: string
  photo: string
  bio: string
  highlights: string[]
  quote: string
}

export default function FounderReveal({ name, role, photo, bio, highlights, quote }: FounderRevealProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let tl: any
    const run = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        if (!sectionRef.current) return
        const image = sectionRef.current.querySelector('.founder-image')
        const text = sectionRef.current.querySelectorAll('.founder-text')

        // Configurar estado inicial - imagen oculta
        gsap.set(image, { opacity: 0, y: 80, scale: 0.8, filter: "blur(20px)" })
        gsap.set(text, { opacity: 0, y: 60, filter: "blur(12px)" })

        // ScrollTrigger para la imagen - se revela al hacer scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          onEnter: () => {
            gsap.to(image, { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              filter: "blur(0px)", 
              duration: 1.2, 
              ease: "power3.out" 
            })
          },
          onLeave: () => {
            gsap.to(image, { 
              opacity: 0, 
              y: -80, 
              scale: 0.8, 
              filter: "blur(20px)", 
              duration: 0.8, 
              ease: "power2.in" 
            })
          },
          onEnterBack: () => {
            gsap.to(image, { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              filter: "blur(0px)", 
              duration: 1.2, 
              ease: "power3.out" 
            })
          },
          onLeaveBack: () => {
            gsap.to(image, { 
              opacity: 0, 
              y: 80, 
              scale: 0.8, 
              filter: "blur(20px)", 
              duration: 0.8, 
              ease: "power2.in" 
            })
          }
        })

        // ScrollTrigger para el texto - se revela después de la imagen
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.8,
          onEnter: () => {
            gsap.to(text, { 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)", 
              duration: 1, 
              ease: "power2.out", 
              stagger: 0.1 
            })
          },
          onLeave: () => {
            gsap.to(text, { 
              opacity: 0, 
              y: -40, 
              filter: "blur(8px)", 
              duration: 0.6, 
              ease: "power2.in" 
            })
          },
          onEnterBack: () => {
            gsap.to(text, { 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)", 
              duration: 1, 
              ease: "power2.out", 
              stagger: 0.1 
            })
          },
          onLeaveBack: () => {
            gsap.to(text, { 
              opacity: 0, 
              y: 40, 
              filter: "blur(8px)", 
              duration: 0.6, 
              ease: "power2.in" 
            })
          }
        })
      } catch (e) {
        // ignore
      }
    }
    run()
    return () => { 
      if (tl && typeof tl.kill === 'function') tl.kill()
      // Verificar que ScrollTrigger esté disponible antes de usarlo
      if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.getAll) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-brand-gold/5 via-brand-white to-brand-gold/5">
      {/* Desktop: Sticky Container, Mobile: Normal Container con padding extra */}
      <div className="lg:sticky lg:top-0 lg:h-screen w-full min-h-[800px] lg:min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-brand-gold transform rotate-45 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-primary-800 transform -rotate-12 blur-2xl" />
        </div>

        <div className="w-full h-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
            {/* Image Container - Estática */}
            <div className="relative w-full h-96 lg:h-full order-1 lg:order-1 founder-image">
              <Image
                src={photo}
                alt={name}
                fill
                className="object-cover shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
            </div>

            {/* Content Container - Mitad pantalla para texto */}
            <div className="text-brand-black space-y-6 lg:space-y-8 order-2 lg:order-2 flex flex-col justify-center p-8 lg:p-12 pb-16 lg:pb-12">
              {/* Role */}
              <p className="text-brand-gold font-black text-sm lg:text-base tracking-wider uppercase founder-text">
                {role}
              </p>

              {/* Name */}
              <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-clash font-black leading-none tracking-tight founder-text">
                {name}
              </h3>

              {/* Bio */}
              <p className="text-lg lg:text-xl text-cement-700 leading-relaxed font-light max-w-2xl founder-text">
                {bio}
              </p>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-3 founder-text">
                  {highlights.map((h, i) => (
                    <span key={i} className="px-4 py-2 bg-brand-gold/10 text-brand-gold text-sm font-semibold">{h}</span>
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-2xl font-clash text-brand-black/90 italic founder-text">"{quote}"</blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


