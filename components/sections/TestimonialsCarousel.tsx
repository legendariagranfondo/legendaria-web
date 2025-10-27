"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Play, Pause } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"


export default function TestimonialsCarousel() {
  const { t, isReady } = useTranslations()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)

  // Generar testimonios dinámicamente basados en traducciones
  const getTestimonials = () => [
    {
      name: "Alejandro Moreno",
      text: isReady ? t("testimonials.list.0.text") : "Conocer a Joan ha sido absolutamente beneficioso tanto a nivel personal como profesional. Es metódico, paciente, comunicador y tiene la capacidad para sacar lo mejor de ti mismo, siempre con una sonrisa y aprendiendo del error. He tenido mucha suerte de cruzarme con un entrenador de su nivel."
    },
    {
      name: "María GM",
      text: isReady ? t("testimonials.list.1.text") : "Joan lleva siendo mi entrenador desde hace un par de años. Yo empecé desde 0 (no había cogido una pala en mi vida) y la verdad es que he aprendido y mejorado de forma exponencial. Las clases las hace super amenas con ejercicios diferentes. ¡Es el mejor!"
    },
    {
      name: "Víctor",
      text: isReady ? t("testimonials.list.2.text") : "Un profesor 10. Si te interesa aprender del mejor aquí lo tienes. Si te interesa pasártelo genial en las clases aquí lo tienes. Te va a corregir con una sonrisa de oreja a oreja, así que saldrás de clase pasándotelo bien y jugando mejor a pádel."
    },
    {
      name: "Mark Heimgartner",
      text: isReady ? t("testimonials.list.3.text") : "¡Una clase de primera clase! Una de las mejores que he tenido. Joan tuvo muy buenos consejos y una buena visión sobre en qué debería trabajar. Tradujo su visión inmediatamente a buenas prácticas. Lo recomendaría a todos."
    },
    {
      name: "Daniele",
      text: isReady ? t("testimonials.list.4.text") : "La mejor clase de pádel que encontré en Valencia. Estoy recontento con las 4 horas de clases hecha con Joan, un entrenador muy bueno para explicar y una persona muy amable."
    },
    {
      name: "Aaron Huguet",
      text: isReady ? t("testimonials.list.5.text") : "El trato personal con todos los componentes es espectacular. Profesionalmente posee una gran calidad y experiencia para mejorar la técnica en cada uno de nosotros. Hace diferentes dinámicas y nos exige lo mejor de cada uno."
    },
  ]

  const testimonials = getTestimonials()

  // Configuración para el swipe
  const minSwipeDistance = 50

  // GSAP initialization (solo una vez)
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (sectionRef.current) {
          // Animate section on scroll
          gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
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

  // Auto-play functionality separado
  useEffect(() => {
    if (isAutoPlaying && !isAnimating) {
      intervalRef.current = setInterval(() => {
        nextTestimonialWithAnimation()
      }, 8000) // 8 segundos - tiempo óptimo

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isAutoPlaying, isAnimating, currentIndex])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const nextTestimonialWithAnimation = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsAutoPlaying(false) // Pausa auto-play durante animación manual

    try {
      const { gsap } = await import("gsap")
      
      // 🚀 ANIMACIÓN AVANZADA - Estilo 2025
      const tl = gsap.timeline()
      
      // 1. Fade out con blur y scale
      tl.to([textRef.current, nameRef.current], {
        opacity: 0,
        y: -30,
        scale: 0.95,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power3.in",
      })

      // 2. Cambio de testimonial
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)

      // 3. Fade in con efecto premium
      tl.fromTo([textRef.current, nameRef.current], 
        { 
          opacity: 0, 
          y: 30, 
          scale: 1.05,
          filter: "blur(10px)",
          rotationX: 15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        }
      )

      // 4. Micro-bounce final para premium feel
      tl.to([textRef.current, nameRef.current], {
        scale: 1.02,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })

      // 5. Animar elementos de navegación
      if (dotsRef.current?.children) {
        tl.to(dotsRef.current.children, {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
          stagger: 0.05,
          yoyo: true,
          repeat: 1
        }, "-=0.3")
      }

    } catch (error) {
      console.error("Error with GSAP animation:", error)
      // Fallback sin animación
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    setIsAnimating(false)
    // Reactiva auto-play después de 2 segundos
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  const prevTestimonialWithAnimation = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsAutoPlaying(false) // Pausa auto-play durante animación manual

    try {
      const { gsap } = await import("gsap")
      
      // 🚀 ANIMACIÓN AVANZADA - Dirección inversa
      const tl = gsap.timeline()
      
      // 1. Fade out con blur y scale (dirección opuesta)
      tl.to([textRef.current, nameRef.current], {
        opacity: 0,
        y: 30,
        scale: 0.95,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power3.in",
      })

      // 2. Cambio de testimonial
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

      // 3. Fade in con efecto premium (dirección opuesta)
      tl.fromTo([textRef.current, nameRef.current], 
        { 
          opacity: 0, 
          y: -30, 
          scale: 1.05,
          filter: "blur(10px)",
          rotationX: -15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        }
      )

      // 4. Micro-bounce final para premium feel
      tl.to([textRef.current, nameRef.current], {
        scale: 1.02,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })

      // 5. Animar elementos de navegación
      if (dotsRef.current?.children) {
        tl.to(dotsRef.current.children, {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
          stagger: 0.05,
          yoyo: true,
          repeat: 1
        }, "-=0.3")
      }

    } catch (error) {
      console.error("Error with GSAP animation:", error)
      // Fallback sin animación
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    setIsAnimating(false)
    // Reactiva auto-play después de 2 segundos
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  const goToTestimonial = async (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setIsAutoPlaying(false) // Pausa auto-play durante interacción del usuario

    try {
      const { gsap } = await import("gsap")
      
      // 🚀 ANIMACIÓN DIRECTA - Estilo premium
      const tl = gsap.timeline()
      
      // 1. Fade out rápido
      tl.to([textRef.current, nameRef.current], {
        opacity: 0,
        y: -20,
        scale: 0.98,
        filter: "blur(5px)",
        duration: 0.3,
        ease: "power3.in",
      })

      setCurrentIndex(index)

      // 2. Fade in con efecto zoom
      tl.fromTo([textRef.current, nameRef.current], 
        { 
          opacity: 0, 
          y: 20, 
          scale: 1.02,
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
        }
      )

      // 3. Micro-bounce sutil
      tl.to([textRef.current, nameRef.current], {
        scale: 1.01,
        duration: 0.08,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })

      // 4. Animar elementos de navegación
      if (dotsRef.current?.children) {
        tl.to(dotsRef.current.children, {
          scale: 1.1,
          duration: 0.15,
          ease: "power2.out",
          stagger: 0.03,
          yoyo: true,
          repeat: 1
        }, "-=0.2")
      }

    } catch (error) {
      console.error("Error with GSAP animation:", error)
      // Fallback sin animación
      setCurrentIndex(index)
    }

    setIsAnimating(false)
    // Reactiva auto-play después de 2 segundos de inactividad
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  // Funciones para manejar touch/swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // Reset touch end
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && !isAnimating) {
      nextTestimonialWithAnimation()
    }
    if (isRightSwipe && !isAnimating) {
      prevTestimonialWithAnimation()
    }
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen max-h-screen flex items-center bg-gradient-to-b from-cement-50 to-white relative pt-16 lg:pt-24"
      aria-labelledby="testimonials-heading"
    >
      {/* Separator Element - Transición suave */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-cement-50/30" aria-hidden="true" />
      

      <div className="container mx-auto px-4 relative z-10 w-full h-full flex flex-col justify-center min-h-0 py-8">
        {/* Header Section - Estilo Mouratoglou */}
        <div className="text-center mb-6 lg:mb-8">
          {/* Decorative line separator */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-0.5 bg-brand-gold"></div>
            <div className="mx-4 w-2 h-2 bg-brand-gold transform rotate-45"></div>
            <div className="w-16 h-0.5 bg-brand-gold"></div>
          </div>
          
          <h2 id="testimonials-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clash font-black text-brand-black mb-4 lg:mb-6 leading-none tracking-tight">
            {isReady ? t("testimonials.title") : "TESTIMONIOS"}
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-cement-600 font-light leading-relaxed tracking-wide max-w-4xl mx-auto">
            {isReady ? t("testimonials.subtitle") : "Lo que dicen nuestros alumnos"}
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto flex-grow flex flex-col justify-center">
          <div className="relative">
            {/* Quote decoration - Ajustado para móvil */}
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 opacity-20 pointer-events-none">
              <Quote className="w-16 h-16 md:w-20 md:h-20 text-brand-gold" />
            </div>

                   {/* Testimonial Content - Estilo Mouratoglou con touch events */}
                   <div 
                     ref={testimonialRef}
                     className="relative bg-cement-50 backdrop-blur-sm border border-cement-200 p-4 md:p-8 lg:p-12 min-h-[300px] md:min-h-[400px] flex flex-col justify-center touch-pan-y select-none"
                     onTouchStart={onTouchStart}
                     onTouchMove={onTouchMove}
                     onTouchEnd={onTouchEnd}
                   >
                     {/* Testimonial Text */}
                     <div ref={textRef} className="mb-8">
                       <blockquote className="text-lg md:text-xl lg:text-2xl text-brand-black text-center leading-relaxed font-light">
                         "{currentTestimonial.text}"
                       </blockquote>
                     </div>

              {/* Author */}
              <div ref={nameRef} className="text-center">
                <div className="inline-flex items-center">
                  <div className="text-xl lg:text-2xl font-clash font-bold text-brand-gold">
                    {currentTestimonial.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls - Con animaciones premium */}
          <div className="flex justify-center items-center mt-6 space-x-6 md:space-x-8">
            {/* Previous Button */}
            <button
              onClick={prevTestimonialWithAnimation}
              disabled={isAnimating}
              className="nav-button flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-transparent border-2 border-cement-300 text-cement-700 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 hover:scale-110 hover:rotate-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation group focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
              aria-label="Ver testimonial anterior"
              type="button"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-[-2px] transition-transform duration-300" aria-hidden="true" />
            </button>

            {/* Navigation Dots - Con animaciones mejoradas */}
            <div ref={dotsRef} className="flex justify-center items-center space-x-3 md:space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  disabled={isAnimating}
                  className={`dot-button w-4 h-4 md:w-3 md:h-3 transition-all duration-500 disabled:cursor-not-allowed touch-manipulation rounded-full focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${
                    index === currentIndex
                      ? 'bg-brand-gold scale-125 shadow-lg shadow-brand-gold/50'
                      : 'bg-cement-300 hover:bg-cement-500 hover:scale-110 hover:shadow-md'
                  }`}
                  aria-label={`Ver testimonial ${index + 1} de ${testimonials.length}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                  type="button"
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonialWithAnimation}
              disabled={isAnimating}
              className="nav-button flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-transparent border-2 border-cement-300 text-cement-700 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 hover:scale-110 hover:-rotate-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation group focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
              aria-label="Ver siguiente testimonial"
              type="button"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-[2px] transition-transform duration-300" aria-hidden="true" />
            </button>
          </div>

          {/* Progress indicator - Minimalista */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="h-0.5 bg-cement-200 overflow-hidden">
              <div 
                className="h-full bg-brand-gold transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <span className="text-sm text-cement-500 font-medium">
                {currentIndex + 1} de {testimonials.length}
              </span>
            </div>
            
          </div>


        </div>
      </div>
    </section>
  )
}
