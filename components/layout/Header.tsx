"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { generateWhatsAppUrl, getContextualMessage, trackWhatsAppEvent } from "@/lib/whatsapp-config"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguagePreference } from "@/hooks/use-language-preference"
import LanguageSelector from "@/components/ui/LanguageSelector"

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  // Hook de traducciones y idioma
  const { t, isReady } = useTranslations()
  const { currentLocale } = useLanguagePreference()

  useEffect(() => {
    let lastScrollY = 0
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          
          // Lógica de scroll
          if (currentScrollY < 50) {
            // Parte superior - transparente
            setIsVisible(true)
            setIsScrolled(false)
          } else {
            // Fuera de la parte superior
            setIsScrolled(true)
            
            if (currentScrollY > lastScrollY) {
              // Scroll hacia abajo - ocultar
              setIsVisible(false)
              setIsMobileMenuOpen(false)
            } else if (currentScrollY < lastScrollY) {
              // Scroll hacia arriba - mostrar
              setIsVisible(true)
            }
          }
          
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }
    
    // Ejecutar inmediatamente
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  // Cerrar menú móvil al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Navegación con traducciones y idioma actual
  const navigation = [
    { name: isReady ? t("navigation.home") : "Inicio", href: `/${currentLocale}` },
    { name: isReady ? t("navigation.programs") : "Programas", href: `/${currentLocale}/programas` },
    { name: isReady ? t("navigation.experiences") : "Experiencias Premium", href: `/${currentLocale}/experiencias` },
    { name: isReady ? t("navigation.academy") : "Academia", href: `/${currentLocale}/academia` },
  ]


  const forceDark = typeof document !== "undefined" && document.documentElement.classList.contains("force-dark-header")

  // Función para manejar click de WhatsApp
  const handleWhatsAppClick = () => {
    const message = getContextualMessage('home')
    const url = generateWhatsAppUrl("+34644465873", message)
    
    // Track del evento
    trackWhatsAppEvent('whatsapp_header_click', 'header', 'reservar_clase')
    
    // Abrir WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Invisible trigger zone for hover when navbar is hidden */}
      <div 
        className="fixed top-0 w-full h-16 z-40 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        style={{ display: !isVisible ? 'block' : 'none' }}
      />
      
      <header
        className={`fixed top-0 w-full z-50 navbar-mobile-fix navbar-scroll-behavior ${
          isScrolled 
            ? "bg-white shadow-lg border-b border-slate-200/50 transition-all duration-300 ease-out navbar-mobile-bg" 
            : "bg-transparent transition-all duration-150 ease-out"
        } ${
          isVisible
            ? "translate-y-0 opacity-100 transition-transform duration-300 ease-out" 
            : "-translate-y-full opacity-0 transition-all duration-500 ease-in"
        }`}
        onMouseEnter={() => {
          if (!isVisible) {
            setIsHovered(true)
          }
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Dinámico */}
          <div className="flex items-center">
            <Link 
              href={`/${currentLocale}`} 
              className="logo-legendaria-link block"
              style={{ 
                backgroundColor: 'transparent !important',
                background: 'transparent !important',
                padding: '0',
                margin: '0',
                border: 'none',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.background = 'transparent';
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Image 
                src="/images/legendariaLogo.png" 
                alt="La Legendaria - Ontinyent Grand Fondo 2026" 
                width={80} 
                height={30} 
                className="h-8 w-auto transition-all duration-300" 
                style={{ 
                  backgroundColor: 'transparent',
                  background: 'transparent',
                  display: 'block',
                  width: 'auto',
                  height: 'auto'
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-300 hover:scale-105 hover:skew-x-1 transform bg-transparent hover:bg-transparent shadow-none hover:shadow-none ${
                  (forceDark || isScrolled) 
                    ? "text-slate-700 hover:text-brand-gold" 
                    : "text-white/90 hover:text-brand-gold"
                } ${
                  (item.href === `/${currentLocale}` ? pathname === `/${currentLocale}` : pathname.startsWith(item.href))
                    ? "text-brand-gold border-b-2 border-brand-gold pb-1"
                    : ""
                }`}
                aria-current={(item.href === `/${currentLocale}` ? pathname === `/${currentLocale}` : pathname.startsWith(item.href)) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector 
              variant="minimal" 
              size="sm" 
              showLabel={false}
            />
            
            {/* CTA Button */}
            <Button 
              onClick={handleWhatsAppClick}
              className={`px-6 py-3 font-black text-sm transform -skew-x-3 hover:skew-x-0 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 ${
                (forceDark || isScrolled) ? "bg-white text-brand-black hover:bg-brand-black hover:text-white border-brand-black" : "bg-white/10 text-white hover:bg-brand-gold hover:text-brand-black border-white/50 hover:border-brand-gold"
              }`}
            >
              {isReady ? t("buttons.bookClass") : "Reservar Clase"}
            </Button>
          </div>

          {/* Mobile Language Selector + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Language Selector */}
            <LanguageSelector 
              variant="minimal" 
              size="sm" 
              showLabel={false}
              className=""
            />
            
            {/* Mobile Menu Button */}
            <button
              className={`transition-all duration-300 hover:scale-110 hover:skew-x-1 transform ${
                isScrolled ? "text-slate-900 hover:text-brand-gold" : "text-white hover:text-brand-gold"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg border border-slate-200 relative z-40 max-w-sm mx-auto animate-in slide-in-from-top-2 duration-300">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 transition-all duration-300 hover:scale-105 hover:skew-x-1 transform bg-transparent hover:bg-transparent shadow-none hover:shadow-none ${
                  (item.href === `/${currentLocale}` ? pathname === `/${currentLocale}` : pathname.startsWith(item.href))
                    ? "text-brand-gold font-semibold"
                    : "text-slate-700 hover:text-brand-gold"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={(item.href === `/${currentLocale}` ? pathname === `/${currentLocale}` : pathname.startsWith(item.href)) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="px-4 pt-4">
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-white text-brand-black px-6 py-3 font-black text-sm transform -skew-x-3 hover:skew-x-0 hover:scale-105 hover:bg-brand-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-brand-black"
              >
                {isReady ? t("buttons.bookClass") : "Reservar Clase"}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  )
}
