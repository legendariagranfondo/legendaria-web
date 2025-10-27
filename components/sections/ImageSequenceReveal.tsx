"use client";

import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";

const staticImage = "/images/bandeja-padel.jpg";

export default function ImageSequenceReveal() {
  const { t, isReady } = useTranslations();

  return (
    <section className="relative bg-gradient-to-br from-brand-gold/5 via-brand-white to-brand-gold/5">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-brand-gold transform rotate-45 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-primary-800 transform -rotate-12 blur-2xl" />
        </div>

        <div className="w-full h-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
            {/* Image Container - Estática */}
            <div className="relative w-full h-96 lg:h-full order-1 lg:order-1">
              <Image
                src={staticImage}
                alt="Metodología JA Padel Academy"
                fill
                className="object-cover shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
            </div>

            {/* Content Container - Mitad pantalla para texto */}
            <div className="text-brand-black space-y-6 lg:space-y-8 order-2 lg:order-2 flex flex-col justify-center p-8 lg:p-12">

              {/* Subtitle */}
              <p className="text-brand-gold font-black text-sm lg:text-base tracking-wider uppercase">
                {isReady ? t("methodology.subtitle") : "FAIL AGAIN. FAIL BETTER."}
              </p>

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-clash font-black leading-none tracking-tight">
                {isReady ? t("methodology.title") : "METODOLOGÍA EXCLUSIVA"}
              </h2>

              {/* Description */}
              <p className="text-lg lg:text-xl text-cement-700 leading-relaxed font-light max-w-2xl">
                {isReady ? t("methodology.description") : "Transformamos cada error en una oportunidad de crecimiento. Nuestra metodología única combina técnica avanzada, mentalidad ganadora y entrenamiento personalizado para llevarte del fracaso al éxito. Cada sesión es un paso más hacia tu máximo potencial."}
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}