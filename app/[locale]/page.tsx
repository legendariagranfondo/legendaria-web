import SpectacularHero from "@/components/sections/SpectacularHero"
import AcademyHeritage from "@/components/sections/AcademyHeritage"
import EventBenefits from "@/components/sections/EventBenefits"
import EventInfo from "@/components/sections/EventInfo"
import SponsorsSection from "@/components/sections/SponsorsSection"
import FAQSection from "@/components/sections/FAQSection"
import CallToActionPremium from "@/components/sections/CallToActionPremium"

import SectionReveal from "@/components/animations/SectionReveal"
import ParallaxSection from "@/components/animations/ParallaxSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "La Legendaria - Ontinyent Grand Fondo 2026",
  description:
    "La gran marcha ciclista de la Vall d'Albaida. Únete a La Legendaria, una experiencia ciclista única que combina paisaje, comunidad y deporte. 105 km y 55 km adaptados para todos los niveles. Domingo 9 de mayo 2026.",
  openGraph: {
    title: "La Legendaria - Ontinyent Grand Fondo 2026",
    description: "La gran marcha ciclista de la Vall d'Albaida. Una experiencia ciclista única que combina paisaje, comunidad y deporte. Domingo 9 de mayo 2026.",
  },
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero optimizado - H1 principal */}
      <SpectacularHero />

      {/* 2. Presentación del evento - H2 */}
      <SectionReveal animation="slideUp" delay={0.1}>
        <AcademyHeritage />
      </SectionReveal>

      {/* 3. Beneficios del evento - H2 */}
      <SectionReveal animation="slideUp" delay={0.2}>
        <EventBenefits />
      </SectionReveal>

      {/* 4. Información práctica - H2 */}
      <SectionReveal animation="slideUp" delay={0.2}>
        <EventInfo />
      </SectionReveal>

      {/* 5. Patrocinadores - H2 */}
      <SectionReveal animation="fade" delay={0.1}>
        <SponsorsSection />
      </SectionReveal>

      {/* 6. FAQ - H2 */}
      <SectionReveal animation="fade" delay={0.1}>
        <FAQSection />
      </SectionReveal>

      {/* 7. CTA final - H2 */}
      <CallToActionPremium />
    </>
  )
}
