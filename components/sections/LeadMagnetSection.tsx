"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import PremiumButton from "@/components/ui/PremiumButton"
import { Download, Mail, User, CheckCircle, Sparkles, FileText, Star } from "lucide-react"

export default function LeadMagnetSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsLoading(false)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "" })
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <section ref={sectionRef} className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-montserrat font-bold text-slate-900 mb-4">¡Guía Enviada!</h3>
            <p className="text-xl text-slate-600 mb-6">
              Revisa tu email. Te hemos enviado la "Guía Completa de Pádel en Valencia" junto con un descuento exclusivo
              del 20%.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <p className="text-slate-700">
                <strong>Próximos pasos:</strong> Nuestro equipo te contactará en las próximas 24h para ofrecerte una
                clase personalizada.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} data-lead-magnet className="py-12 lg:py-16 section-premium relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-800 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section optimizado */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 bg-gold-500/20 border border-gold-500/30 rounded-full text-gold-700 font-semibold mb-4 lg:mb-6 shimmer">
              <Download className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Descarga Gratuita
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-brand-black mb-4 lg:mb-6">
              <span className="gold-text-gradient">Guía Premium</span>
              <br />
              Entrena Distinto
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-cement-600 mb-6 lg:mb-8 leading-relaxed max-w-2xl lg:max-w-3xl mx-auto">
              Descarga nuestra metodología exclusiva para transformar tu pádel.
              <br />
              <strong className="text-brand-gold">Acceso premium gratuito</strong>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Form prominente - Primera columna */}
            <div className="lg:order-1 card-premium shadow-2xl p-6 lg:p-8 relative border-2 border-brand-gold/20">
              {/* Premium badge optimizado */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gold-500 text-white px-4 py-1.5 lg:px-6 lg:py-2 rounded-full text-xs lg:text-sm font-bold shadow-lg premium-glow">
                  <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 inline mr-1" />
                  GRATIS POR TIEMPO LIMITADO
                </div>
              </div>

              <div className="text-center mb-4 lg:mb-6 mt-3 lg:mt-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-100 to-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-primary-800" />
                </div>
                <h3 className="text-xl lg:text-2xl font-montserrat font-bold text-slate-900 mb-2">¡Descarga GRATIS!</h3>
                <p className="text-sm text-slate-600">Solo necesitamos estos datos</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent transition-all"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <PremiumButton
                  type="submit"
                  className="w-full justify-center py-3 lg:py-4 text-base lg:text-lg font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 w-4 h-4 lg:w-5 lg:h-5" />
                      Descargar Guía Gratuita
                      <Sparkles className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
                    </>
                  )}
                </PremiumButton>

                <p className="text-xs text-slate-500 text-center leading-relaxed">
                  Al descargar la guía, aceptas recibir emails con consejos de pádel y ofertas exclusivas. Puedes darte
                  de baja en cualquier momento.
                </p>
              </form>

              {/* Trust indicators optimizados */}
              <div className="flex justify-center items-center gap-3 lg:gap-4 mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-slate-100">
                <div className="text-center">
                  <div className="text-sm lg:text-base font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500">Gratuito</div>
                </div>
                <div className="text-center">
                  <div className="text-sm lg:text-base font-bold text-slate-900">0</div>
                  <div className="text-xs text-slate-500">Spam</div>
                </div>
                <div className="text-center">
                  <div className="text-sm lg:text-base font-bold text-slate-900">24h</div>
                  <div className="text-xs text-slate-500">Entrega</div>
                </div>
              </div>
            </div>

            {/* Content optimizado - Segunda columna */}
            <div className="lg:order-2">
              {/* Benefits optimizados */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg">
                <h3 className="text-lg lg:text-xl font-montserrat font-bold text-slate-900 mb-3 lg:mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-gold-500 mr-2" />
                  ¿Qué incluye la guía?
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
                  {[
                    "Los mejores clubs de pádel en Valencia",
                    "Técnicas básicas paso a paso",
                    "Rutinas personalizadas",
                    "Consejos nutricionales",
                    "Descuento 20% JA Padel Academy",
                    "Calendario de torneos 2024"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 lg:gap-3">
                      <div className="w-4 h-4 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" />
                      </div>
                      <span className="text-sm lg:text-base text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Social proof optimizado */}
                <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-xs lg:text-sm text-slate-600">
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 fill-current" />
                    <span>4.9/5 (500+ reseñas)</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs lg:text-sm text-slate-600">
                    <Download className="w-3 h-3 lg:w-4 lg:h-4 text-primary-600" />
                    <span>+1,200 descargas</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs lg:text-sm text-slate-600">
                    <FileText className="w-3 h-3 lg:w-4 lg:h-4 text-gold-500" />
                    <span>32 páginas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
