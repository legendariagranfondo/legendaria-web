import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programas de Pádel Valencia | Clases y Entrenamientos Profesionales | JA Padel Academy",
  description: "Descubre nuestros programas de pádel en Valencia: iniciación, perfeccionamiento, competición y personalizados. Entrenadores certificados, metodología exclusiva y grupos reducidos. ¡Reserva tu clase!",
  keywords: [
    "programas pádel Valencia",
    "clases pádel Valencia",
    "entrenamiento pádel Valencia",
    "academia pádel Valencia",
    "pádel iniciación Valencia",
    "pádel competición Valencia",
    "entrenadores pádel Valencia",
    "metodología pádel Valencia",
    "grupos reducidos pádel",
    "pádel personalizado Valencia",
    "pádel kids Valencia",
    "pádel senior Valencia",
    "Origen Padel Valencia",
    "JA Padel Academy"
  ],
  authors: [{ name: "JA Padel Academy Valencia" }],
  creator: "JA Padel Academy",
  publisher: "JA Padel Academy",
  metadataBase: new URL("https://japadel.com"),
  alternates: {
    canonical: "/programas",
    languages: { "es-ES": "/programas" }
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://japadel.com/programas",
    siteName: "JA Padel Academy",
    title: "Programas de Pádel Valencia | Clases y Entrenamientos Profesionales",
    description: "Descubre nuestros programas de pádel en Valencia: iniciación, perfeccionamiento, competición y personalizados. Entrenadores certificados, metodología exclusiva y grupos reducidos.",
    images: [{
      url: "/images/og-programas.jpg",
      width: 1200,
      height: 630,
      alt: "Programas de Pádel Valencia - JA Padel Academy"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Programas de Pádel Valencia | JA Padel Academy",
    description: "🏆 Programas de pádel premium en Valencia. Clases particulares, grupos y experiencias personalizadas.",
    images: ["/images/twitter-programas.jpg"],
    creator: "@japadel_valencia"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code"
  }
}
