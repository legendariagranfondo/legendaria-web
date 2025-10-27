"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { Calendar, MapPin, Route, Wrench, Clock, Users } from "lucide-react";
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
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "center center",
                scrub: 1,
              },
            });
            sectionTimeline = tl

            // Title animation
            const title = root.querySelector(".info-title");
            if (title) {
              tl.fromTo(
                title,
                { opacity: 0, y: 80, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", ease: "none" },
                0.2
              );
            }

            // Info cards animation
            const cards = root.querySelectorAll(".info-card");
            cards.forEach((card, index) => {
              tl.fromTo(
                card,
                { opacity: 0, y: 60, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, ease: "none" },
                0.4 + index * 0.1
              );
            });
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
      title: "Fecha",
      content: "Domingo, 9 de mayo 2026",
      color: "text-blue-600"
    },
    {
      icon: MapPin,
      title: "Lugar",
      content: "Salida y meta: Polideportivo Municipal de Ontinyent (césped artificial)",
      color: "text-green-600"
    },
    {
      icon: Route,
      title: "Distancias",
      content: "105 km y 55 km",
      color: "text-purple-600"
    },
    {
      icon: Wrench,
      title: "Servicios",
      content: "Avituallamientos, cronometraje, duchas, asistencia técnica",
      color: "text-orange-600"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {eventDetails.map((detail, index) => {
              const IconComponent = detail.icon;
              return (
                <div
                  key={index}
                  className="info-card bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-cement-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${detail.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-black mb-2">
                        {detail.title}
                      </h3>
                      <p className="text-cement-600 leading-relaxed">
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
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Ver mapa del recorrido
            </Button>
            <Button 
              size="lg"
              className="bg-brand-black hover:bg-brand-black/90 text-white px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              ¡INSCRÍBETE YA!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
