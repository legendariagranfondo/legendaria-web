"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface ProgramCard {
  id: string
  title: string
  subtitle: string
  image: string
}

export default function OurPrograms() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (sectionRef.current) {
          // Animate main content
          gsap.fromTo(
            sectionRef.current.querySelectorAll('.program-header'),
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            },
          )

          // Animate program cards
          gsap.fromTo(
            sectionRef.current.querySelectorAll('.program-card'),
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
              },
            },
          )

          // Animate section cards
          gsap.fromTo(
            sectionRef.current.querySelectorAll('.section-card'),
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
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

  const programsByProfile: ProgramCard[] = [
    {
      id: "adults",
      title: "ADULTOS",
      subtitle: "Adultos",
      image: "/images/carlos-lucia.jpg"
    },
    {
      id: "juniors", 
      title: "JUNIORS",
      subtitle: "Juniors (8 a 17 años)",
      image: "/images/guille-adri.jpg"
    }
  ]

  const programsByDuration: ProgramCard[] = [
    {
      id: "weekly",
      title: "SEMANAL",
      subtitle: "Semana",
      image: "/images/joan-padelrace.jpg"
    },
    {
      id: "monthly",
      title: "FIN DE SEMANA", 
      subtitle: "Weekend",
      image: "/images/gato-manu-padelrace.jpg"
    }
  ]

  const programsByType: ProgramCard[] = [
    {
      id: "padel",
      title: "PÁDEL",
      subtitle: "Pádel",
      image: "/images/bandeja-joan.jpg"
    },
    {
      id: "competition",
      title: "COMPETICIÓN",
      subtitle: "Pádel & Competición",
      image: "/images/liga-equipo.png"
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-black relative">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 opacity-20 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-32 h-32 border border-orange-500 transform rotate-45" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border border-orange-500 transform rotate-45" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-orange-500/50 transform rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Header - Exact Mouratoglou Style */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 lg:mb-32">
            {/* Left Side - Title */}
            <div className="program-header">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 lg:mb-12 leading-none tracking-tight">
                NUESTROS
                <br />
                PROGRAMAS
              </h2>
              
              <div className="text-xl sm:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed tracking-wide">
                TODA EDAD,
                <br />
                TODO NIVEL,
                <br />
                TODA SEMANA DEL AÑO
              </div>
            </div>

            {/* Right Side - By Profile */}
            <div className="program-header">
              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-8 lg:mb-12 tracking-wider">
                POR PERFIL
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {programsByProfile.map((program) => (
                  <div key={program.id} className="program-card group cursor-pointer">
                    <div className="relative overflow-hidden aspect-[4/3] hover:shadow-2xl transition-all duration-500">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                      
                      {/* Text Overlay - Exact Mouratoglou Position */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                        <h4 className="text-2xl lg:text-3xl xl:text-4xl font-black text-white mb-2 leading-none tracking-tight">
                          {program.title}
                        </h4>
                        
                        <div className="flex items-center text-white/90 group-hover:translate-x-2 transition-transform duration-300">
                          <span className="text-base lg:text-lg font-medium mr-2">{program.subtitle}</span>
                          <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* By Duration Section */}
          <div className="mb-20 lg:mb-32">
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-8 lg:mb-12 tracking-wider program-header">
              POR DURACIÓN
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {programsByDuration.map((program) => (
                <div key={program.id} className="section-card group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[3/4] hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                      <h4 className="text-xl lg:text-2xl font-black text-white mb-2 leading-none tracking-tight">
                        {program.title}
                      </h4>
                      
                      <div className="flex items-center text-white/90 group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-sm lg:text-base font-medium mr-2">{program.subtitle}</span>
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Type Section */}
          <div>
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-8 lg:mb-12 tracking-wider program-header">
              POR TIPO
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {programsByType.map((program) => (
                <div key={program.id} className="section-card group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[3/4] hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                      <h4 className="text-xl lg:text-2xl font-black text-white mb-2 leading-none tracking-tight">
                        {program.title}
                      </h4>
                      
                      <div className="flex items-center text-white/90 group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-sm lg:text-base font-medium mr-2">{program.subtitle}</span>
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
