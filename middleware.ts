import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isValidLocale } from '@/lib/i18n/config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Manejar la ruta raíz específicamente
  if (pathname === '/') {
    // Intentar obtener preferencia de cookie primero
    const preferredLocale = request.cookies.get('ja-padel-locale')?.value
    
    if (preferredLocale && isValidLocale(preferredLocale)) {
      return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url))
    }

    // Si no hay cookie, detectar del header Accept-Language
    const acceptLanguage = request.headers.get('accept-language')
    let detectedLocale = DEFAULT_LOCALE

    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(',')
        .map(lang => {
          const [locale, quality] = lang.trim().split(';q=')
          return {
            locale: locale.split('-')[0],
            quality: quality ? parseFloat(quality) : 1.0
          }
        })
        .sort((a, b) => b.quality - a.quality)

      for (const { locale } of languages) {
        if (isValidLocale(locale)) {
          detectedLocale = locale
          break
        }
      }
    }

    return NextResponse.redirect(new URL(`/${detectedLocale}`, request.url))
  }
  
  // Verificar si el pathname ya tiene un locale válido
  const pathnameHasValidLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Si no tiene locale válido, redirigir al idioma detectado
  if (!pathnameHasValidLocale) {
    // Detectar idioma preferido del usuario
    const acceptLanguage = request.headers.get('accept-language')
    let detectedLocale = DEFAULT_LOCALE

    if (acceptLanguage) {
      // Parsear Accept-Language header
      const languages = acceptLanguage
        .split(',')
        .map(lang => {
          const [locale, quality] = lang.trim().split(';q=')
          return {
            locale: locale.split('-')[0], // Solo el código principal (es, en)
            quality: quality ? parseFloat(quality) : 1.0
          }
        })
        .sort((a, b) => b.quality - a.quality)

      // Buscar el primer idioma soportado
      for (const { locale } of languages) {
        if (isValidLocale(locale)) {
          detectedLocale = locale
          break
        }
      }
    }

    // Redirigir a la URL con el locale detectado
    const redirectUrl = new URL(`/${detectedLocale}${pathname}`, request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Si ya tiene locale válido, continuar normalmente
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     * - site.webmanifest (manifest file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico|.*\\.xml|.*\\.txt|.*\\.json|_next).*)',
  ],
}
