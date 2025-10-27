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
            const title = root.querySelector(".sponsors-title");
            if (title) {
              tl.fromTo(
                title,
                { opacity: 0, y: 80, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", ease: "none" },
                0.2
              );
            }

            // Content animation
            const content = root.querySelector(".sponsors-content");
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
      className="py-20 lg:py-32 bg-gradient-to-br from-brand-black to-slate-900 text-white relative overflow-hidden"
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
            <h2 className="sponsors-title text-4xl sm:text-5xl lg:text-6xl font-clash font-black text-white mb-6">
              Gracias a nuestros{" "}
              <span className="text-brand-gold">patrocinadores</span>
            </h2>
            <p className="text-xl text-slate-300">
              Empresas que hacen posible La Legendaria
            </p>
          </div>

          {/* Content */}
          <div className="sponsors-content">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-brand-gold" />
                <h3 className="text-2xl font-bold text-white">Patrocinadores 2025</h3>
              </div>
              
              {/* Placeholder for sponsor logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
                <div className="w-24 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">Logo 1</span>
                </div>
                <div className="w-24 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">Logo 2</span>
                </div>
                <div className="w-24 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">Logo 3</span>
                </div>
                <div className="w-24 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">Logo 4</span>
                </div>
              </div>
            </div>

            {/* Call to Action for Sponsors */}
            <div className="bg-brand-gold/10 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Handshake className="w-8 h-8 text-brand-gold" />
                <h3 className="text-2xl font-bold text-white">¿Quieres ser patrocinador?</h3>
              </div>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                ¿Quieres que tu marca esté con nosotros en 2025? Consulta nuestras opciones de patrocinio y forma parte de La Legendaria.
              </p>
              <Button 
                size="lg"
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Star className="w-5 h-5 mr-2" />
                Consultar patrocinio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
