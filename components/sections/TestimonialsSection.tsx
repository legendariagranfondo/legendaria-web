"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Alejandro Moreno",
    text: "Es metódico, paciente, comunicador y tiene la capacidad para sacar lo mejor de ti mismo, siempre con una sonrisa y aprendiendo del error. He tenido mucha suerte de cruzarme con un entrenador de su nivel."
  },
  {
    name: "María GM",
    text: "Yo empecé desde 0 y he aprendido y mejorado de forma exponencial. Las clases las hace super amenas con ejercicios diferentes para practicar todo tipo de golpes y estrategias. ¡Es el mejor!"
  },
  {
    name: "Víctor",
    text: "Un profesor 10. Te va a corregir con una sonrisa de oreja a oreja, así que saldrás de clase pasándotelo bien y jugando mejor a pádel."
  },
  {
    name: "Daniele",
    text: "La mejor clase de pádel que encontré en Valencia. Un entrenador muy bueno para explicar y una persona muy amable."
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
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
  }, [isAutoPlaying])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-slate-900 mb-6">
            Testimonios <span className="text-primary-800">Reales</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Historias de éxito de nuestros alumnos
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-white/50">
            <blockquote className="text-xl md:text-2xl text-slate-700 text-center mb-8 leading-relaxed font-light italic">
              "{testimonials[currentIndex].text}"
            </blockquote>

            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-800 to-primary-700 text-white rounded-full font-semibold shadow-lg">
                <Star className="w-4 h-4 mr-2 text-gold-300 fill-current" />
                {testimonials[currentIndex].name}
                <Star className="w-4 h-4 ml-2 text-gold-300 fill-current" />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-6 mt-8">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-white/80 border-primary-200 hover:bg-primary-50">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-white/80 border-primary-200 hover:bg-primary-50">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-primary-800 scale-125" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
