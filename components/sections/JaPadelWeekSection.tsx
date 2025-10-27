"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"

export default function JaPadelWeekSection() {
  const { t, isReady } = useTranslations()
  return (
    <Link 
      href="/experiencias"
      className="relative w-full overflow-hidden block group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
      role="banner"
      aria-label="JA Padel Week - Evento especial - Ir a experiencias"
    >
      {/* Imagen de fondo - 100% width, altura reducida */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
        <Image
          src="/images/gato-manu.jpg"
          alt="JA Padel Week - Evento especial de pádel en Valencia"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            objectPosition: 'center 30%'
          }}
        />
        
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/50 transition-all duration-300" />
        
        {/* Contenido centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-clash font-black mb-4 tracking-tight group-hover:scale-105 transition-transform duration-300">
              <span className="block">{isReady ? t("jaPadelWeek.title") : "JA PADEL"}</span>
              <span className="block gold-text-gradient">{isReady ? t("jaPadelWeek.subtitle") : "WEEK"}</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto group-hover:opacity-100 transition-opacity duration-300">
              {isReady ? t("jaPadelWeek.description") : "Vive la experiencia definitiva del pádel"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
