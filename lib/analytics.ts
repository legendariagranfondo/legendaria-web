declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Cookie consent management
export const getCookieConsent = (): boolean => {
  if (typeof window === "undefined") return false
  
  try {
    const consent = localStorage.getItem('JA_PADEL_COOKIE_CONSENT')
    if (!consent) return false
    
    const consentData = JSON.parse(consent)
    return consentData.given === true
  } catch {
    return false
  }
}

export const getAnalyticsConsent = (): boolean => {
  if (typeof window === "undefined") return false
  
  try {
    const preferences = localStorage.getItem('JA_PADEL_COOKIE_PREFERENCES')
    if (!preferences) return false
    
    const prefsData = JSON.parse(preferences)
    return prefsData.analytics === true
  } catch {
    return false
  }
}

// Initialize Google Analytics with consent
export const initializeAnalytics = () => {
  if (typeof window === "undefined") return
  
  // Wait for gtag to be available
  if (!window.gtag) {
    console.warn('Google Analytics gtag not available yet')
    return
  }
  
  const hasConsent = getCookieConsent()
  const analyticsConsent = getAnalyticsConsent()
  
  if (hasConsent && analyticsConsent && GA_TRACKING_ID) {
    // Configure Google Analytics with consent
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted'
    })
    
    // Initialize GA
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    })
  } else {
    // Deny all tracking
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted'
    })
  }
}

// Update consent when user changes preferences
export const updateAnalyticsConsent = (analyticsEnabled: boolean) => {
  if (typeof window === "undefined" || !window.gtag) return
  
  window.gtag('consent', 'update', {
    analytics_storage: analyticsEnabled ? 'granted' : 'denied',
    ad_storage: 'denied'
  })
}

// Track page views (only if consent given)
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag && getAnalyticsConsent()) {
    window.gtag("config", GA_TRACKING_ID!, {
      page_path: url,
    })
  }
}

// Track events (only if consent given)
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== "undefined" && window.gtag && getAnalyticsConsent()) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversions (only if consent given)
export const trackConversion = (eventName: string, value?: number) => {
  if (getAnalyticsConsent()) {
    event({
      action: eventName,
      category: "conversion",
      value: value,
    })
  }
}

// Track user interactions (only if consent given)
export const trackUserInteraction = (interaction: string, element?: string) => {
  if (getAnalyticsConsent()) {
    event({
      action: interaction,
      category: "user_interaction",
      label: element,
    })
  }
}

// Track form submissions (only if consent given)
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  if (getAnalyticsConsent()) {
    event({
      action: success ? "form_submit_success" : "form_submit_error",
      category: "form_interaction",
      label: formName,
    })
  }
}

// Track button clicks (only if consent given)
export const trackButtonClick = (buttonName: string, location?: string) => {
  if (getAnalyticsConsent()) {
    event({
      action: "button_click",
      category: "user_interaction",
      label: `${buttonName}${location ? ` - ${location}` : ''}`,
    })
  }
}

// Track scroll depth (only if consent given)
export const trackScrollDepth = (depth: number) => {
  if (getAnalyticsConsent()) {
    event({
      action: "scroll_depth",
      category: "engagement",
      label: `${depth}%`,
      value: depth,
    })
  }
}

// Track time on page (only if consent given)
export const trackTimeOnPage = (timeInSeconds: number) => {
  if (getAnalyticsConsent()) {
    event({
      action: "time_on_page",
      category: "engagement",
      label: `${Math.round(timeInSeconds)}s`,
      value: Math.round(timeInSeconds),
    })
  }
}
