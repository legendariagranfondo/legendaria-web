// Tipos TypeScript para las traducciones
export interface TranslationKeys {
  // Navegación
  navigation: {
    home: string
    programs: string
    experiences: string
    academy: string
    contact: string
  }
  
  // Hero section
  hero: {
    title: string
    subtitle: string
    description: string
    cta: string
    ctaSecondary?: string
  }
  
  // Programas
  programs: {
    title: string
    description: string
    cta: string
  }
  
  // Experiencias
  experiences: {
    title: string
    description: string
    cta: string
  }
  
  // Academia
  academy: {
    title: string
    description: string
    cta: string
  }
  
  // Footer
  footer: {
    description: string
    quickLinks: string
    contact: string
    followUs: string
  }
  
  // Meta tags
  meta: {
    title: string
    description: string
    keywords: string[]
    siteName: string
  }
  
  // Botones comunes
  buttons: {
    bookClass: string
    learnMore: string
    contact: string
    whatsapp: string
  }
  
  // Formularios
  forms: {
    name: string
    email: string
    phone: string
    message: string
    send: string
    required: string
  }
  
  // Mensajes de WhatsApp
  whatsapp: {
    defaultMessage: string
    homeMessage: string
    programsMessage: string
    experiencesMessage: string
    academyMessage: string
  }
}

// Tipo para las traducciones cargadas dinámicamente
export type Translations = {
  [K in keyof TranslationKeys]: TranslationKeys[K]
}
