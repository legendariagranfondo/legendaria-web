"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, HelpCircle, Clock, CreditCard, Users, MapPin, Phone } from "lucide-react"

const faqData = [
  {
    category: "Inscripción y Participación",
    icon: <Clock className="w-5 h-5" />,
    questions: [
      {
        question: "¿Qué incluye la inscripción?",
        answer:
          "La inscripción incluye dorsal, cronometraje, avituallamientos, asistencia técnica, duchas, seguro de accidentes y acceso a la zona Expo con stands de marcas. También recibirás un obsequio de participación.",
      },
      {
        question: "¿Puedo participar sin licencia federada?",
        answer:
          "Sí, La Legendaria está abierta a todos los ciclistas. No es necesario tener licencia federada. Solo necesitas estar en buena forma física y tener una bicicleta en condiciones adecuadas.",
      },
      {
        question: "¿Dónde recojo mi dorsal?",
        answer:
          "El dorsal se recoge el día del evento en el Polideportivo Municipal de Ontinyent, en la zona de acreditaciones. Te recomendamos llegar con al menos 1 hora de antelación a la salida.",
      },
      {
        question: "¿Qué pasa si llueve?",
        answer:
          "La Legendaria se celebra llueva o haga sol. Solo se suspendería en caso de condiciones meteorológicas extremas que pongan en peligro la seguridad. En ese caso, se comunicaría con 24h de antelación.",
      },
    ],
  },
  {
    category: "Recorrido y Servicios",
    icon: <MapPin className="w-5 h-5" />,
    questions: [
      {
        question: "¿Qué servicios hay en la zona Expo?",
        answer:
          "La zona Expo incluye stands de marcas especializadas, servicio de mecánica, zona de descanso, food trucks, animación y entretenimiento. También habrá sorteos y actividades para todos los participantes.",
      },
      {
        question: "¿Hay avituallamientos en el recorrido?",
        answer:
          "Sí, habrá varios puntos de avituallamiento estratégicamente ubicados con agua, bebidas isotónicas, fruta y productos energéticos. Los puntos exactos se indicarán en el mapa del recorrido.",
      },
      {
        question: "¿Hay asistencia técnica?",
        answer:
          "Sí, contamos con servicio de mecánica en puntos clave del recorrido y vehículos de apoyo que circularán por la ruta. También hay servicio de recogida para ciclistas que no puedan continuar.",
      },
      {
        question: "¿Puedo cambiar de distancia el día del evento?",
        answer:
          "Sí, puedes cambiar entre el recorrido de 105 km y 55 km el mismo día del evento en la zona de acreditaciones, siempre que haya disponibilidad en la distancia que desees.",
      },
    ],
  },
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (sectionRef.current) {
          gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 100 },
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
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
      }
    }

    loadGSAP()
  }, [])

  const toggleItem = (questionId: string) => {
    setOpenItems((prev) => (prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]))
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-20 lg:py-32 bg-white relative"
      aria-labelledby="faq-heading"
    >
      {/* Angular Geometric Background - Sutil para fondo blanco */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        {/* Angular shapes */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[40px] border-b-brand-gold transform rotate-6" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-t-[30px] border-t-primary-800 transform -rotate-12" />
        
        {/* Geometric accent shapes */}
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-brand-gold/20 transform rotate-45" />
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-primary-800/20 transform -rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center px-8 py-4 bg-brand-gold text-brand-black font-black mb-8 transform -skew-x-6 hover:skew-x-0 transition-transform duration-300 shadow-lg">
            <HelpCircle className="w-6 h-6 mr-3" />
            PREGUNTAS FRECUENTES
          </div>
          <h2 id="faq-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clash font-black text-brand-black mb-8 lg:mb-12 leading-none tracking-tight">
            PREGUNTAS
            <br />
            <span className="text-brand-gold">FRECUENTES</span>
          </h2>
          <p className="text-xl sm:text-2xl text-cement-700 max-w-4xl mx-auto leading-relaxed font-light">
            Todo lo que necesitas saber sobre La Legendaria
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Category tabs - Angular */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {faqData.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-3 px-8 py-4 font-black text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${
                  activeCategory === index
                    ? "bg-brand-gold text-brand-black shadow-lg -skew-x-3"
                    : "bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black shadow-md"
                }`}
                aria-label={`Ver preguntas de ${category.category}`}
                aria-current={activeCategory === index ? "true" : "false"}
                type="button"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.category}</span>
              </button>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="space-y-4">
            {faqData[activeCategory].questions.map((faq, index) => {
              const questionId = `${activeCategory}-${index}`
              const isOpen = openItems.includes(questionId)

              return (
                <div
                  key={questionId}
                  className="bg-white border-l-4 border-brand-gold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <button
                    onClick={() => toggleItem(questionId)}
                    className="w-full text-left p-6 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${questionId}`}
                    aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} pregunta: ${faq.question}`}
                    type="button"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-clash font-bold text-lg text-brand-black pr-4">{faq.question}</h3>
                      <div className={`w-8 h-8 bg-brand-gold text-brand-black flex items-center justify-center transform rotate-45 transition-all duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-225" : ""
                      }`}>
                        <ChevronDown className="w-5 h-5 transform -rotate-45" />
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div id={`faq-answer-${questionId}`} className="px-6 pb-6 border-t-2 border-brand-gold/20">
                      <div className="pt-4 flex items-start gap-4">
                        <div className="w-3 h-3 bg-brand-gold transform rotate-45 mt-2 flex-shrink-0"></div>
                        <p className="text-cement-700 leading-relaxed font-medium">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Contact CTA - Angular */}
          <div className="text-center mt-20">
            <div className="bg-brand-black text-white border-l-4 border-brand-gold p-8 lg:p-12 shadow-2xl">
              <h3 className="text-3xl lg:text-4xl font-clash font-black mb-6">¿NO ENCUENTRAS TU RESPUESTA?</h3>
              <p className="text-white/90 mb-8 leading-relaxed text-lg">
                Para cualquier consulta: escríbenos a info@legendariana.com o llámanos al +34 6 XX XX XX XX.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="tel:+346XXXXXXX"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-gold text-brand-black font-black text-lg hover:bg-white hover:text-brand-black transition-all duration-300 transform -skew-x-3 hover:skew-x-0"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  LLAMAR AHORA
                </a>
                <a
                  href="mailto:info@legendariana.com"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-black text-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <HelpCircle className="w-5 h-5 mr-3" />
                  CONTACTAR POR EMAIL
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


