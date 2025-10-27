"use client"

import { useEffect, useRef, useState } from "react"
import { Building, Users, Trophy, Calendar, Star, Target } from "lucide-react"

const stats = [
  {
    icon: <Building className="w-8 h-8" />,
    value: 8,
    label: "Pistas Profesionales",
    description: "Con césped artificial de última generación",
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: 15,
    label: "Entrenadores Pro",
    description: "Profesionales certificados a tu disposición",
    suffix: "+",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    value: 200,
    label: "Torneos Organizados",
    description: "Eventos para todos los niveles",
    suffix: "+",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    value: 8,
    label: "Años de Experiencia",
    description: "Formando campeones desde 2016",
  },
  {
    icon: <Star className="w-8 h-8" />,
    value: 4.9,
    label: "Valoración Media",
    description: "Basada en +500 reseñas verificadas",
  },
  {
    icon: <Target className="w-8 h-8" />,
    value: 95,
    label: "Objetivos Alcanzados",
    description: "Alumnos que logran sus metas",
    suffix: "%",
  },
]

export default function AcademyStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      if (sectionRef.current && !hasAnimated) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => {
            setHasAnimated(true)
            animateCounters()
          },
        })
      }
    }

    loadGSAP()
  }, [hasAnimated])

  const animateCounters = async () => {
    const { gsap } = await import("gsap")

    stats.forEach((stat, index) => {
      const element = document.getElementById(`academy-counter-${index}`)
      if (element) {
        gsap.fromTo(
          element,
          { textContent: 0 },
          {
            textContent: stat.value,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: stat.value < 10 ? 0.1 : 1 },
            onUpdate: function () {
              const value = this.targets()[0].textContent
              element.textContent = stat.value < 10 ? Number.parseFloat(value).toFixed(1) : Math.ceil(value).toString()
            },
          },
        )
      }
    })
  }

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-4">
            Nuestros Números
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Datos que reflejan nuestro compromiso con la excelencia y la satisfacción de nuestros alumnos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-800 rounded-full mb-4 group-hover:bg-primary-800 group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                <span id={`academy-counter-${index}`}>0</span>
                {stat.suffix && <span className="text-primary-800">{stat.suffix}</span>}
              </div>
              <h3 className="font-montserrat font-semibold text-slate-900 mb-1">{stat.label}</h3>
              <p className="text-sm text-slate-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
