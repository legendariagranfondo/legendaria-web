"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Empresaria",
    program: "Perfeccionamiento",
    rating: 5,
    text: "En 6 meses he mejorado más que en 2 años jugando por mi cuenta. Los entrenadores son excepcionales.",
    image: "/images/guille.jpg",
    featured: true,
  },
  {
    name: "Carlos Ruiz",
    role: "Abogado",
    program: "Competición",
    rating: 5,
    text: "Gracias a JA Padel Academy conseguí mi primer torneo. La preparación fue clave para mi éxito.",
    image: "/images/gato.jpg",
    featured: false,
  },
  {
    name: "Ana Martín",
    role: "Doctora",
    program: "Iniciación",
    rating: 5,
    text: "Nunca había jugado al pádel y ahora es mi pasión. Los profesores hacen que aprender sea divertido.",
    image: "/images/gato.jpg",
    featured: false,
  },
  {
    name: "Roberto Silva",
    role: "Ingeniero",
    program: "Personalizado",
    rating: 5,
    text: "El entrenamiento personalizado me permitió corregir errores específicos en pocas sesiones.",
    image: "/images/gato.jpg",
    featured: true,
  },
  {
    name: "Laura Jiménez",
    role: "Arquitecta",
    program: "Experiencias Premium",
    rating: 5,
    text: "La experiencia en Marbella fue increíble. Combinó perfectamente deporte, lujo y diversión.",
    image: "/images/guille.jpg",
    featured: true,
  },
  {
    name: "Diego Morales",
    role: "Consultor",
    program: "Competición",
    rating: 5,
    text: "El nivel de los entrenadores y las instalaciones superó todas mis expectativas. Altamente recomendado.",
    image: "/images/gato.jpg",
    featured: false,
  },
]

export default function TestimonialsWall() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      if (sectionRef.current && gridRef.current) {
        // Animate testimonials with stagger
        gsap.fromTo(
          gridRef.current.children,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
            rotation: 2,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          },
        )
      }
    }

    loadGSAP()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-slate-50 to-white relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-800 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-primary-800/10 border border-primary-800/20 rounded-full text-primary-800 font-semibold mb-6">
            <Quote className="w-5 h-5 mr-2" />
            Testimonios Reales
          </div>
          <h2 className="text-5xl md:text-6xl font-montserrat font-bold text-slate-900 mb-6">
            Historias de <span className="text-primary-800">Éxito</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Más de 2,500 alumnos han transformado su juego y su vida con nosotros
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-500 hover:-translate-y-2 ${
                testimonial.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full ${
                  testimonial.featured ? "border-2 border-gold-500/20 premium-glow" : ""
                }`}
              >
                {/* Featured badge */}
                {testimonial.featured && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gold-500 text-white p-2 rounded-full shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                )}

                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-12 h-12 text-primary-800" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-slate-700 text-lg leading-relaxed mb-8 relative z-10">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                      loading="lazy"
                    />
                    {testimonial.featured && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-montserrat font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-slate-500 text-sm">{testimonial.role}</div>
                    <div
                      className={`text-sm font-medium ${testimonial.featured ? "text-gold-600" : "text-primary-800"}`}
                    >
                      Programa {testimonial.program}
                    </div>
                  </div>
                </div>

                {/* Shimmer effect for featured */}
                {testimonial.featured && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl overflow-hidden" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
