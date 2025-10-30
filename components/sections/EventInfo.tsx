"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventInfo() {
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
            // Title animation (rápida y sin scrub)
            const title = root.querySelector(".info-title");
            if (title) {
              gsap.fromTo(
                title,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: root,
                    start: "top 85%",
                    once: true,
                  },
                }
              );
            }

            // Cards animation (stagger temprano)
            const cards = root.querySelectorAll(".info-card");
            gsap.fromTo(
              cards,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
                stagger: 0.08,
                scrollTrigger: {
                  trigger: root,
                  start: "top 80%",
                  once: true,
                },
              }
            );
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

  const eventDetails = [
    {
      icon: Calendar,
      title: "Fecha del evento",
      content: "Sábado, 9 de mayo de 2026 · Salida 07:30",
    },
    {
      icon: Calendar,
      title: "Inscripciones",
      content: "Desde el 15/11/2025",
    },
    {
      icon: MapPin,
      title: "Salida y meta",
      content: "Polideportivo Municipal d’Ontinyent",
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="info-title text-4xl sm:text-5xl lg:text-6xl font-clash font-black text-brand-black mb-6">
              Información del{" "}
              <span className="text-brand-gold">Evento</span>
            </h2>
            <p className="text-xl text-cement-600 max-w-3xl mx-auto">
              Todo lo que necesitas saber sobre La Legendaria
            </p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
            {eventDetails.map((detail, index) => {
              const IconComponent = detail.icon;
              return (
                <div
                  key={index}
                  className="info-card bg-white rounded-xl p-6 md:p-7 shadow-sm hover:shadow-md border border-cement-200 hover:border-cement-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white border border-cement-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-brand-black/80" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-brand-black mb-1.5">
                        {detail.title}
                      </h3>
                      <p className="text-cement-700 leading-relaxed text-sm md:text-base">
                        {detail.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-brand-black hover:bg-brand-black/90 text-white px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => window.open('https://www.rockthesport.com/es/evento/legendaria-ontinyent-gran-fondo', '_blank', 'noopener,noreferrer')}
            >
              ¡INSCRÍBETE YA!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
