"use client"

import Link from "next/link"
import ForceDarkHeader from "@/components/layout/ForceDarkHeader"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguagePreference } from "@/hooks/use-language-preference"

export default function NotFound() {
  const { t, isReady } = useTranslations()
  const { currentLocale } = useLanguagePreference()
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <ForceDarkHeader />
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto mb-10">
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center" aria-label="Pelota de tenis rebotando" role="img" style={{ animation: "padel-bounce 1.2s infinite ease-in-out" }}>
            <span className="text-6xl" aria-hidden>
              🎾
            </span>
          </div>
          {/* Sombra */}
          <div className="w-24 h-3 mx-auto mt-6 rounded-full bg-black/10" style={{ animation: "padel-shadow 1.2s infinite ease-in-out" }} />
        </div>

        <p className="text-brand-gold font-black text-sm tracking-wider uppercase">{isReady ? t("notFound.errorCode") : "404 - Página no encontrada"}</p>
        <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-clash font-black text-brand-black">{isReady ? t("notFound.title") : "La tiraste fuera"}</h1>
        <p className="mt-4 text-cement-700 text-base lg:text-lg">{isReady ? t("notFound.description") : "Pero no pasa nada… sigue entrenando. Volvamos a pista."}</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href={`/${currentLocale}`}
            className="bg-brand-gold text-brand-black px-8 py-3 font-black transition-all duration-300 shadow-lg transform -skew-x-3 hover:skew-x-0 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-gold/50 focus:ring-offset-2"
          >
            {isReady ? t("notFound.homeButton") : "Volver al inicio"}
          </Link>
          <Link
            href={`/${currentLocale}/programas`}
            className="border-2 border-brand-black text-brand-black px-8 py-3 font-semibold transition-all duration-300 hover:bg-brand-black hover:text-white"
          >
            {isReady ? t("notFound.programsButton") : "Ver programas"}
          </Link>
        </div>

        <style>{`
          @keyframes padel-bounce {
            0% { transform: translateY(0) scaleY(1); }
            45% { transform: translateY(22px) scaleY(1.03); }
            55% { transform: translateY(22px) scaleY(0.9); }
            100% { transform: translateY(0) scaleY(1); }
          }
          @keyframes padel-shadow {
            0% { transform: scaleX(1); opacity: 0.15; }
            50% { transform: scaleX(0.65); opacity: 0.35; }
            100% { transform: scaleX(1); opacity: 0.15; }
          }
        `}</style>
      </section>
    </main>
  )
}
