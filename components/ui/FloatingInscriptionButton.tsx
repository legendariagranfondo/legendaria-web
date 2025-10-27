"use client"

import { useState, useEffect } from "react"
import { ArrowUp, UserPlus } from "lucide-react"

export default function FloatingInscriptionButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón después de hacer scroll 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleInscription = () => {
    // Aquí se puede abrir un modal de inscripción o redirigir
    alert('¡Próximamente: Sistema de inscripción online!')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Botón de inscripción principal */}
      <button
        onClick={handleInscription}
        className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center gap-2 font-bold text-lg animate-pulse"
        aria-label="Inscribirse en La Legendaria"
      >
        <UserPlus className="w-5 h-5" />
        <span className="hidden sm:inline">¡INSCRÍBETE!</span>
        <span className="sm:hidden">¡INSC!</span>
      </button>

      {/* Botón de volver arriba */}
      <button
        onClick={scrollToTop}
        className="bg-brand-black hover:bg-brand-black/90 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  )
}
