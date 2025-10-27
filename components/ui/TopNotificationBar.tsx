"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface TopNotificationBarProps {
  message: string
  ctaText: string
  ctaLink?: string
  onClose?: () => void
}

export default function TopNotificationBar({ 
  message, 
  ctaText, 
  ctaLink = "#", 
  onClose 
}: TopNotificationBarProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-brand-gold to-gold-600 text-brand-black py-3 px-4 relative z-50">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div className="flex items-center justify-center gap-4 flex-1">
          <span className="text-sm lg:text-base font-medium">
            {message}
          </span>
          <a
            href={ctaLink}
            className="bg-brand-black text-brand-gold px-4 py-1.5 lg:px-6 lg:py-2 rounded font-bold text-sm lg:text-base hover:bg-slate-800 transition-colors"
          >
            {ctaText}
          </a>
        </div>
        
        <button
          onClick={handleClose}
          className="absolute right-4 p-1 hover:bg-black/20 rounded transition-colors"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
