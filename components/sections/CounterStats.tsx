"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Users, Trophy, Star, Calendar } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface StatItem {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
}

const stats: StatItem[] = [
  {
    icon: <Users className="w-8 h-8" />,
    value: 500,
    label: "Alumnos Activos",
    suffix: "+",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    value: 8,
    label: "Años de Experiencia",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    value: 15,
    label: "Entrenadores Pro",
    suffix: "+",
  },
  {
    icon: <Star className="w-8 h-8" />,
    value: 95,
    label: "Objetivos Alcanzados",
    suffix: "%",
  },
]

export default function CounterStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
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
  }, [hasAnimated])

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const element = document.getElementById(`counter-${index}`)
      if (element) {
        gsap.fromTo(
          element,
          { textContent: 0 },
          {
            textContent: stat.value,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              element.textContent = Math.ceil(this.targets()[0].textContent)
            },
          },
        )
      }
    })
  }

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Números</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Más de una década transformando jugadores y creando campeones
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-800/20 rounded-full text-primary-800 mb-4 group-hover:bg-primary-800 group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                <span id={`counter-${index}`}>0</span>
                {stat.suffix && <span className="text-primary-800">{stat.suffix}</span>}
              </div>
              <p className="text-slate-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
