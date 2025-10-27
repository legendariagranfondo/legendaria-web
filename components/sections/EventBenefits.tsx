"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { Mountain, Shield, Users, Trophy, MapPin, Clock } from "lucide-react";

export default function EventBenefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null
    let createdEventListeners: Array<{ target: Window | Element, type: string, handler: EventListenerOrEventListenerObject }> = []
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
            const title = root.querySelector(".benefits-title");
            if (title) {
              tl.fromTo(
                title,
                { opacity: 0, y: 80, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", ease: "none" },
                0.2
              );
            }

            // Benefits cards animation
            const cards = root.querySelectorAll(".benefit-card");
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
            try {
              createdEventListeners.forEach(({ target, type, handler }) => {
                target.removeEventListener(type, handler as any)
              })
            } catch {}
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

  const benefits = [
    {
      icon: Mountain,
      title: "Recorrido inolvidable",
      description: "Entre montaña, viñedos y valle."
    },
    {
      icon: Shield,
      title: "Ambiente profesional",
      description: "Con apoyo local, cronometrado y seguro."
    },
    {
      icon: Users,
      title: "Zona Expo",
      description: "Stands de marcas top, animación y comunidad ciclista."
    },
    {
      icon: Trophy,
      title: "Para todos los niveles",
      description: "Amateur, entusiasta o competidor."
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
            <p className="text-xl text-cement-600 max-w-3xl mx-auto">
              Una experiencia ciclista completa que va más allá de la competición
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="benefit-card group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-cement-200 hover:border-brand-gold/30"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-gold/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-black mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-cement-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 bg-brand-black/5 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-brand-gold" />
                <span className="font-semibold text-brand-black">Ontinyent</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-brand-gold" />
                <span className="font-semibold text-brand-black">9 Mayo 2026</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <button 
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ¡INSCRÍBETE AHORA!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
