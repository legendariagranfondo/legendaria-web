"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { Mountain, Shield, Users, Trophy, MapPin, Clock } from "lucide-react";

export default function EventBenefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null
    
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        gsap.registerPlugin(ScrollTrigger);

        if (sectionRef.current) {
          const root = sectionRef.current!
          
          const ctx = gsap.context(() => {
            // Sección completa: aparece pronto y una sola vez
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
                  start: "top 90%",
                  once: true,
                },
              }
            )

            // Título
            const title = root.querySelector(".benefits-title");
            if (title) {
              gsap.fromTo(
                title,
                { opacity: 0, y: 18 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.45,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: root,
                    start: "top 92%",
                    once: true,
                  },
                }
              )
            }

            // Tarjetas (stagger)
            const cards = root.querySelectorAll(".benefit-card");
            gsap.fromTo(
              cards,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                stagger: 0.08,
                scrollTrigger: {
                  trigger: root,
                  start: "top 88%",
                  once: true,
                },
              }
            )
          }, sectionRef)

          cleanup = () => {
            try { ctx.revert() } catch {}
          }
        }
      } catch (error) {
        console.error("Error loading GSAP:", error);
      }
    };

    loadGSAP();
    return () => { if (cleanup) cleanup() }
  }, []);

  // 3 bloques para una rejilla equilibrada en desktop
  const benefits = [
    {
      icon: Mountain,
      title: "Tres recorridos oficiales",
      description: "134,1 · 152,3 · 170,5 km: elige tu desafío con garantías."
    },
    {
      icon: Shield,
      title: "Seguridad y soporte",
      description: "Cronometraje, asistencia mecánica y sanitaria durante la marcha."
    },
    {
      icon: Trophy,
      title: "Medallas y bolsa",
      description: "Medallas por tiempo y bolsa del participante con maillot oficial."
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="benefits-title text-4xl sm:text-5xl lg:text-6xl font-clash font-black text-brand-black mb-6">
              ¿Por qué elegir{" "}
              <span className="text-brand-gold">La Legendaria</span>?
            </h2>
            <p className="text-xl text-cement-700 max-w-3xl mx-auto">
              Una marcha diseñada para una experiencia segura, completa y exigente
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="benefit-card group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-cement-200 hover:border-cement-300 hover:-translate-y-0.5"
                >
                  <div className="text-center">
                    <div className="w-14 h-14 bg-white border border-cement-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-7 h-7 text-brand-black" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-black mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-cement-700 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="mt-14 text-center">
            <button 
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black px-8 py-4 text-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => window.open('https://www.rockthesport.com/es/evento/legendaria-ontinyent-gran-fondo', '_blank', 'noopener,noreferrer')}
            >
              ¡INSCRÍBETE AHORA!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
