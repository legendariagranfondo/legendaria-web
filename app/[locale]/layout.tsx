import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Poppins } from "next/font/google"
import "../globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import SkipLinks from "@/components/ui/SkipLinks"
import GSAPRouteGuard from "@/components/animations/GSAPRouteGuard"
import CookieConsentPremium from "@/components/ui/CookieConsent"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { generateMetadata as generateI18nMetadata } from "@/lib/i18n/metadata"
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config"
import type { Locale } from "@/lib/i18n/config"
import { GA_TRACKING_ID } from "@/lib/analytics"

// FUENTES PREMIUM PARA EL REBRANDING
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

// Generar metadata dinámica basada en el locale
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = (resolvedParams?.locale || DEFAULT_LOCALE) as Locale
  return generateI18nMetadata(locale)
}

// Generar rutas estáticas para todos los locales
export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale: locale,
  }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = (resolvedParams?.locale || DEFAULT_LOCALE) as Locale

  return (
    <html lang={locale} className={`${inter.variable} ${playfairDisplay.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e3a8a" />
        
        {/* Preload only the most critical hero image for LCP */}
        <link rel="preload" href="/images/guille-adri-grey.png" as="image" type="image/png" />
        
        {/* Critical fonts - Preload for faster rendering */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          as="style" 
        />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" 
          as="style" 
        />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          as="style" 
        />
        
        {/* Load fonts with display=swap for better performance */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    allow_google_signals: false,
                    allow_ad_personalization_signals: false
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        
        {/* CSS is already imported, no need to preload */}
        
        {/* GSAP is loaded dynamically, no need to preload */}
        
        {/* Images are loaded on demand, no need to preload all */}
      </head>
      <body className="font-inter antialiased">
        <SkipLinks />
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main id="main-content" className="min-h-screen" role="main">
            {children}
          </main>
          <Footer />
          <GSAPRouteGuard />
          <GoogleAnalytics />
          {/* WhatsApp flotante retirado temporalmente */}
          <CookieConsentPremium />
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  )
}
