"use client"

import { useEffect, useRef, useState } from "react"
import { Users, Trophy, Star, Calendar, Award, Target, ChevronLeft, ChevronRight } from "lucide-react"

const stats = [
  {
    icon: <Users className="w-10 h-10" />,
    value: 500,
    label: "Alumnos Activos",
    suffix: "+",
    color: "from-primary-600 to-primary-800",
    delay: 0,
    description: "Jugadores de todos los niveles confían en nosotros",
  },
  {
    icon: <Trophy className="w-10 h-10" />,
    value: 120,
    label: "Torneos Ganados",
    suffix: "+",
    color: "from-gold-500 to-gold-600",
    delay: 0.2,
    description: "Victorias conseguidas por nuestros alumnos",
  },
  {
    icon: <Star className="w-10 h-10" />,
    value: 95,
    label: "Objetivos Alcanzados",
    suffix: "%",
    color: "from-primary-700 to-primary-900",
    delay: 0.4,
    description: "De nuestros alumnos logran sus metas",
  },
  {
    icon: <Calendar className="w-10 h-10" />,
    value: 8,
    label: "Años de Experiencia",
    suffix: "",
    color: "from-gold-600 to-gold-700",
    delay: 0.6,
    description: "Formando campeones desde 2012",
  },
  {
    icon: <Award className="w-10 h-10" />,
    value: 15,
    label: "Entrenadores Pro",
    suffix: "+",
    color: "from-primary-800 to-slate-800",
    delay: 0.8,
    description: "Profesionales certificados a tu disposición",
  },
  {
    icon: <Target className="w-10 h-10" />,
    value: 98,
    label: "Satisfacción",
    suffix: "%",
    color: "from-gold-500 to-gold-700",
    delay: 1,
    description: "De nuestros alumnos nos recomiendan",
  },
]

export default function FloatingStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(stats.length / 3))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (sectionRef.current && !hasAnimated) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            onEnter: () => {
              setHasAnimated(true)
              animateStats()
            },
          })
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
        // Fallback: ensure content is visible if GSAP fails
        setHasAnimated(true)
        if (sectionRef.current) {
          sectionRef.current.style.opacity = '1'
        }
      }
    }

    loadGSAP()

    // Fallback timeout to ensure content is visible
    const fallbackTimeout = setTimeout(() => {
      if (!hasAnimated && sectionRef.current) {
        setHasAnimated(true)
        sectionRef.current.style.opacity = '1'
      }
    }, 3000)

    return () => clearTimeout(fallbackTimeout)
  }, [hasAnimated])

  const animateStats = async () => {
    const { gsap } = await import("gsap")

    // Instead of animating the whole section, animate the content container
    const contentContainer = sectionRef.current?.querySelector('.container')
    if (contentContainer) {
      gsap.fromTo(
        contentContainer,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      )
    }

    stats.forEach((stat, index) => {
      const element = document.getElementById(`floating-counter-${index}`)
      const card = document.getElementById(`floating-card-${index}`)

      if (element && card) {
        // Establecer el valor final directamente como fallback
        element.textContent = stat.value.toLocaleString() + (stat.suffix || "")

        // Animate card entrance with stagger - using transform only
        gsap.fromTo(
          card,
          {
            y: 80,
            scale: 0.8,
            rotation: -5,
          },
          {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: stat.delay,
            ease: "back.out(1.7)",
          },
        )

        // Simple counter animation that works reliably
        let currentValue = 0
        const targetValue = stat.value
        const increment = targetValue / 50 // Divide animation into 50 steps
        
        const animateCounter = () => {
          if (currentValue < targetValue) {
            currentValue += increment
            if (currentValue > targetValue) currentValue = targetValue
            element.textContent = Math.ceil(currentValue).toLocaleString() + (stat.suffix || "")
            requestAnimationFrame(animateCounter)
          }
        }
        
        // Start animation after delay
        setTimeout(() => {
          element.textContent = "0" // Reset to 0 for animation
          animateCounter()
        }, (stat.delay + 0.5) * 1000)
        
        // Fallback: ensure number is visible after 5 seconds
        setTimeout(() => {
          if (element.textContent === "0" || element.textContent === "") {
            element.textContent = stat.value.toLocaleString() + (stat.suffix || "")
          }
        }, 5000)

        // Add continuous floating animation
        gsap.to(card, {
          y: -8,
          duration: 3,
          delay: stat.delay + 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        })
      }
    })
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(stats.length / 3))
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(stats.length / 3)) % Math.ceil(stats.length / 3))
    setIsAutoPlaying(false)
  }

  const visibleStats = stats.slice(currentSlide * 3, currentSlide * 3 + 3)

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden opacity-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-800 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 opacity-100">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-700 font-semibold mb-6">
            <Award className="w-5 h-5 mr-2" />
            Números
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair font-bold text-brand-black mb-6">
            Resultados que <span className="gold-text-gradient">Hablan</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Más de una década transformando jugadores y creando campeones en Valencia
          </p>
        </div>

        {/* Stats Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 min-h-[300px]">
            {visibleStats.map((stat, index) => (
              <div
                key={`${currentSlide}-${index}`}
                id={`floating-card-${stats.indexOf(stat)}`}
                className="group cursor-pointer opacity-100"
              >
                <div
                  className={`relative bg-gradient-to-br ${stat.color} p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 h-full`}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl overflow-hidden" />

                  <div className="relative z-10 text-center text-white h-full flex flex-col justify-between">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      {stat.icon}
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-5xl md:text-6xl font-black mb-3">
                        <span id={`floating-counter-${stats.indexOf(stat)}`}>0</span>
                        {stat.suffix && <span className="text-white/80">{stat.suffix}</span>}
                      </div>

                      <p className="text-white/90 font-bold text-xl leading-tight mb-3">{stat.label}</p>
                      <p className="text-white/70 text-sm leading-relaxed">{stat.description}</p>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:text-primary-800 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-slate-200"
              aria-label="Estadísticas anteriores"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(stats.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-primary-800 w-8" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Ir a grupo de estadísticas ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:text-primary-800 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-slate-200"
              aria-label="Siguientes estadísticas"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`text-sm flex items-center gap-2 mx-auto px-4 py-2 rounded-full ${
                isAutoPlaying ? "bg-slate-100 text-slate-700" : "bg-primary-50 text-primary-700"
              } transition-colors`}
            >
              {isAutoPlaying ? (
                <>
                  <span className="w-3 h-3 bg-slate-400 rounded-full"></span>
                  Pausar rotación automática
                </>
              ) : (
                <>
                  <span className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-l-primary-700 border-t-transparent border-b-transparent"></span>
                  Reproducir rotación automática
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
