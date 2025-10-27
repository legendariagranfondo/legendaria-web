"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import SectionReveal from "@/components/animations/SectionReveal"
// Historia simple sin animación avanzada
import WhatsAppCTA from "@/components/ui/WhatsAppCTA"
import FounderReveal from "@/components/sections/FounderReveal"
import { Target, Brain, Zap, Heart } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"



// Los datos se generarán dinámicamente en el componente

export default function AcademiaPage() {
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { t, isReady } = useTranslations()

  // Generar datos del fundador dinámicamente
  const getFounder = () => ({
    name: isReady ? t("academyPage.founder.name") : "Joan Aparici",
    role: isReady ? t("academyPage.founder.role") : "Fundador & Director Técnico",
    photo: "/images/joan-cupra-hd.jpg",
    bio: isReady ? t("academyPage.founder.bio") : "Cada jugador tiene un potencial único esperando ser descubierto. Mi visión es crear un espacio donde el error no sea un obstáculo, sino el camino hacia la excelencia. En JA Padel Academy, transformamos cada derrota en una lección y cada victoria en un nuevo punto de partida.",
    highlights: [],
    quote: isReady ? t("academyPage.founder.quote") : "El pádel no se trata solo de ganar puntos, se trata de ganar perspectiva.",
  })

  const founder = getFounder()

  // Generar entrenadores dinámicamente
  const getCoaches = () => [
    { name: isReady ? t("academyPage.team.coaches.0.name") : "Joan Aparici", role: isReady ? t("academyPage.team.coaches.0.role") : "Head Coach", photo: "/images/joan-volea-grey.png", badges: ["Elite Coach", "Metodología JA"], bio: isReady ? t("academyPage.team.coaches.0.bio") : "Head Coach con metodología propia. Especializado en desarrollo integral de jugadores." },
    { name: isReady ? t("academyPage.team.coaches.1.name") : "Luis Gandasegui", role: isReady ? t("academyPage.team.coaches.1.role") : "Coach Senior", photo: "/images/luis-grey.png", badges: ["Técnica", "Táctica"], bio: isReady ? t("academyPage.team.coaches.1.bio") : "Coach Senior con 40+ años entrenando profesionales. Especialista en técnica y táctica." },
    { name: isReady ? t("academyPage.team.coaches.2.name") : "Jordi", role: isReady ? t("academyPage.team.coaches.2.role") : "Entrenador", photo: "/images/jordi-grey.png", badges: ["Físico", "Fisio"], bio: isReady ? t("academyPage.team.coaches.2.bio") : "Entrenador experto en preparación física y fisioterapia. Prevención de lesiones." },
    { name: isReady ? t("academyPage.team.coaches.3.name") : "Jorge Guillem", role: isReady ? t("academyPage.team.coaches.3.role") : "Entrenador", photo: "/images/jorge-guillem-grey.png", badges: ["Competición", "Matchplay"], bio: isReady ? t("academyPage.team.coaches.3.bio") : "Especialista en competición y matchplay. Aplica técnica en situaciones reales." },
    { name: isReady ? t("academyPage.team.coaches.4.name") : "Jorge Domingo", role: isReady ? t("academyPage.team.coaches.4.role") : "Entrenador", photo: "/images/jorge-domingo-grey.png", badges: ["Técnica", "Análisis"], bio: isReady ? t("academyPage.team.coaches.4.bio") : "Especialista en análisis técnico y corrección de gestos. Mejora continua." },
    { name: isReady ? t("academyPage.team.coaches.5.name") : "Manu", role: isReady ? t("academyPage.team.coaches.5.role") : "Entrenador", photo: "/images/manu-gato-espaldas-grey.png", badges: ["Técnica", "Base"], bio: isReady ? t("academyPage.team.coaches.5.bio") : "Entrenador con experiencia en todos los niveles. Especialista en técnica y fundamentos." },
  ]

  const coaches = getCoaches()

  // Generar pilares de metodología dinámicamente
  const getPillars = () => [
    { title: isReady ? t("academyPage.methodology.pillars.0.title") : "Técnica", desc: isReady ? t("academyPage.methodology.pillars.0.description") : "Gestos eficientes, consistencia y control del error.", icon: Target },
    { title: isReady ? t("academyPage.methodology.pillars.1.title") : "Táctica", desc: isReady ? t("academyPage.methodology.pillars.1.description") : "Patrones de juego y toma de decisiones bajo presión.", icon: Brain },
    { title: isReady ? t("academyPage.methodology.pillars.2.title") : "Física", desc: isReady ? t("academyPage.methodology.pillars.2.description") : "Fuerza específica, desplazamientos y prevención.", icon: Heart },
    { title: isReady ? t("academyPage.methodology.pillars.3.title") : "Mental", desc: isReady ? t("academyPage.methodology.pillars.3.description") : "Rutinas, foco competitivo y gestión emocional.", icon: Zap },
  ]

  const pillars = getPillars()

  // Generar FAQs dinámicamente
  const getFaqs = () => [
    { q: isReady ? t("academyPage.faq.questions.0.question") : "¿Necesito nivel mínimo?", a: isReady ? t("academyPage.faq.questions.0.answer") : "No. Evaluamos tu punto de partida y diseñamos tu plan personal." },
    { q: isReady ? t("academyPage.faq.questions.1.question") : "¿Tamaño de grupo?", a: isReady ? t("academyPage.faq.questions.1.answer") : "Trabajamos en grupos reducidos (4–6) o en formato individual." },
    { q: isReady ? t("academyPage.faq.questions.2.question") : "¿Hacéis análisis de vídeo?", a: isReady ? t("academyPage.faq.questions.2.answer") : "Sí. Ofrecemos sesiones con reporte técnico y plan de mejoras." },
    { q: isReady ? t("academyPage.faq.questions.3.question") : "¿Dónde estáis?", a: isReady ? t("academyPage.faq.questions.3.answer") : "En Origen Padel, Valencia. Fácil acceso y parking." },
    { q: isReady ? t("academyPage.faq.questions.4.question") : "¿Puedo probar una clase?", a: isReady ? t("academyPage.faq.questions.4.answer") : "Sí. Agenda una clase valoración para definir objetivos." },
    { q: isReady ? t("academyPage.faq.questions.5.question") : "¿Trabajáis con seniors/niños?", a: isReady ? t("academyPage.faq.questions.5.answer") : "Sí. Adaptamos metodología a cada etapa y objetivo." },
  ]

  const faqs = getFaqs()

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        
        gsap.registerPlugin(ScrollTrigger)
        
        // Configurar GSAP para mejor rendimiento
        gsap.config({
          nullTargetWarn: false
        })
        
        setIsLoaded(true)

        // ESPERAR A QUE LAS TRADUCCIONES ESTÉN LISTAS
        if (subtitleRef.current && isReady) {
          const subtitleElement = subtitleRef.current
          const text = subtitleElement.textContent || ''
          
          if (text) {
            subtitleElement.textContent = ''
            subtitleElement.style.opacity = '1'
            
            gsap.to({}, {
              duration: 2.5,
              ease: "none",
              onUpdate: function() {
                const progress = this.progress()
                const currentLength = Math.floor(progress * text.length)
                subtitleElement.textContent = text.slice(0, currentLength)
              }
            })
          }
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
        setIsLoaded(true)
      }
    }

    loadGSAP()
  }, [isReady]) // Agregar isReady como dependencia

  return (
    <div className="pt-0">
      {/* Hero */}
      <SectionReveal>
        <section className="relative h-[80vh] min-h-[600px] max-h-[800px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image 
              src="/images/mar-olena-grey.png" 
              alt="Mar y ola – JA Padel Academy" 
              fill 
              className="object-cover object-top md:object-top academy-hero-image" 
              priority 
              sizes="100vw" 
              quality={90}
            />
            {/* Overlays como Home */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-clash font-black text-brand-white mb-6 tracking-tight">
              {isReady ? t("academyPage.hero.title") : "JA Padel Academy"}
            </h1>
            <p 
              ref={subtitleRef}
              className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
              style={{ opacity: isLoaded ? 1 : 0.8 }}
            >
              {isReady ? t("academyPage.hero.description") : "Donde se forja el juego: historia, metodología y el equipo que te acompaña."}
            </p>
          </div>
        </section>
      </SectionReveal>


      {/* Fundador */}
      <FounderReveal
        name={founder.name}
        role={founder.role}
        photo={founder.photo}
        bio={founder.bio}
        highlights={founder.highlights}
        quote={founder.quote}
      />

      {/* Equipo de Entrenadores */}
      <SectionReveal>
        <section className="py-16 bg-gradient-to-br from-brand-gold/5 via-brand-white to-brand-gold/5">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-clash font-black text-brand-black text-center mb-10 tracking-tight">
              {isReady ? t("academyPage.team.title") : "Equipo de entrenadores"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {coaches.map((c, i) => (
                <div key={i} className="bg-white transition-all p-6 group hover:translate-y-1">
                  <div className="relative h-64 overflow-hidden mb-4">
                    <Image src={c.photo} alt={c.name} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 33vw" loading="lazy" />
                  </div>
                  <div className="h-px bg-cement-200 group-hover:bg-brand-gold transition-colors mb-4" />
                  <h3 className="text-xl font-clash font-black text-brand-black tracking-tight">{c.name}</h3>
                  <div className="text-sm text-cement-600 mb-2 leading-relaxed">{c.role}</div>
                  <p className="text-cement-700 line-clamp-3 leading-relaxed">{c.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Metodología */}
      <SectionReveal>
        <section className="py-16 bg-brand-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-clash font-black text-brand-black text-center mb-10 tracking-tight">
              {isReady ? t("academyPage.methodology.title") : "Metodología JA"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 max-w-7xl mx-auto">
              {pillars.map((p, i) => {
                const IconComponent = p.icon
                return (
                  <div key={i} className="bg-white transition-all p-6 text-center group hover:translate-y-1">
                    <div className="flex justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h3 className="text-xl font-clash font-black text-brand-black">{p.title}</h3>
                    <p className="text-cement-700 text-sm mt-1">{p.desc}</p>
                  </div>
                )
              })}
            </div>
            <div className="p-6 text-center">
              <div className="h-px bg-cement-200 mb-6" />
              <p className="text-brand-black leading-relaxed">
                {isReady ? t("academyPage.methodology.session") : "Sesión tipo: calentamiento específico → técnica aplicada → situaciones tácticas → matchplay dirigido → feedback + plan de tareas."}
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ + CTA */}
      <SectionReveal>
        <section className="py-16 bg-gradient-to-b from-white to-cement-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-clash font-black text-brand-black text-center mb-10">
              {isReady ? t("academyPage.faq.title") : "Preguntas frecuentes"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white p-6 group min-h-40 flex flex-col justify-between">
                  <div>
                    <div className="font-clash font-black text-brand-black text-lg md:text-xl mb-3 tracking-tight">{f.q}</div>
                    <div className="text-cement-700 leading-relaxed text-base md:text-lg">{f.a}</div>
                  </div>
                  <div className="h-px bg-cement-200 mt-6 group-hover:bg-brand-gold transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-20 bg-gradient-to-br from-green-50 via-green-100 to-green-50 relative overflow-hidden">
          {/* Elementos decorativos eliminados para evitar scroll horizontal */}
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <WhatsAppCTA
                variant="premium"
                title={isReady ? t("academyPage.cta.title") : "¿Quieres conocer más sobre nuestra academia?"}
                description={isReady ? t("academyPage.cta.description") : "Descubre nuestra metodología y al equipo que te llevará al siguiente nivel"}
                pageContext="academia"
                className="mb-8"
              />
            </div>
          </div>
        </section>
      </SectionReveal>
    </div>
  )
}
