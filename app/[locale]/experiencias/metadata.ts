import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experiencia de Pádel en Valencia (4 días) | Intensivo Élite + Turismo | JA Padel Academy",
  description:
    "Vive un intensivo premium de pádel en Valencia: 4 días (Mi–Sa) con entrenamientos élite, torneo con jugadores locales, paella y visitas a centro, playa y Albufera.",
  keywords: [
    "experiencia pádel Valencia",
    "experiencias pádel España",
    "intensivo pádel Valencia",
    "viaje pádel España",
    "camp de pádel Valencia",
    "turismo en Valencia",
    "Origen Padel Valencia",
  ],
  alternates: { canonical: "/experiencias", languages: { "es-ES": "/experiencias" } },
  openGraph: {
    type: "website",
    url: "https://japadel.com/experiencias",
    title: "Experiencia de Pádel en Valencia | JA Padel Academy",
    description:
      "Intensivo 4 días: pádel élite + turismo local. Torneo, paella y visitas a playa, centro y Albufera.",
    images: [{ url: "/images/og-valencia.jpg", width: 1200, height: 630, alt: "Experiencia de Pádel en Valencia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiencia de Pádel en Valencia | 4 días intensivos",
    description: "Entrena como un pro en Valencia y disfruta de la ciudad. Torneo + paella + turismo.",
    images: ["/images/twitter-valencia.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
}
