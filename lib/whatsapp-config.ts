// Configuración centralizada de WhatsApp para JA Padel Academy

export const WHATSAPP_CONFIG = {
  // Número de teléfono principal
  phoneNumber: "+34644465873",
  
  // Mensajes personalizados por contexto
  messages: {
    home: "¡Hola! Vi la web de JA Padel Academy y quiero información sobre los programas. Me interesa reservar una clase.",
    academia: "¡Hola! Me interesa conocer más sobre JA Padel Academy. Quiero saber más sobre la metodología y entrenamientos.",
    programas: "¡Hola! Me interesa conocer los programas disponibles en JA Padel Academy. ¿Podrías ayudarme a elegir el más adecuado?",
    experiencias: "¡Hola! Me interesa conocer las experiencias premium de JA Padel Academy. Quiero información sobre las experiencias disponibles.",
    contact: "¡Hola! Tengo una consulta específica sobre JA Padel Academy. ¿Podrías ayudarme?",
    // Mensajes específicos por programa
    clases_particulares: "¡Hola! Me interesa reservar una CLASE PARTICULAR en JA Padel Academy. Quiero información sobre horarios, precios y disponibilidad. ¿Podrías ayudarme?",
    clases_grupo: "¡Hola! Me interesa conocer los HORARIOS de las CLASES EN GRUPO de JA Padel Academy. Quiero información sobre grupos disponibles y horarios. ¿Podrías ayudarme?",
    packs_personalizados: "¡Hola! Me interesa diseñar una EXPERIENCIA PERSONALIZADA en JA Padel Academy. Quiero información sobre packs personalizados, regalos especiales y visitas a Valencia. ¿Podrías ayudarme?"
  },

  // Configuración de tracking
  tracking: {
    events: {
      whatsapp_click: 'whatsapp_click',
      whatsapp_cta_click: 'whatsapp_cta_click',
      whatsapp_contact_click: 'whatsapp_contact_click',
      whatsapp_header_click: 'whatsapp_header_click',
      // Eventos específicos por programa
      whatsapp_clases_particulares: 'whatsapp_clases_particulares',
      whatsapp_clases_grupo: 'whatsapp_clases_grupo',
      whatsapp_packs_personalizados: 'whatsapp_packs_personalizados',
      // Eventos de Origen Padel
      origen_padel_website_click: 'origen_padel_website_click'
    },
    categories: {
      conversion: 'conversion',
      contact: 'contact',
      programs: 'programs',
      external: 'external'
    }
  },

  // Configuración de animaciones
  animations: {
    delay: 2000, // Delay antes de mostrar el botón flotante (ms)
    duration: 0.6, // Duración de animaciones (s)
    ease: "back.out(1.7)" // Easing de GSAP
  },

  // Configuración de estilos
  styles: {
    colors: {
      primary: "#25D366", // Verde WhatsApp oficial
      hover: "#128C7E", // Verde WhatsApp hover
      text: "#FFFFFF"
    },
    sizes: {
      floating: "w-16 h-16",
      inline: "w-12 h-12",
      cta: "w-auto h-auto px-6 py-3"
    }
  }
}

// Función helper para generar URL de WhatsApp
export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
}

// Función helper para tracking
export function trackWhatsAppEvent(
  eventName: string, 
  pageContext: string, 
  variant?: string
) {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: WHATSAPP_CONFIG.tracking.categories.conversion,
        event_label: variant ? `${pageContext}_${variant}` : pageContext,
        value: 1
      })
    }

    // Facebook Pixel
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: `WhatsApp ${pageContext}`,
        content_category: WHATSAPP_CONFIG.tracking.categories.contact
      })
    }

    console.log(`WhatsApp event tracked: ${eventName} from ${pageContext}`)
  }
}

// Función helper para obtener mensaje contextual
export function getContextualMessage(context: keyof typeof WHATSAPP_CONFIG.messages): string {
  return WHATSAPP_CONFIG.messages[context] || WHATSAPP_CONFIG.messages.home
}

// Función helper para manejar clicks de programas específicos
export function handleProgramWhatsAppClick(programType: 'clases_particulares' | 'clases_grupo' | 'packs_personalizados') {
  const message = getContextualMessage(programType)
  const url = generateWhatsAppUrl(WHATSAPP_CONFIG.phoneNumber, message)
  
  // Track del evento
  trackWhatsAppEvent(
    WHATSAPP_CONFIG.tracking.events[`whatsapp_${programType}`],
    'programs',
    programType
  )
  
  // Abrir WhatsApp
  window.open(url, '_blank', 'noopener,noreferrer')
}
