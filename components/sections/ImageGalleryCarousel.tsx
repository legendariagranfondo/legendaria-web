"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/Valencia_CAC.jpg",
    alt: "Pistas profesionales de Origen Padel Valencia",
    caption: "Pistas profesionales con césped artificial de última generación",
  },
  {
    src: "/images/bandeja-joan.jpg",
    alt: "Entrenamiento personalizado en JA Padel Academy",
    caption: "Entrenamiento personalizado con los mejores profesionales",
  },
  {
    src: "/images/mar-party.jpg",
    alt: "Experiencia Pádel & Playa Valencia",
    caption: "Experiencia Pádel & Playa: lo mejor de Valencia",
  },
  {
    src: "/images/Valencia_CAC.jpg",
    alt: "Instalaciones premium de Origen Padel",
    caption: "Instalaciones premium para una experiencia completa",
  },
  {
    src: "/images/joan-padelrace.jpg",
    alt: "Clase grupal en JA Padel Academy",
    caption: "Clases grupales con atención personalizada",
  },
  {
    src: "/images/torneo-navidad.jpg",
    alt: "Torneo de pádel en Origen Padel Valencia",
    caption: "Torneos exclusivos para todos los niveles",
  },
]

export default function ImageGalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isLightboxOpen) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isLightboxOpen])

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (sectionRef.current && carouselRef.current) {
          gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            },
          )
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
      }
    }

    loadGSAP()
  }, [])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    setIsAutoPlaying(false)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setIsAutoPlaying(false)
  }

  const openLightbox = () => {
    setIsLightboxOpen(true)
    setIsAutoPlaying(false)
    document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = "" // Restore scrolling
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    // If the swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next
        nextImage()
      } else {
        // Swipe right, go to previous
        prevImage()
      }
    }
  }

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      switch (e.key) {
        case "ArrowLeft":
          prevImage()
          break
        case "ArrowRight":
          nextImage()
          break
        case "Escape":
          closeLightbox()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen])

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-white to-slate-50 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-800 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-primary-800/10 border border-primary-800/20 rounded-full text-primary-800 font-semibold mb-6">
            <Maximize2 className="w-5 h-5 mr-2" />
            Galería de Imágenes
          </div>
          <h2 className="text-5xl md:text-6xl font-montserrat font-bold text-slate-900 mb-6">
            Descubre <span className="text-primary-800">Origen Padel</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explora nuestras instalaciones premium y vive la experiencia JA Padel Academy en Valencia
          </p>
        </div>

        {/* Main Gallery Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div
            ref={carouselRef}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            onClick={openLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="button"
            tabIndex={0}
            aria-label="Abrir galería de imágenes"
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-medium">{image.caption}</p>
                </div>

                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails con scroll snap */}
          <div className="flex justify-start gap-2 mt-6 overflow-x-auto pb-2 scroll-snap-x carousel-scroll md:justify-center">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all scroll-snap-center ${
                  index === currentIndex
                    ? "ring-4 ring-primary-800 ring-opacity-70 scale-110"
                    : "ring-2 ring-white opacity-70 hover:opacity-100"
                }`}
                aria-label={`Ver imagen ${index + 1}: ${image.alt}`}
              >
                <Image src={image.src || "/placeholder.svg"} alt="" fill className="object-cover" sizes="64px" loading="lazy" />
              </button>
            ))}
          </div>

          {/* Auto-play controls */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                isAutoPlaying ? "bg-slate-100 text-slate-700" : "bg-primary-50 text-primary-700"
              } transition-colors`}
            >
              {isAutoPlaying ? (
                <>
                  <span className="w-3 h-3 bg-slate-400 rounded-full"></span>
                  Pausar rotación automática
                </>
              ) : (
                <>
                  <span className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-l-primary-700 border-t-transparent border-b-transparent"></span>
                  Reproducir rotación automática
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
            aria-label="Cerrar galería"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full h-full max-w-7xl max-h-[80vh] mx-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-xl font-medium">{image.caption}</p>
                  <p className="text-sm text-white/70 mt-2">
                    Imagen {index + 1} de {galleryImages.length}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnails in lightbox */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-2 overflow-x-auto pb-2 max-w-full px-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                  index === currentIndex ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image src={image.src || "/placeholder.svg"} alt="" fill className="object-cover" sizes="48px" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
