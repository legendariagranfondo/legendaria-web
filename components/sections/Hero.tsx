"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamic import of GSAP to avoid SSR issues
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      const { SplitText } = await import("gsap/SplitText")

      gsap.registerPlugin(ScrollTrigger, SplitText)

      if (titleRef.current && subtitleRef.current && ctaRef.current) {
        // Split text animation
        const titleSplit = new SplitText(titleRef.current, { type: "words,chars" })
        const subtitleSplit = new SplitText(subtitleRef.current, { type: "words" })

        // Set initial states
        gsap.set(titleSplit.chars, { opacity: 0, y: 100, rotationX: -90 })
        gsap.set(subtitleSplit.words, { opacity: 0, y: 50 })
        gsap.set(ctaRef.current.children, { opacity: 0, y: 30 })

        // Create timeline
        const tl = gsap.timeline({ delay: 0.5 })

        tl.to(titleSplit.chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
        })
          .to(
            subtitleSplit.words,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.4",
          )
          .to(
            ctaRef.current.children,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.2,
              ease: "power2.out",
            },
            "-=0.3",
          )

        // Parallax effect
        gsap.to(heroRef.current, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      }
    }

    loadGSAP()
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Valencia_CAC.jpg"
          alt="Pista de pádel profesional"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-bold mb-6 leading-tight"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          Transforma Tu{" "}
          <span className="text-primary-800 relative">
            Pádel
            <div className="absolute inset-0 bg-primary-800/20 blur-xl -z-10" />
          </span>
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Descubre la academia premium donde la técnica se encuentra con la pasión. Vive experiencias únicas y eleva tu
          juego al siguiente nivel.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-primary-800 hover:bg-primary-900 text-white px-8 py-4 text-lg font-semibold group"
          >
            Ver Clases
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold group bg-transparent"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Vive la Experiencia
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
