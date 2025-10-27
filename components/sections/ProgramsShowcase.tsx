"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import PremiumButton from "@/components/ui/PremiumButton"
import OptimizedImage from "@/components/ui/OptimizedImage"
import { Clock, Users, Target, ArrowRight, Sparkles } from "lucide-react"
import { handleProgramWhatsAppClick } from "@/lib/whatsapp-config"
import { useTranslations } from "@/hooks/use-translations"


export default function ProgramsShowcase() {
  const { t, isReady } = useTranslations()
  const [activeProgram, setActiveProgram] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // Generar programas dinámicamente basados en traducciones
  const getPrograms = () => [
    {
      id: 1,
      title: isReady ? t("programs.individual.title") : "Clases Particulares",
      subtitle: isReady ? t("programs.individual.subtitle") : "Transformación individual",
      description: isReady ? t("programs.individual.description") : "Acelera tu evolución con entrenamiento 1:1. Corrección técnica instantánea y plan de mejora personalizado para cada golpe.",
      duration: "1h",
      groupSize: "1-2 personas",
      level: isReady ? t("programs.individual.level") : "Todos los niveles",
      image: "/images/bandeja-gato-grey.png",
      features: isReady ? [
        t("programs.individual.features.0"),
        t("programs.individual.features.1"),
        t("programs.individual.features.2")
      ] : ["Corrección técnica instantánea", "Horarios flexibles", "Progreso acelerado"],
      color: "from-primary-600 to-primary-800",
      premium: false,
      cta: isReady ? t("programs.individual.cta") : "RESERVAR CLASE",
      programType: "clases_particulares" as const,
    },
    {
      id: 2,
      title: isReady ? t("programs.group.title") : "Clases en Grupo",
      subtitle: isReady ? t("programs.group.subtitle") : "Evolución colectiva",
      description: isReady ? t("programs.group.description") : "Domina la táctica de pareja en grupos reducidos. Aprende a leer el juego y desarrollar estrategias ganadoras.",
      duration: "1h",
      groupSize: "3-4 personas",
      level: isReady ? t("programs.group.level") : "Todos los niveles",
      image: "/images/carlos-lucia-grey.png",
      features: isReady ? [
        t("programs.group.features.0"),
        t("programs.group.features.1"),
        t("programs.group.features.2")
      ] : ["Técnica y táctica", "Juego en grupo", "Ambiente social"],
      color: "from-primary-700 to-primary-900",
      premium: false,
      cta: isReady ? t("programs.group.cta") : "VER HORARIOS",
      programType: "clases_grupo" as const,
    },
    {
      id: 3,
      title: isReady ? t("programs.premium.title") : "Packs Personalizados",
      subtitle: isReady ? t("programs.premium.subtitle") : "Experiencias memorables",
      description: isReady ? t("programs.premium.description") : "Crea momentos únicos: regalos especiales, visitas a Valencia o experiencias premium. Diseñamos tu experiencia ideal.",
      duration: "Variable",
      groupSize: "Variable",
      level: isReady ? t("programs.premium.level") : "Personalizado",
      image: "/images/raquel-ana-grey.png",
      features: isReady ? [
        t("programs.premium.features.0"),
        t("programs.premium.features.1"),
        t("programs.premium.features.2")
      ] : ["Diseño de experiencia a medida", "Regalos especiales", "Visitas a Valencia"],
      color: "from-brand-gold to-brand-gold/80",
      premium: true,
      cta: isReady ? t("programs.premium.cta") : "DISEÑAR EXPERIENCIA",
      programType: "packs_personalizados" as const,
    },
  ]

  const programs = getPrograms()

  useEffect(() => {
    const loadGSAP = async () => {
      const { loadGSAP } = await import("@/lib/gsap-loader")
      const { gsap, ScrollTrigger } = await loadGSAP()

      if (!gsap || !ScrollTrigger) return

      if (sectionRef.current && cardsRef.current) {
        // Animate section entrance
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          },
        )

        // Animate cards with stagger
        gsap.fromTo(
          cardsRef.current.children,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotation: 5,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          },
        )
      }
    }

    loadGSAP()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="py-20 lg:py-32 bg-gradient-to-b from-cement-50 to-white relative"
      aria-labelledby="programs-heading"
    >
      {/* Separator Element - Transición suave */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-cement-50/30" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="text-center mb-8 lg:mb-12">
          <h2 id="programs-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clash font-black text-brand-black mb-6 lg:mb-8 leading-none tracking-tight">
            {isReady ? t("programsShowcase.title") : "NUESTROS"}
            <br />
            <span className="text-brand-gold">{isReady ? t("programsShowcase.subtitle") : "PROGRAMAS"}</span>
          </h2>
          <p className="text-lg sm:text-xl text-cement-700 max-w-4xl mx-auto leading-relaxed font-light">
            {isReady ? t("programsShowcase.description") : "Modalidades adaptadas a tu nivel y objetivos. Desde clases particulares hasta packs personalizados para experiencias únicas"}
          </p>
        </div>

        <div ref={cardsRef} className="programs-showcase-grid max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className="program-card-container relative group cursor-pointer transition-all duration-300 hover:-translate-y-4 hover:scale-105 h-full"
              onMouseEnter={() => setActiveProgram(index)}
            >
              {/* Premium badge - Angular */}
              {program.premium && (
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="bg-brand-gold text-brand-black px-4 py-2 text-xs font-black shadow-lg transform -skew-x-12 hover:skew-x-0 transition-transform duration-300">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    PREMIUM
                  </div>
                </div>
              )}

              <div
                className={`program-card-responsive relative bg-gradient-to-br ${program.color} overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform group-hover:-translate-y-4 group-hover:scale-105 border-l-4 border-brand-gold h-full flex flex-col`}
              >
                {/* Background image - Direct implementation */}
                <div 
                  className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${program.image})`
                  }}
                />

                {/* Angular shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 overflow-hidden" />

                {/* Angular cut corners */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-white/20" />
                <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[30px] border-r-transparent border-t-[30px] border-t-white/20" />

                <div className="program-card-content relative z-10 p-6 text-white flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-4 pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold transform -skew-x-6">
                        {program.level}
                      </span>
                    </div>

                    <h3 className="text-2xl font-clash font-black mb-2">{program.title}</h3>
                    <p className="text-white/80 font-bold mb-3 text-sm">{program.subtitle}</p>
                    <p className="text-white/90 leading-relaxed text-sm">{program.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{program.groupSize}</span>
                    </div>
                  </div>

                  {/* Features - Angular bullets */}
                  <ul className="program-card-features mb-1 flex-grow">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-white/90 font-medium text-sm">
                        <div className="w-2 h-2 bg-white transform rotate-45 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA - Angular buttons */}
                  <button 
                    className={`w-full py-3 font-black text-sm transform -skew-x-3 hover:skew-x-0 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mt-auto focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 ${
                      program.premium 
                        ? "bg-brand-gold text-brand-black" 
                        : "bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                    }`}
                    aria-label={`${program.cta} - ${program.title}`}
                    type="button"
                    onClick={() => handleProgramWhatsAppClick(program.programType)}
                  >
                    {program.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>

                {/* Angular decorative elements */}
                <div className="absolute top-6 right-6 w-12 h-12 border-2 border-white/30 transform rotate-45" />
                <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/20 transform rotate-45" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
