"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { Trophy, MapPin } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function AcademyHeritage() {
  const { t, isReady } = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null
    // referencias para cleanup
    let createdEventListeners: Array<{ target: Window | Element, type: string, handler: EventListenerOrEventListenerObject }> = []
    let sectionTimeline: any | null = null
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        gsap.registerPlugin(ScrollTrigger);

        if (sectionRef.current) {
          // 🚀 WORLD-CLASS ANIMATIONS - ESTILO STRIPE/APPLE/FRAMER 2025
          const root = sectionRef.current!
          let safeRemoveMouseFollower: () => void = () => {}
          let handleMouseMove: (e: MouseEvent) => void = () => {}
          const ctx = gsap.context(() => {
            // 🚀 SCROLL SCRUB ANIMATIONS - TÉCNICA 2025 AVANZADA
            // La animación progresa exactamente con el scroll - completamente atada
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: root,
                start: "top bottom", // Empieza cuando toca el viewport
                end: "center center", // Termina cuando está centrado
                scrub: 1, // CLAVE: animación atada al scroll (1 = suave)
                // markers: true,      // Descomentar para debug
              },
            });
            sectionTimeline = tl

          // 1. TITLE - Fade Up Staggered (Apple style)
          const titleParts = [
            root.querySelector(".title-la"),
            root.querySelector(".title-number"),
            root.querySelector(".title-academia"),
            root.querySelector(".title-location"),
          ].filter(Boolean);

          titleParts.forEach((part, index) => {
            if (part) {
              tl.fromTo(
                part,
                {
                  opacity: 0,
                  y: 80,
                  filter: "blur(10px)",
                },
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  ease: "none", // Sin easing para scrub
                },
                0.2 + index * 0.1 // Stagger equilibrado
              );
            }
          });

          // 2. SUBTITLE - Progressive scale con scroll
          const subtitle = root.querySelector(".academy-subtitle");
          if (subtitle) {
            tl.fromTo(
              subtitle,
              {
                opacity: 0,
                scale: 0.9,
                y: 40,
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                ease: "none",
              },
              0.6
            );
          }

          // 3. DESCRIPTION - Progressive reveal con scroll
          const description = root.querySelector(
            ".academy-description"
          );
          if (description) {
            tl.fromTo(
              description,
              {
                opacity: 0,
                y: 60,
                filter: "blur(5px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                ease: "none",
              },
              0.7
            );
          }

          // 4. CTA - Magnetic Rise (Premium style)
          const cta = root.querySelector(".academy-cta");
          if (cta) {
            tl.fromTo(
              cta,
              {
                opacity: 0,
                y: 50,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "none",
              },
              0.8
            );

            // Magnetic hover effect
            cta.addEventListener("mouseenter", () => {
              gsap.to(cta, { scale: 1.05, duration: 0.3, ease: "power2.out" });
            });

            cta.addEventListener("mouseleave", () => {
              gsap.to(cta, { scale: 1, duration: 0.3, ease: "power2.out" });
            });
          }

          // 5. SYNCHRONIZED PARALLAX - Background elements con mismo scrub
          const bgElements = root.querySelectorAll(
            ".academy-bg-element"
          );
            bgElements.forEach((element, index) => {
              gsap.to(element, {
              yPercent: -30 * (index + 1),
              rotation: 5 * (index % 2 === 0 ? 1 : -1),
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 1, // Mismo scrub que el timeline principal
              },
              });
            });

          // 6. MOUSE FOLLOWER - Premium interaction (simplified to avoid DOM errors)
          let mouseFollower: HTMLElement | null = null;
          let isMouseFollowerActive = false;
          
          const createMouseFollower = () => {
            // Desactivar en dispositivos móviles
            if (window.innerWidth <= 768 || 'ontouchstart' in window) {
              return;
            }
            
            if (!mouseFollower && !isMouseFollowerActive) {
              try {
                mouseFollower = document.createElement("div");
                mouseFollower.className = "mouse-follower";
                mouseFollower.style.cssText = `
                  position: fixed;
                  width: 20px;
                  height: 20px;
                  background: linear-gradient(45deg, #d4af37, #ffd700);
                  border-radius: 50%;
                  pointer-events: none;
                  z-index: 9999;
                  opacity: 0;
                  transform: translate(-50%, -50%);
                  transition: opacity 0.3s ease;
                `;
                document.body.appendChild(mouseFollower);
                isMouseFollowerActive = true;
              } catch (error) {
                console.warn("Error creating mouse follower:", error);
              }
            }
          };

          handleMouseMove = (e: MouseEvent) => {
            // Desactivar en dispositivos móviles
            if (window.innerWidth <= 768 || 'ontouchstart' in window) {
              return;
            }
            
            if (mouseFollower && isMouseFollowerActive) {
              gsap.to(mouseFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
              });
            }
          };

          const section = root;
          if (!section) return;

          let isMouseFollowerRemoved = false

          safeRemoveMouseFollower = () => {
            if (!mouseFollower || isMouseFollowerRemoved) return
            try {
              if (mouseFollower.parentNode) {
                if (mouseFollower.isConnected && mouseFollower.parentNode === document.body) {
                  document.body.removeChild(mouseFollower)
                }
              }
            } catch (error) {
              console.warn("Mouse follower cleanup error:", error)
            }
            isMouseFollowerRemoved = true
            mouseFollower = null
            isMouseFollowerActive = false
          }

          const onMouseEnter = () => {
            // Desactivar en dispositivos móviles
            if (window.innerWidth <= 768 || 'ontouchstart' in window) {
              return;
            }
            
            createMouseFollower();
            if (mouseFollower && isMouseFollowerActive) {
              gsap.to(mouseFollower, { opacity: 0.6, duration: 0.3 });
            }
            window.addEventListener("mousemove", handleMouseMove);
          };

          const onMouseLeave = () => {
            // Desactivar en dispositivos móviles
            if (window.innerWidth <= 768 || 'ontouchstart' in window) {
              return;
            }
            
            if (mouseFollower && isMouseFollowerActive) {
              gsap.to(mouseFollower, { 
                opacity: 0, 
                duration: 0.2,
                onComplete: () => {
                  safeRemoveMouseFollower()
                }
              });
            } else {
              safeRemoveMouseFollower()
            }
            window.removeEventListener("mousemove", handleMouseMove);
          };

            section.addEventListener("mouseenter", onMouseEnter);
            section.addEventListener("mouseleave", onMouseLeave);
          createdEventListeners.push({ target: section, type: 'mouseenter', handler: onMouseEnter as any })
          createdEventListeners.push({ target: section, type: 'mouseleave', handler: onMouseLeave as any })
          }, sectionRef)

          // Define cleanup to be called on unmount/navigation
          cleanup = () => {
            // eliminar mouse follower de forma segura
            safeRemoveMouseFollower()
            // quitar listeners registrados
            try {
              createdEventListeners.forEach(({ target, type, handler }) => {
                target.removeEventListener(type, handler as any)
              })
            } catch {}
            window.removeEventListener("mousemove", handleMouseMove)
            // matar timelines/scrolltriggers ligados a esta sección
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
      className="min-h-screen max-h-screen py-8 lg:py-12 bg-white relative flex items-center"
    >

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
          {/* Main Header Section */}
          <div className="text-center mb-6 lg:mb-8">
            {/* Main Title - World-Class Staggered Animation */}
            <h2 className="academy-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-clash font-black text-brand-black mb-4 lg:mb-6 leading-tight tracking-tight">
              <div className="title-la">NACE UNA</div>
              <div className="title-number text-brand-gold">LEYENDA</div>
            </h2>

            {/* Subtitle - Wave Animation */}
            <div className="mb-4 lg:mb-6">
              <div className="academy-subtitle inline-flex items-center px-6 py-3 bg-brand-black/10 border border-brand-black/20 text-brand-black font-bold transform skew-x-3">
                <MapPin className="w-5 h-5 mr-3" />
                Vall d'Albaida • Ontinyent • 9 Mayo 2026
              </div>
            </div>
          </div>

          {/* Description Section - Typing Effect */}
          <div className="max-w-4xl mx-auto text-center mb-6 lg:mb-8">
            <p className="academy-description text-lg sm:text-xl lg:text-2xl text-cement-700 leading-relaxed font-light">
              Bienvenidos a LEGENDARIA ONTINYENT GRAN FONDO, una marcha ciclista creada para quienes no buscan solo llegar, sino escribir su propia leyenda sobre el asfalto de Ontinyent y la “pequeña Toscana valenciana”.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
