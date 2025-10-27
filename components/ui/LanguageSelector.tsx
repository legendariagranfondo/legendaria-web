"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { LANGUAGES } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'
import { useLanguagePreference } from '@/hooks/use-language-preference'
import type { Locale } from '@/lib/i18n/config'

interface LanguageSelectorProps {
  variant?: 'default' | 'minimal' | 'premium'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export default function LanguageSelector({ 
  variant = 'default',
  size = 'md',
  showLabel = true,
  className 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isMounted = useMounted()
  const { currentLocale, changeLanguage, isLoaded } = useLanguagePreference()
  
  // Definir clases de tamaño
  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base'
  }

  const iconSizes = {
    sm: 'w-5 h-5',  // Aumentado para mejor proporción
    md: 'w-6 h-6',  // Aumentado para coincidir con el nav
    lg: 'w-7 h-7'   // Aumentado para mejor visibilidad
  }
  
  // Obtener el idioma actual
  const currentLanguage = LANGUAGES.find(lang => lang.code === currentLocale) || LANGUAGES[0]
  
  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleLanguageChange = (locale: Locale) => {
    changeLanguage(locale)
    setIsOpen(false)
  }

  // Renderizar placeholder durante la hidratación
  if (!isMounted) {
    return (
      <div className={cn("relative", className)}>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-1",
            sizeClasses[size]
          )}
          disabled
        >
          <span className="text-lg">🌐</span>
          <ChevronDown className={cn("text-white", iconSizes[size])} />
        </Button>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-1 hover:bg-transparent",
            sizeClasses[size]
          )}
        >
          <span className="text-2xl">{currentLanguage.flag}</span>
          <ChevronDown className={cn("transition-transform text-white", isOpen && "rotate-180", iconSizes[size])} />
        </Button>
        
        {isOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-[60] min-w-[140px]">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 hover:bg-slate-50 w-full text-left transition-colors",
                  currentLocale === lang.code && "bg-brand-gold/10 text-brand-gold",
                  sizeClasses[size]
                )}
              >
              <span className="text-xl">{lang.flag}</span>
              <span className="flex-1 ml-2">{lang.name}</span>
                {currentLocale === lang.code && (
                  <Check className={iconSizes[size]} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'premium') {
    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5 transition-all duration-300",
            sizeClasses[size]
          )}
        >
          <Globe className={iconSizes[size]} />
          {showLabel && <span>{currentLanguage.name}</span>}
          <ChevronDown className={cn("transition-transform text-white", isOpen && "rotate-180", iconSizes[size])} />
        </Button>
        
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-brand-gold/20 rounded-xl shadow-xl z-[60] min-w-[160px] overflow-hidden">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 hover:bg-brand-gold/10 w-full text-left transition-all duration-200",
                  currentLocale === lang.code && "bg-brand-gold/15 text-brand-gold font-medium",
                  sizeClasses[size]
                )}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1 ml-3">
                  <div className="font-medium">{lang.name}</div>
                  <div className="text-xs text-slate-500">{lang.nativeName}</div>
                </div>
                {currentLocale === lang.code && (
                  <Check className={cn("text-brand-gold", iconSizes[size])} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Variant default
  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 hover:bg-slate-50",
          sizeClasses[size]
        )}
      >
        <Globe className={iconSizes[size]} />
        {showLabel && <span className="hidden sm:inline">Idioma</span>}
        <ChevronDown className={cn("transition-transform text-white", isOpen && "rotate-180", iconSizes[size])} />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-[60] min-w-[140px]">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 hover:bg-slate-50 w-full text-left transition-colors",
                currentLocale === lang.code && "bg-brand-gold/10 text-brand-gold",
                sizeClasses[size]
              )}
            >
              <span>{lang.flag}</span>
              <span className="flex-1">{lang.name}</span>
              {currentLocale === lang.code && (
                <Check className={iconSizes[size]} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
