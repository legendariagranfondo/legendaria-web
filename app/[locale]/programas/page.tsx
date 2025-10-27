"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { ArrowRight, Clock, Users, Target, Trophy, Star, CheckCircle, Phone, MessageCircle, Sparkles, Award, TrendingUp, Shield, Zap } from "lucide-react"
import SectionReveal from "@/components/animations/SectionReveal"
import WhatsAppCTA from "@/components/ui/WhatsAppCTA"
import { Button } from "@/components/ui/button"
import { WHATSAPP_CONFIG, generateWhatsAppUrl, handleProgramWhatsAppClick } from "@/lib/whatsapp-config"
import { useTranslations } from "@/hooks/use-translations"

// Datos de programas optimizados para SEO

// Beneficios premium para SEO

// Estadísticas de confianza
const estadisticas = [
  { numero: "500+", label: "Alumnos Satisfechos", icon: <Users className="w-6 h-6" /> },
  { numero: "40+", label: "Años de Experiencia", icon: <Award className="w-6 h-6" /> },
  { numero: "98%", label: "Tasa de Satisfacción", icon: <Star className="w-6 h-6" /> },
  { numero: "24/7", label: "Soporte Premium", icon: <Shield className="w-6 h-6" /> }
]

export default function ProgramasPage() {
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { t, isReady } = useTranslations()

  // Generar beneficios dinámicamente basados en traducciones
  const getBeneficios = () => [
    {
      icon: <Users className="w-8 h-8" />,
      title: isReady ? t("programsPage.benefits.0.title") : "Grupos Reducidos",
      description: isReady ? t("programsPage.benefits.0.description") : "Máximo 4 personas por grupo para atención personalizada y progreso acelerado",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: isReady ? t("programsPage.benefits.1.title") : "Metodología Exclusiva",
      description: isReady ? t("programsPage.benefits.1.description") : "Sistema de enseñanza desarrollado por profesionales con más de 40 años de experiencia",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: isReady ? t("programsPage.benefits.2.title") : "Objetivos Claros",
      description: isReady ? t("programsPage.benefits.2.description") : "Cada programa tiene metas específicas y medibles para tu progreso",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: isReady ? t("programsPage.benefits.3.title") : "Entrenadores Certificados",
      description: isReady ? t("programsPage.benefits.3.description") : "Profesionales certificados con experiencia en competición y enseñanza",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const beneficios = getBeneficios()

  // Generar programas dinámicamente basados en traducciones
  const getProgramas = () => [
    {
      id: "clases-particulares-valencia",
      title: isReady ? t("programsPage.programs.0.title") : "Clases Particulares",
      subtitle: isReady ? t("programsPage.programs.0.subtitle") : "Transformación individual",
      description: isReady ? t("programsPage.programs.0.description") : "Acelera tu evolución con entrenamiento 1:1. Corrección técnica instantánea y plan de mejora personalizado para cada golpe.",
      level: isReady ? t("programsPage.programs.0.level") : "Todos los niveles",
      duration: "1h",
      groupSize: isReady ? t("programsPage.programs.0.groupSize") : "1-2 personas",
      price: 89,
      image: "/images/manu-gato.trophy-grey.png",
      features: isReady ? [
        t("programsPage.programs.0.features.0"),
        t("programsPage.programs.0.features.1"),
        t("programsPage.programs.0.features.2")
      ] : ["Corrección técnica instantánea", "Horarios flexibles", "Progreso acelerado"],
      schedule: [],
      intensity: "Media",
      focus: "Mejora individual",
      seoKeywords: ["clases particulares pádel Valencia", "clase privada pádel"],
      color: "",
      icon: <Target className="w-6 h-6" />,
    },
    {
      id: "clases-grupo-valencia",
      title: isReady ? t("programsPage.programs.1.title") : "Clases en Grupo",
      subtitle: isReady ? t("programsPage.programs.1.subtitle") : "Evolución colectiva",
      description: isReady ? t("programsPage.programs.1.description") : "Domina la táctica de pareja en grupos reducidos. Aprende a leer el juego y desarrollar estrategias ganadoras.",
      level: isReady ? t("programsPage.programs.1.level") : "Todos los niveles",
      duration: "1h",
      groupSize: isReady ? t("programsPage.programs.1.groupSize") : "3-4 personas",
      price: 129,
      image: "/images/carlos-lucia-grey.png",
      features: isReady ? [
        t("programsPage.programs.1.features.0"),
        t("programsPage.programs.1.features.1"),
        t("programsPage.programs.1.features.2")
      ] : ["Técnica y táctica", "Juego en grupo", "Ambiente social"],
      schedule: [],
      intensity: "Media",
      focus: "Técnica y táctica",
      seoKeywords: ["clases en grupo pádel Valencia", "grupos reducidos pádel"],
      color: "",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      id: "packs-personalizados-valencia",
      title: isReady ? t("programsPage.programs.2.title") : "Packs Personalizados",
      subtitle: isReady ? t("programsPage.programs.2.subtitle") : "Experiencias memorables",
      description: isReady ? t("programsPage.programs.2.description") : "Crea momentos únicos: regalos especiales, visitas a Valencia o experiencias premium. Diseñamos tu experiencia ideal.",
      level: isReady ? t("programsPage.programs.2.level") : "Personalizado",
      duration: "Variable",
      groupSize: "Variable",
      price: 249,
      image: "/images/raquel-ana-grey.png",
      features: isReady ? [
        t("programsPage.programs.2.features.0"),
        t("programsPage.programs.2.features.1"),
        t("programsPage.programs.2.features.2")
      ] : ["Diseño de experiencia a medida", "Regalos especiales", "Visitas a Valencia"],
      schedule: [],
      intensity: "Variable",
      focus: "Experiencias premium",
      seoKeywords: ["packs personalizados pádel Valencia", "experiencias pádel Valencia"],
      color: "",
      icon: <Trophy className="w-6 h-6" />,
    },
    {
      id: "experiencias-semanales-valencia",
      title: isReady ? t("programsPage.programs.3.title") : "Experiencias Semanales",
      subtitle: isReady ? t("programsPage.programs.3.subtitle") : "Intensivo élite + turismo local",
      description: isReady ? t("programsPage.programs.3.description") : "Vive una semana de pádel premium en Valencia: entrenamientos, torneo local y plan cultural-gastronómico.",
      level: isReady ? t("programsPage.programs.3.level") : "Todos los niveles",
      duration: "4 días (Mi–Sa)",
      groupSize: isReady ? t("programsPage.programs.3.groupSize") : "3-6 personas",
      price: 349,
      image: "/images/Valencia_CAC.jpg",
      features: isReady ? [
        t("programsPage.programs.3.features.0"),
        t("programsPage.programs.3.features.1"),
        t("programsPage.programs.3.features.2")
      ] : ["Entrenos diarios", "Torneo local", "Paella + turismo"],
      schedule: [],
      intensity: "Media-Alta",
      focus: "Mejora y experiencia",
      seoKeywords: ["experiencia pádel Valencia", "camp pádel Valencia"],
      color: "",
      icon: <Award className="w-6 h-6" />,
    },
  ]

  const programas = getProgramas()

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
    <>
      <Head>
        <title>Programas de Pádel Valencia | Clases y Entrenamientos Profesionales | JA Padel Academy</title>
        <meta name="description" content="Descubre nuestros programas de pádel en Valencia: iniciación, perfeccionamiento, competición y personalizados. Entrenadores certificados, metodología exclusiva y grupos reducidos. ¡Reserva tu clase!" />
        <meta name="keywords" content="programas pádel Valencia, clases pádel Valencia, entrenamiento pádel Valencia, academia pádel Valencia, pádel iniciación Valencia, pádel competición Valencia, entrenadores pádel Valencia, metodología pádel Valencia, grupos reducidos pádel, pádel personalizado Valencia, pádel kids Valencia, pádel senior Valencia, Origen Padel Valencia, JA Padel Academy" />
        <meta name="author" content="JA Padel Academy Valencia" />
        <link rel="canonical" href="https://japadel.com/programas" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content="https://japadel.com/programas" />
        <meta property="og:site_name" content="JA Padel Academy" />
        <meta property="og:title" content="Programas de Pádel Valencia | Clases Profesionales | JA Padel Academy" />
        <meta property="og:description" content="Programas de pádel en Valencia: iniciación, perfeccionamiento, competición. Entrenadores certificados, metodología exclusiva. ¡Reserva tu clase!" />
        <meta property="og:image" content="/images/og-valencia.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Programas de Pádel Valencia - JA Padel Academy" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programas de Pádel Valencia | JA Padel Academy" />
        <meta name="twitter:description" content="🏆 Programas de pádel en Valencia: iniciación, perfeccionamiento, competición. Entrenadores certificados y metodología exclusiva." />
        <meta name="twitter:image" content="/images/twitter-valencia.jpg" />
        <meta name="twitter:creator" content="@japadel_valencia" />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      </Head>
    <div className="pt-0">
      {/* Hero Section Premium - TOP 2025 */}
      <SectionReveal>
        <section className="relative h-[80vh] min-h-[600px] max-h-[800px] flex items-center justify-center">
          {/* Imagen de fondo espectacular */}
          <div className="absolute inset-0">
            <Image
              src="/images/joan-padelrace.jpg"
              alt="JA Padel Academy - Entrenamiento de pádel profesional en Valencia"
              fill
              className="object-cover object-center"
              priority
              quality={95}
              sizes="100vw"
            />
            {/* Overlay con gradiente dinámico */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-black/80 via-brand-black/60 to-brand-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-brand-black/50" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clash font-black mb-6 lg:mb-8 leading-none tracking-tight">
                <span className="bg-gradient-to-r from-brand-white via-brand-white to-brand-gold bg-clip-text text-transparent drop-shadow-2xl">
                  {isReady ? t("programsPage.title1") : "PROGRAMAS"}
                </span>
                <br />
                <span className="bg-gradient-to-r from-brand-gold to-brand-gold/90 bg-clip-text text-transparent drop-shadow-2xl">
                  {isReady ? t("programsPage.title2") : "DE PÁDEL"}
                </span>
              </h1>
              
              <p 
                ref={subtitleRef}
                className="programs-hero-subtitle text-lg sm:text-xl text-brand-white/90 mb-8 lg:mb-12 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-lg"
                style={{ opacity: isLoaded ? 1 : 0.8 }}
              >
{isReady ? t("programsPage.hero.subtitle") : "Desde tu primer golpe hasta la competición profesional. Encuentra el programa perfecto para tu nivel y objetivos en Valencia."}
              </p>

              {/* CTA Compacto */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => handleProgramWhatsAppClick('clases_particulares')}
                  className="bg-gradient-to-r from-brand-gold to-brand-gold/90 hover:from-brand-gold/90 hover:to-brand-gold text-brand-black px-8 py-4 font-black text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-3 group transform -skew-x-3 hover:skew-x-0 hover:scale-105 backdrop-blur-sm rounded-none"
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
{isReady ? t("programsPage.hero.cta1") : "RESERVAR CLASE"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  onClick={() => {
                    const message = "¡Hola! Me interesa conocer más sobre los programas de JA Padel Academy. ¿Podrías ayudarme a elegir el más adecuado?"
                    const url = generateWhatsAppUrl(WHATSAPP_CONFIG.phoneNumber, message)
                    window.open(url, '_blank', 'noopener,noreferrer')
                  }}
                  variant="outline"
                  className="border-2 border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black px-8 py-4 font-black text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 group transform -skew-x-3 hover:skew-x-0 hover:scale-105 backdrop-blur-sm bg-brand-white/10 rounded-none"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
{isReady ? t("programsPage.hero.cta2") : "CHATEAR POR WHATSAPP"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Showcase de Programas Premium */}
      <SectionReveal>
        <section className="py-20 lg:py-32 bg-brand-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-clash font-black mb-8 tracking-tight">
                <span className="text-brand-black">{isReady ? t("sections.programs.title").split(' ')[0] : "NUESTROS"}</span>
                <br />
                <span className="gold-text-gradient">
                  {isReady ? t("sections.programs.title").split(' ').slice(1).join(' ') : "PROGRAMAS"}
                </span>
              </h2>
              
              <p className="text-xl text-cement-700 max-w-4xl mx-auto leading-relaxed">
                {isReady ? t("sections.programs.description") : "Cada programa está diseñado con una metodología específica para maximizar tu progreso y adaptarse a tu nivel de juego."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
              {programas.map((programa, index) => (
                <div key={programa.id} className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-102 h-full">
                  <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-102 border-l-4 border-brand-gold h-full flex flex-col">
                    {/* Background image */}
                    <div 
                      className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${programa.image})`
                      }}
                    />

                    {/* Angular shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    {/* Angular cut corners */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-white/20" />
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[30px] border-r-transparent border-t-[30px] border-t-white/20" />

                    <div className="relative z-10 p-6 text-white flex flex-col h-full">
                      {/* Header */}
                      <div className="mb-4 pt-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold transform -skew-x-6">
                            {programa.level}
                          </span>
                        </div>

                        <h3 className="text-2xl font-clash font-black mb-2">{programa.title}</h3>
                        <p className="text-white/80 font-bold mb-3 text-sm">{programa.subtitle}</p>
                        <p className="text-white/90 leading-relaxed text-sm">{programa.description}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{programa.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{programa.groupSize}</span>
                        </div>
                      </div>

                      {/* Features - Angular bullets */}
                      <ul className="mb-1 flex-grow">
                        {programa.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-white/90 font-medium text-sm mb-2">
                            <div className="w-2 h-2 bg-white transform rotate-45 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>


                      {/* CTA - Angular button */}
                      <button 
                        className="w-full py-3 font-black text-sm transform -skew-x-3 hover:skew-x-0 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mt-auto focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                        aria-label={isReady ? `${t("programsPage.cta")} - ${programa.title}` : `Pedir más información - ${programa.title}`}
                        type="button"
                        onClick={() => handleProgramWhatsAppClick(programa.id === "clases-particulares-valencia" ? "clases_particulares" : programa.id === "clases-grupo-valencia" ? "clases_grupo" : "packs_personalizados")}
                      >
{isReady ? t("programsPage.cta") : "Pedir más información"}
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
      </SectionReveal>

      {/* Beneficios Premium */}
      <SectionReveal>
        <section className="py-20 lg:py-32 bg-brand-white relative border-t border-cement-200">
          {/* Elemento decorativo sutil */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-clash font-black mb-8">
                <span className="text-brand-black">{isReady ? t("programsPage.whyChoose.title1") : "¿POR QUÉ ELEGIR"}</span>
                <br />
                <span className="gold-text-gradient">
                  {isReady ? t("programsPage.whyChoose.title2") : "JA PADEL ACADEMY?"}
                </span>
              </h2>
              
              <p className="text-xl text-cement-700 max-w-4xl mx-auto leading-relaxed">
                {isReady ? t("programsPage.whyChoose.description") : "Nuestra metodología exclusiva y experiencia nos convierten en la academia de pádel de referencia en Valencia."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch max-w-7xl mx-auto">
              {beneficios.map((beneficio, index) => (
                <div key={index} className="group flex flex-col items-center text-center h-full">
                  <div className="inline-flex items-center justify-center w-24 h-24 border border-brand-gold/40 text-brand-gold mb-6 group-hover:scale-105 transition-transform duration-300">
                    {beneficio.icon}
                  </div>
                  <h3 className="text-2xl font-clash font-bold text-brand-black mb-4 min-h-[56px] flex items-end justify-center">
                    {beneficio.title}
                  </h3>
                  <p className="text-cement-700 leading-relaxed text-lg min-h-[96px] flex items-start justify-center">
                    {beneficio.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* WhatsApp CTA Premium */}
      <SectionReveal>
        <section className="py-20 bg-gradient-to-br from-green-50 via-green-100 to-green-50 relative overflow-hidden">
          {/* Elementos decorativos eliminados para evitar scroll horizontal */}
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <WhatsAppCTA
                variant="premium"
                title={isReady ? t("programsPage.help.title") : "¿Necesitas ayuda para elegir tu programa?"}
                description={isReady ? t("programsPage.help.description") : "Nuestros expertos te ayudarán a encontrar el programa perfecto para tu nivel y objetivos"}
                pageContext="programas"
                className="mb-8"
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      
    </div>
    </>
  )
}