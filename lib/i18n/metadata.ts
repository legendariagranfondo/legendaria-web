import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n/config"

export async function generateMetadata(locale: Locale): Promise<Metadata> {
  // Cargar las traducciones para el locale
  const translations = await import(`@/lib/i18n/translations/${locale}.json`)
  const t = translations.default

  return {
    title: {
      default: t.meta.title,
      template: `%s | ${t.meta.siteName}`,
    },
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: "JA Padel Academy Valencia" }],
    creator: "JA Padel Academy",
    publisher: "JA Padel Academy",
    metadataBase: new URL("https://japadel.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "es-ES": "/es",
        "en-US": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === 'es' ? "es_ES" : "en_US",
      url: `https://japadel.com/${locale}`,
      siteName: t.meta.siteName,
      title: t.meta.title,
      description: t.meta.description,
      images: [
        {
          url: "/images/og-valencia.jpg",
          width: 1200,
          height: 630,
          alt: `${t.meta.siteName} - ${t.meta.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/images/twitter-valencia.jpg"],
      creator: "@japadel_valencia",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  }
}
