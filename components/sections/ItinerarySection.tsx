"use client"

import { useState, useEffect, useRef } from "react"
import { Clock, MapPin, Trophy, Camera, Waves, ArrowRight, Target, Zap, Play } from "lucide-react"

const itineraryData = [
  {
    day: 1,
    title: "LLEGADA Y BIENVENIDA",
    time: "16:00 - 20:00",
    location: "Origen Padel Valencia",
    activities: [
      "Check-in y bienvenida personalizada",
      "Evaluación técnica individual",
      "Entrega de material premium", 
      "Cena de bienvenida con paella valenciana",
    ],
    icon: <MapPin className="w-7 h-7" />,
    color: "bg-brand-gold",
    bgPattern: "bg-gradient-to-br from-brand-gold/20 to-primary-800/20",
    highlight: "12h de entrenamiento",
  },
  {
    day: 2,
    title: "ENTRENAMIENTO INTENSIVO",
    time: "09:00 - 18:00", 
    location: "Origen Padel + Ciudad de las Artes",
    activities: [
      "Masterclass técnica matutina (3h)",
      "Almuerzo en Ciudad de las Artes",
      "Sesión táctica avanzada (2h)",
      "Análisis de video personalizado",
    ],
    icon: <Trophy className="w-7 h-7" />,
    color: "bg-primary-800",
    bgPattern: "bg-gradient-to-br from-primary-800/20 to-brand-gold/20",
    highlight: "Torneo final",
  },
  {
    day: 3,
    title: "PÁDEL & PLAYA",
    time: "10:00 - 19:00",
    location: "Origen Padel + Playa Malvarrosa", 
    activities: [
      "Entrenamiento matutino especializado",
      "Traslado a Playa de la Malvarrosa",
      "Tiempo libre en la playa",
      "Almuerzo frente al mar",
    ],
    icon: <Waves className="w-7 h-7" />,
    color: "bg-brand-gold",
    bgPattern: "bg-gradient-to-br from-brand-gold/20 to-primary-800/20",
    highlight: "Paella valenciana incluida",
  },
  {
    day: 4,
    title: "TORNEO Y DESPEDIDA",
    time: "09:00 - 16:00",
    location: "Origen Padel Valencia",
    activities: [
      "Torneo interno por niveles",
      "Ceremonia de entrega de premios", 
      "Sesión de fotos profesional",
      "Almuerzo de despedida",
    ],
    icon: <Camera className="w-7 h-7" />,
    color: "bg-primary-800",
    bgPattern: "bg-gradient-to-br from-primary-800/20 to-brand-gold/20",
    highlight: "Trofeos + Fotos profesionales",
  },
]

export default function ItinerarySection() {
  const [activeDay, setActiveDay] = useState(1)
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
            sectionRef.current.querySelectorAll('.itinerary-element'),
            { opacity: 0, x: -60, rotateY: -15 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 1.2,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            },
          )

          // Animate day cards
          gsap.fromTo(
            sectionRef.current.querySelectorAll('.day-card'),
            { opacity: 0, scale: 0.8, rotateX: -30 },
            {
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
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

  return (
    <section ref={sectionRef} className="min-h-screen max-h-screen flex items-center bg-black relative">
      {/* Angular Geometric Background - Sutil */}
      <div className="absolute inset-0 opacity-5 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[40px] border-b-brand-gold transform rotate-12" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-t-[30px] border-t-primary-800 transform -rotate-6" />
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-brand-gold transform rotate-45" />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-primary-800 transform -rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Compacto */}
          <div className="text-center mb-12 itinerary-element">
            <div className="inline-flex items-center px-6 py-3 bg-brand-gold text-brand-black font-black mb-6 transform -skew-x-6 hover:skew-x-0 transition-transform duration-300">
              <Zap className="w-5 h-5 mr-2" />
              EXPERIENCIA PREMIUM VALENCIA
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clash font-black text-white mb-6 leading-none tracking-tight">
              EXPERIENCIA
              <br />
              <span className="text-brand-gold">PREMIUM</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-8">
              4 días intensivos que combinan entrenamiento de élite, cultura valenciana y momentos únicos en Valencia
            </p>
          </div>

          {/* Grid de 4 días compacto */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 itinerary-element">
            {itineraryData.map((item) => (
              <div
                key={item.day}
                className={`relative p-4 border-l-4 border-brand-gold bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                  activeDay === item.day ? 'bg-brand-gold/20 border-brand-gold' : ''
                }`}
                onClick={() => setActiveDay(item.day)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${item.color} text-white p-2 transform -skew-x-6`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-brand-gold font-bold text-xs">DÍA {item.day}</div>
                    <div className="text-white/60 text-xs">{item.time}</div>
                  </div>
                </div>
                <h3 className="text-white font-black text-sm mb-2">{item.title}</h3>
                <p className="text-white/70 text-xs">{item.location}</p>
              </div>
            ))}
          </div>

          {/* Contenido del día activo - Compacto */}
          {itineraryData.map((item) => (
            activeDay === item.day && (
              <div key={item.day} className="itinerary-element">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  
                  {/* Left: Info del día */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`${item.color} text-white p-3 transform -skew-x-6`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-clash font-black text-white">{item.title}</h3>
                        <div className="flex items-center gap-2 text-white/80">
                          <MapPin className="w-4 h-4 text-brand-gold" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-brand-gold/20 border-l-4 border-brand-gold">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-brand-gold text-brand-black flex items-center justify-center font-black text-xs">✓</div>
                        <span className="font-bold text-white text-sm">INCLUIDO:</span>
                      </div>
                      <p className="text-white/90 font-medium text-sm">{item.highlight}</p>
                    </div>
                  </div>

                  {/* Right: Actividades */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-clash font-bold text-white flex items-center gap-2">
                      <Play className="w-4 h-4 text-brand-gold" />
                      ACTIVIDADES
                    </h4>
                    
                    <div className="space-y-2">
                      {item.activities.slice(0, 3).map((activity, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-1 h-4 bg-brand-gold transform skew-y-12"></div>
                          <span className="text-white/90 font-medium text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}

          {/* CTA Final - Compacto */}
          <div className="text-center mt-8 itinerary-element">
            <button className="bg-brand-gold text-brand-black px-8 py-4 font-black text-lg transform -skew-x-3 hover:skew-x-0 hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
              RESERVAR EXPERIENCIA PREMIUM
              <Zap className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}