"use client"

import { useEffect, useState } from "react"

const SkipLinks = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !isVisible) {
        setIsVisible(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsVisible(true)
      }
    }

    const handleClick = () => {
      setIsVisible(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      document.removeEventListener("click", handleClick)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="skip-links">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-gold focus:text-brand-black focus:px-4 focus:py-2 focus:rounded focus:font-bold focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      <a
        href="#programs-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 focus:z-50 focus:bg-brand-gold focus:text-brand-black focus:px-4 focus:py-2 focus:rounded focus:font-bold focus:shadow-lg"
      >
        Saltar a programas
      </a>
      <a
        href="#testimonials-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:top-28 focus:left-4 focus:z-50 focus:bg-brand-gold focus:text-brand-black focus:px-4 focus:py-2 focus:rounded focus:font-bold focus:shadow-lg"
      >
        Saltar a testimonios
      </a>
      <a
        href="#faq-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:top-40 focus:left-4 focus:z-50 focus:bg-brand-gold focus:text-brand-black focus:px-4 focus:py-2 focus:rounded focus:font-bold focus:shadow-lg"
      >
        Saltar a preguntas frecuentes
      </a>
    </div>
  )
}

export default SkipLinks
