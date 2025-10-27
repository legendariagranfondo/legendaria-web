"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  animation?: "fade" | "slideUp" | "slideLeft" | "slideRight"
  delay?: number
}

export default function SectionReveal({
  children,
  className = "",
  animation = "slideUp",
  delay = 0,
}: SectionRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let st: any
    let ctx: any
    let isMounted = true

    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (!isMounted || !elementRef.current) return
        const element = elementRef.current

        const initialState = {
          fade: { opacity: 0 },
          slideUp: { opacity: 0, y: 60 },
          slideLeft: { opacity: 0, x: -60 },
          slideRight: { opacity: 0, x: 60 },
        } as const

        const finalState = {
          fade: { opacity: 1 },
          slideUp: { opacity: 1, y: 0 },
          slideLeft: { opacity: 1, x: 0 },
          slideRight: { opacity: 1, x: 0 },
        } as const

        ctx = gsap.context(() => {
          gsap.set(element, initialState[animation])

          st = ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(element, {
                ...finalState[animation],
                duration: 0.8,
                delay,
                ease: "power2.out",
              })
            },
          })
        }, elementRef)
      } catch (err) {
        console.error("SectionReveal GSAP error:", err)
      }
    }

    loadGSAP()

    return () => {
      isMounted = false
      if (st) {
        try {
          st.kill()
        } catch (e) {
          // ignore
        }
      }
      try { if (ctx) ctx.revert() } catch {}
    }
  }, [animation, delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
