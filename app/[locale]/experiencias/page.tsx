"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, MessageCircle, Brain, Trophy, MapPin, Hotel, CheckCircle, Star, Users, Camera, Waves, Utensils, Heart } from "lucide-react"
import SectionReveal from "@/components/animations/SectionReveal"
import WhatsAppCTA from "@/components/ui/WhatsAppCTA"
import { Button } from "@/components/ui/button"
import { generateWhatsAppUrl, getContextualMessage, trackWhatsAppEvent } from "@/lib/whatsapp-config"
import { useTranslations } from "@/hooks/use-translations"

// Los servicios se generarán dinámicamente en el componente

// Las experiencias incluidas se generarán dinámicamente en el componente

// Los testimonios se generarán dinámicamente en el componente

export default function ExperienciasPage() {
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { t, isReady } = useTranslations()

  // Generar servicios dinámicamente
  const getServicios = () => [
    {
      icon: <Brain className="w-8 h-8" />,
      title: isReady ? t("experiencesPage.services.training.title") : "Entrenamiento",
      description: isReady ? t("experiencesPage.services.training.description") : "Sesiones técnicas, tácticas y físicas adaptadas a tu nivel.",
      features: isReady ? [
        t("experiencesPage.services.training.features.0"),
        t("experiencesPage.services.training.features.1"),
        t("experiencesPage.services.training.features.2")
      ] : ["Clases individuales o grupales", "Entrenamientos físicos y tácticos", "Análisis de video personalizado"]
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: isReady ? t("experiencesPage.services.competition.title") : "Competición",
      description: isReady ? t("experiencesPage.services.competition.description") : "Torneos locales, partidos amistosos o entrenamientos con jugadores valencianos.",
      features: isReady ? [
        t("experiencesPage.services.competition.features.0"),
        t("experiencesPage.services.competition.features.1"),
        t("experiencesPage.services.competition.features.2")
      ] : ["Torneos con jugadores locales", "Partidos amistosos", "Entrenamientos con profesionales"]
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: isReady ? t("experiencesPage.services.experience.title") : "Experiencia local",
      description: isReady ? t("experiencesPage.services.experience.description") : "Gastronomía, playa, cultura y eventos sociales.",
      features: isReady ? [
        t("experiencesPage.services.experience.features.0"),
        t("experiencesPage.services.experience.features.1"),
        t("experiencesPage.services.experience.features.2")
      ] : ["Paella valenciana", "Visita a la Albufera", "Puestas de sol en la playa"]
    },
    {
      icon: <Hotel className="w-8 h-8" />,
      title: isReady ? t("experiencesPage.services.accommodation.title") : "Alojamiento y logística",
      description: isReady ? t("experiencesPage.services.accommodation.description") : "Te ayudamos con hoteles, traslados y reservas.",
      features: isReady ? [
        t("experiencesPage.services.accommodation.features.0"),
        t("experiencesPage.services.accommodation.features.1"),
        t("experiencesPage.services.accommodation.features.2")
      ] : ["Hoteles premium", "Traslados aeropuerto", "Reservas gastronómicas"]
    }
  ]

  const servicios = getServicios()

  // Generar experiencias incluidas dinámicamente
  const getExperienciasIncluidas = () => [
    {
      category: isReady ? t("experiencesPage.included.training.title") : "Entrenamiento y competición",
      items: isReady ? [
        t("experiencesPage.included.training.items.0"),
        t("experiencesPage.included.training.items.1"),
        t("experiencesPage.included.training.items.2"),
        t("experiencesPage.included.training.items.3")
      ] : [
        "Clases individuales o grupales",
        "Entrenamientos físicos y tácticos",
        "Torneos o partidos con jugadores locales",
        "Análisis de video profesional"
      ]
    },
    {
      category: isReady ? t("experiencesPage.included.experiences.title") : "Experiencias y ocio",
      items: isReady ? [
        t("experiencesPage.included.experiences.items.0"),
        t("experiencesPage.included.experiences.items.1"),
        t("experiencesPage.included.experiences.items.2"),
        t("experiencesPage.included.experiences.items.3")
      ] : [
        "Paella valenciana auténtica",
        "Visita a la Albufera en barca",
        "Puestas de sol en la playa",
        "Fotos y vídeos profesionales"
      ]
    },
    {
      category: isReady ? t("experiencesPage.included.services.title") : "Servicios opcionales",
      items: isReady ? [
        t("experiencesPage.included.services.items.0"),
        t("experiencesPage.included.services.items.1"),
        t("experiencesPage.included.services.items.2"),
        t("experiencesPage.included.services.items.3")
      ] : [
        "Fisioterapia y recuperación",
        "Alojamiento premium",
        "Traslados aeropuerto ↔ club",
        "Packs corporativos o grupos de empresa"
      ]
    }
  ]

  const experienciasIncluidas = getExperienciasIncluidas()

  // Generar testimonios dinámicamente
  const getTestimonios = () => [
    {
      nombre: isReady ? t("experiencesPage.testimonials.list.0.name") : "Domen Kavzar",
      pais: isReady ? t("experiencesPage.testimonials.list.0.country") : "Eslovenia",
      texto: isReady ? t("experiencesPage.testimonials.list.0.text") : "Fue uno de los momentos más destacados de mi viaje. La comunicación fue rápida y fluida, y la clase fue increíble, bien estructurada y muy divertida. Los entrenadores fueron fantásticos: profesionales, amigables y con consejos muy útiles que mejoraron mi juego.",
      rating: 5
    },
    {
      nombre: isReady ? t("experiencesPage.testimonials.list.1.name") : "Mark Heimgartner",
      pais: isReady ? t("experiencesPage.testimonials.list.1.country") : "Países Bajos",
      texto: isReady ? t("experiencesPage.testimonials.list.1.text") : "Como jugador intermedio tuve una clase privada en la academia. ¡Fue una clase de primer nivel! Una de las mejores que he tenido. Los entrenadores tenían muy buenos consejos y una visión clara de en qué debía trabajar.",
      rating: 5
    },
    {
      nombre: isReady ? t("experiencesPage.testimonials.list.2.name") : "An",
      pais: isReady ? t("experiencesPage.testimonials.list.2.country") : "Países Bajos",
      texto: isReady ? t("experiencesPage.testimonials.list.2.text") : "¡Fueron clases increíbles! Los entrenadores son expertos en indicar las bolas correctas. Leen tu nivel de pádel muy rápido y adaptan sus ejercicios. Las explicaciones fueron claras y ejecutamos a alto ritmo. El equipo es muy simpático con mucho humor.",
      rating: 5
    }
  ]

  const testimonios = getTestimonios()

  // Función para manejar click de WhatsApp
  const handleWhatsAppClick = () => {
    const message = getContextualMessage('experiencias')
    const url = generateWhatsAppUrl("+34644465873", message)
    
    // Track del evento
    trackWhatsAppEvent('whatsapp_experiencias_click', 'experiencias', 'reservar_experiencia')
    
    // Abrir WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer')
  }

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
      {/* 1. Hero / Cabecera */}
      <SectionReveal>
        <section className="relative h-[80vh] min-h-[600px] max-h-[800px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/Valencia_CAC.jpg"
              alt="Experiencia de pádel única en Valencia - Entrenamiento profesional y turismo"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-clash font-black text-brand-white mb-6 tracking-tight">
              {isReady ? t("experiencesPage.hero.title") : "Vive una experiencia de pádel única en Valencia"}
            </h1>
            <p 
              ref={subtitleRef}
              className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-10 font-light leading-relaxed"
              style={{ opacity: isLoaded ? 1 : 0.8 }}
            >
{isReady ? t("experiencesPage.hero.description") : "Combina entrenamiento de alto nivel, competición local y turismo mediterráneo. Una semana completa sin preocupaciones."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-brand-gold text-brand-black font-black px-8 py-4 shadow-lg hover:bg-brand-gold/90 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform -skew-x-3 hover:skew-x-0 rounded-none"
                aria-label="Organizar mi experiencia de pádel en Valencia"
              >
{isReady ? t("experiencesPage.hero.cta1") : "Organizar mi experiencia"} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={handleWhatsAppClick}
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-brand-black hover:border-white px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform -skew-x-3 hover:skew-x-0 rounded-none"
                aria-label="Hablar por WhatsApp sobre experiencias de pádel"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> {isReady ? t("experiencesPage.hero.cta2") : "Hablar por WhatsApp"}
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 2. Sección "Qué te ofrecemos" */}
      <SectionReveal>
        <section className="py-20 bg-gradient-to-b from-brand-white to-cement-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-clash font-black text-brand-black mb-6 tracking-tight">
                {isReady ? t("experiencesPage.services.title") : "Diseñamos tu semana de pádel a medida"}
              </h2>
              <p className="text-xl text-cement-700 max-w-4xl mx-auto leading-relaxed">
{isReady ? t("experiencesPage.services.description") : "Programas únicos que adaptamos a tu nivel y objetivos. Desde entrenamientos técnicos hasta vivencias auténticas, todo pensado para que disfrutes al máximo."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {servicios.map((servicio, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-brand-gold mb-4">{servicio.icon}</div>
                  <h3 className="text-2xl font-clash font-black text-brand-black mb-4 tracking-tight">
                    {servicio.title}
                  </h3>
                  <p className="text-cement-700 mb-6 leading-relaxed">
                    {servicio.description}
                  </p>
                  <ul className="space-y-2">
                    {servicio.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-cement-600">
                        <CheckCircle className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-brand-gold text-brand-black font-black px-8 py-4 shadow-lg hover:bg-brand-gold/90 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform -skew-x-3 hover:skew-x-0 rounded-none"
                aria-label="Cuéntanos qué buscas para tu experiencia de pádel"
              >
{isReady ? t("experiencesPage.services.cta") : "Cuéntanos qué buscas"} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 3. Sección Metodología de Experiencias */}
      <SectionReveal>
        <section className="relative bg-gradient-to-br from-brand-gold/5 via-brand-white to-brand-gold/5">
          {/* Sticky Container */}
          <div className="sticky top-0 h-screen w-full">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5" aria-hidden="true">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-gold transform rotate-45 blur-3xl" />
              <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-primary-800 transform -rotate-12 blur-2xl" />
            </div>

            <div className="w-full h-full relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
                {/* Image Container - Estática */}
                <div className="relative w-full h-96 lg:h-full order-1 lg:order-1">
                  <Image
                    src="/images/gato-manu-padelrace.jpg"
                    alt="Experiencia de pádel en Valencia - Entrenamiento profesional y turismo"
                    fill
                    className="object-cover shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    quality={90}
                    style={{
                      objectPosition: '30% center'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                </div>

                {/* Content Container - Mitad pantalla para texto */}
                <div className="text-brand-black space-y-6 lg:space-y-8 order-2 lg:order-2 flex flex-col justify-center p-8 lg:p-12">

                  {/* Subtitle */}
                  <p className="text-brand-gold font-black text-sm lg:text-base tracking-wider uppercase">
                    {isReady ? t("experiencesPage.methodology.subtitle") : "VIVE. ENTRENA. COMPITE."}
                  </p>

                  {/* Title */}
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-clash font-black leading-none tracking-tight">
                    {isReady ? t("experiencesPage.methodology.title") : "EXPERIENCIA DE PÁDEL EN VALENCIA"}
                  </h2>

                  {/* Description */}
                  <p className="text-lg lg:text-xl text-cement-700 leading-relaxed font-light max-w-2xl">
{isReady ? t("experiencesPage.methodology.description") : "Diseñamos programas que combinan técnica avanzada, competición real y descubrimiento cultural. Transforma tu juego mientras exploras la ciudad del Turia en una semana inolvidable."}
                  </p>

                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 4. Sección "Cómo funciona" */}
      <SectionReveal>
        <section className="py-20 bg-brand-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-clash font-black text-brand-black mb-6 tracking-tight">
                {isReady ? t("experiencesPage.process.title") : "Así organizamos tu experiencia"}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-black text-brand-black">1</span>
                </div>
                <h3 className="text-2xl font-clash font-black text-brand-black mb-4 tracking-tight">
                  {isReady ? t("experiencesPage.process.step1.title") : "Nos cuentas tu nivel y fechas"}
                </h3>
                <p className="text-cement-700 leading-relaxed">
                  {isReady ? t("experiencesPage.process.step1.description") : "Formulario breve o mensaje directo para entender tus objetivos y disponibilidad."}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-black text-brand-black">2</span>
                </div>
                <h3 className="text-2xl font-clash font-black text-brand-black mb-4 tracking-tight">
                  {isReady ? t("experiencesPage.process.step2.title") : "Diseñamos tu plan personalizado"}
                </h3>
                <p className="text-cement-700 leading-relaxed">
                  {isReady ? t("experiencesPage.process.step2.description") : "Horarios, instalaciones, actividades. Un plan completo a tu medida."}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-black text-brand-black">3</span>
                </div>
                <h3 className="text-2xl font-clash font-black text-brand-black mb-4 tracking-tight">
                  {isReady ? t("experiencesPage.process.step3.title") : "Disfrutas una semana inolvidable"}
                </h3>
                <p className="text-cement-700 leading-relaxed">
                  {isReady ? t("experiencesPage.process.step3.description") : "Una semana perfecta. Nosotros gestionamos todos los detalles."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 6. Sección "Qué puede incluir tu experiencia" */}
      <SectionReveal>
        <section className="py-20 bg-gradient-to-br from-brand-gold/5 via-brand-white to-brand-gold/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-clash font-black text-brand-black mb-6 tracking-tight">
                {isReady ? t("experiencesPage.included.title") : "Qué puede incluir tu experiencia"}
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {experienciasIncluidas.map((categoria, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-clash font-black text-brand-black mb-6 tracking-tight">
                    {categoria.category}
                  </h3>
                  <ul className="space-y-4">
                    {categoria.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                        <span className="text-cement-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 7. Testimonios y credibilidad */}
      <SectionReveal>
        <section className="py-20 bg-brand-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-clash font-black text-brand-black mb-6 tracking-tight">
                {isReady ? t("experiencesPage.testimonials.title") : "Lo que dicen quienes ya han vivido la experiencia"}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonios.map((testimonio, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-lg border border-cement-200 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonio.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-cement-700 mb-6 leading-relaxed italic flex-1">
                      "{testimonio.texto}"
                    </p>
                    <div className="mt-auto">
                      <h4 className="font-bold text-brand-black text-lg">{testimonio.nombre}</h4>
                      <p className="text-cement-600 text-sm">{testimonio.pais}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 8. CTA final (con WhatsApp) */}
      <SectionReveal>
        <section className="py-20 bg-gradient-to-br from-brand-gold/10 via-brand-white to-brand-gold/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-clash font-black text-brand-black mb-6 tracking-tight">
                {isReady ? t("experiencesPage.cta.title") : "Diseña tu experiencia JA Padel"}
              </h2>
              <p className="text-xl text-cement-700 mb-10 leading-relaxed">
                {isReady ? t("experiencesPage.cta.description") : "Comparte tus objetivos y fechas. Creamos el plan perfecto para tu nivel y preferencias."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-brand-gold text-brand-black font-black px-8 py-4 shadow-lg hover:bg-brand-gold/90 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform -skew-x-3 hover:skew-x-0 rounded-none"
                aria-label="Contactar para diseñar mi experiencia de pádel"
              >
                  <MessageCircle className="w-5 h-5 mr-2" /> {isReady ? t("experiencesPage.cta.button1") : "Contactar ahora"}
                </Button>
                <Button 
                  onClick={handleWhatsAppClick}
                  variant="outline" 
                  className="bg-transparent border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform -skew-x-3 hover:skew-x-0 rounded-none"
                  aria-label="Hablar por WhatsApp sobre mi experiencia"
                >
                  <Heart className="w-5 h-5 mr-2" /> {isReady ? t("experiencesPage.cta.button2") : "Consultar por WhatsApp"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>
    </div>
  )
}
