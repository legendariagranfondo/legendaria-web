import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function NotFound() {
  const headersList = await headers()
  const cookie = headersList.get('cookie')
  
  // Detectar idioma preferido del usuario
  let locale = 'es' // Por defecto español
  
  if (cookie) {
    // Buscar cookie de idioma
    const localeMatch = cookie.match(/ja-padel-locale=([^;]+)/)
    if (localeMatch) {
      locale = localeMatch[1]
    }
  }
  
  // Redirigir a la página 404 personalizada en el idioma correcto
  redirect(`/${locale}/not-found`)
}
