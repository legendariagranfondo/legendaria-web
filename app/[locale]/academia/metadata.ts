import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JA Padel Academy – Academia de Pádel en Valencia | Historia, Metodología y Entrenadores",
  description:
    "Conoce la historia de JA Padel Academy, a nuestro fundador Joan Aparici, nuestro equipo de entrenadores y nuestra metodología propia en Origen Padel Valencia.",
  keywords: [
    "academia pádel Valencia",
    "metodología pádel",
    "entrenadores pádel Valencia",
    "Origen Padel Valencia",
    "JA Padel Academy",
  ],
  alternates: { canonical: "/academia", languages: { "es-ES": "/academia" } },
  openGraph: {
    type: "website",
    url: "https://japadel.com/academia",
    title: "JA Padel Academy – Academia de Pádel en Valencia",
    description:
      "Nuestra historia, metodología y equipo de entrenadores. Fail Again. Fail Better.",
    images: [{ url: "/images/og-valencia.jpg", width: 1200, height: 630, alt: "JA Padel Academy Valencia" }],
  },
}
