"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { pageview } from "@/lib/analytics"

export default function GoogleAnalytics() {
  const pathname = usePathname()

  // Track page views (simplified version)
  useEffect(() => {
    // Add a delay to ensure gtag is loaded
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.gtag) {
          pageview(pathname)
        }
      } catch (error) {
        console.error('Error tracking pageview:', error)
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
