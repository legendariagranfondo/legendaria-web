"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { Heart, Handshake, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null
    let sectionTimeline: any | null = null
    
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        gsap.registerPlugin(ScrollTrigger);

        if (sectionRef.current) {
          const root = sectionRef.current!
          
          const ctx = gsap.context(() => {
            // Contenedor completo (aparece antes y sin scrub)
            gsap.fromTo(
              root,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: root,
                  start: "top 88%",
                  once: true,
                },
              }
            )

            // Título
            const title = root.querySelector(".sponsors-title");
            if (title) {
              gsap.fromTo(
                title,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.45,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: root,
                    start: "top 90%",
                    once: true,
                  },
                }
              )
            }

            // Subtítulo
            const subtitle = root.querySelector(".sponsors-subtitle");
            if (subtitle) {
              gsap.fromTo(
                subtitle,
                { opacity: 0, y: 18 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: root,
                    start: "top 88%",
                    once: true,
                  },
                }
              )
            }

            // Contenido (bloque de patrocinio)
            const content = root.querySelector(".sponsors-content");
            if (content) {
              gsap.fromTo(
                content,
                { opacity: 0, y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.45,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: root,
                    start: "top 85%",
                    once: true,
                  },
                }
              )
            }
          }, sectionRef)

          cleanup = () => {
            ;(async () => {
              try {
                const { ScrollTrigger } = await import("gsap/ScrollTrigger")
                if (sectionTimeline && typeof sectionTimeline.kill === 'function') {
                  sectionTimeline.kill()
                }
                const currentRoot = sectionRef.current
                if (currentRoot) {
                  ScrollTrigger.getAll().forEach(t => {
                    const trig = (t as any).vars?.trigger as Element | undefined
                    if (trig && currentRoot.contains(trig)) {
                      t.kill()
                    }
                  })
                }
              } catch {}
            })()
            try { ctx.revert() } catch {}
          }
        }
      } catch (error) {
        console.error("Error loading GSAP:", error);
      }
    };

    loadGSAP();
    return () => {
      if (cleanup) cleanup()
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-brand-black to-slate-900 text-white relative overflow-hidden overflow-x-clip"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <div className="mb-12">
            <h2 className="sponsors-title text-4xl sm:text-5xl lg:text-6xl font-clash font-black text-white mb-4">
              Gracias a nuestros{" "}
              <span className="text-brand-gold">patrocinadores</span>
            </h2>
            <p className="sponsors-subtitle text-xl text-slate-300">
              Empresas que hacen posible La Legendaria
            </p>
          </div>

          {/* Content */}
          <div className="sponsors-content">
            {/* Información para patrocinadores */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Handshake className="w-8 h-8 text-brand-gold" />
                <h3 className="text-2xl font-bold text-white">¿Quieres ser patrocinador?</h3>
              </div>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Si tu marca quiere formar parte de La Legendaria 2026, escríbenos y te enviaremos el dossier de patrocinio con opciones y visibilidad del evento.
              </p>
              <Button 
                size="lg"
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.open('mailto:legendariagranfondo@gmail.com?subject=Patrocinio%20Legendaria%202026', '_self')}
              >
                <Star className="w-5 h-5 mr-2" />
                Solicitar dossier de patrocinio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
