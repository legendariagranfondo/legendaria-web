"use client"

import { useEffect, useRef } from "react"

interface StoryItem {
  year: string
  title: string
  desc: string
}

interface StoryTimelineProps {
  items: StoryItem[]
}

export default function StoryTimeline({ items }: StoryTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let st: any
    const run = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".story-card")

        // Estado inicial (alineado con SectionReveal de Home)
        gsap.set(cards, { opacity: 0, y: 60, scale: 0.98, filter: "blur(8px)" })

        // Animación con scrub para que avance con el scroll (sensación Home)
        st = gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.6,
          },
        })
      } catch (e) {
        // ignore
      }
    }
    run()
    return () => {
      if (st && typeof st.kill === "function") st.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-brand-white to-cement-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-clash font-black text-brand-black text-center mb-10 tracking-tight">Nuestra historia</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((s, i) => (
            <div key={i} className="story-card bg-white transition-all p-6">
              <div className="text-brand-gold font-black text-xl mb-1">{s.year}</div>
              <h3 className="text-2xl font-clash font-black text-brand-black mb-2 tracking-tight">{s.title}</h3>
              <p className="text-cement-700 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


