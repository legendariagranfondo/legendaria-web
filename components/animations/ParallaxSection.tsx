"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ParallaxSectionProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export default function ParallaxSection({ children, offset = 0.5, className = "" }: ParallaxSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      if (elementRef.current) {
        gsap.to(elementRef.current, {
          yPercent: -50 * offset,
          ease: "none",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }
    }

    loadGSAP()
  }, [offset])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
