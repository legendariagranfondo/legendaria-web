"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { Store, Download, Percent, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommerceOffer() {
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
            const title = root.querySelector(".commerce-title");
            if (title) {
              tl.fromTo(
                title,
                { opacity: 0, y: 80, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", ease: "none" },
                0.2
              );
            }

            // Content animation
            const content = root.querySelector(".commerce-content");
            if (content) {
              tl.fromTo(
                content,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, ease: "none" },
                0.4
              );
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
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="commerce-title text-4xl sm:text-5xl lg:text-6xl font-clash font-black text-brand-black mb-6">
              Oferta exclusiva para{" "}
              <span className="text-brand-gold">comercios</span>
            </h2>
            <p className="text-xl text-cement-600">
              Red ComerçIn • Club Ciclista Ontinyent
            </p>
          </div>

          {/* Content */}
          <div className="commerce-content">
            <div className="bg-gradient-to-br from-brand-gold/5 to-brand-gold/10 rounded-2xl p-8 border border-brand-gold/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center">
                  <Store className="w-8 h-8 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-black">
                    Oferta exclusiva para comercios de la red ComerçIn
                  </h3>
                  <p className="text-cement-600">
                    Club Ciclista Ontinyent
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-lg text-cement-700 leading-relaxed mb-6">
                  Si eres comercio asociado al convenio con el Club Ciclista Ontinyent, te ofrecemos una valla publicitaria por sólo <strong className="text-brand-gold">200 €</strong> (precio habitual 300 €) para la temporada 2024‑2025. Visible en zonas clave. Aprovecha esta oportunidad preferente.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Percent className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h4 className="font-bold text-brand-black mb-2">33% Descuento</h4>
                    <p className="text-sm text-cement-600">De 300€ a 200€</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h4 className="font-bold text-brand-black mb-2">Zonas Clave</h4>
                    <p className="text-sm text-cement-600">Máxima visibilidad</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Store className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h4 className="font-bold text-brand-black mb-2">Red ComerçIn</h4>
                    <p className="text-sm text-cement-600">Solo asociados</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    size="lg"
                    className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar info para comercios
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
