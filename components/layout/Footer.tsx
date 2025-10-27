"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function Footer() {
  const { t, isReady } = useTranslations()
  
  return (
    <footer className="bg-gradient-to-b from-white to-cement-50 text-brand-black border-t-2 border-brand-gold/30">
      <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid md:grid-cols-4 gap-16 lg:gap-20">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center">
              <Image 
                src="/images/legendariaLogo.png" 
                alt="La Legendaria - Ontinyent Grand Fondo 2026" 
                width={200} 
                height={80} 
                className="h-16 w-auto" 
              />
            </div>
            <p className="text-cement-600 font-medium leading-relaxed text-lg">
              La gran marcha ciclista de la Vall d'Albaida. Una experiencia ciclista única que combina paisaje, comunidad y deporte.
            </p>
            <div className="flex space-x-5">
              <Link href="https://instagram.com/legendaria_ontinyent" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-cement-100 text-cement-700 hover:bg-brand-gold hover:text-brand-black transition-all duration-300 flex items-center justify-center transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-clash font-black text-brand-black mb-8 text-lg">ENLACES RÁPIDOS</h3>
            <ul className="space-y-5">
              <li>
                <Link href="/" className="footer-link text-cement-600 hover:text-brand-gold transition-colors font-medium flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#beneficios" className="footer-link text-cement-600 hover:text-brand-gold transition-colors font-medium flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  Beneficios
                </Link>
              </li>
              <li>
                <Link href="#informacion" className="footer-link text-cement-600 hover:text-brand-gold transition-colors font-medium flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  Información
                </Link>
              </li>
              <li>
                <Link href="#faq" className="footer-link text-cement-600 hover:text-brand-gold transition-colors font-medium flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Info */}
          <div>
            <h3 className="font-clash font-black text-brand-black mb-8 text-lg">EL EVENTO</h3>
            <ul className="space-y-5">
              <li>
                <span className="footer-link text-cement-600 font-medium flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  105 km y 55 km
                </span>
              </li>
              <li>
                <span className="footer-link text-cement-600 font-medium flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  9 Mayo 2026
                </span>
              </li>
              <li>
                <span className="footer-link text-cement-600 font-medium flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  Ontinyent, Valencia
                </span>
              </li>
              <li>
                <span className="footer-link text-cement-600 font-medium flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  Club Ciclista Ontinyent
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-clash font-black text-brand-black mb-8 text-lg">CONTACTO</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 text-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+346XXXXXXX" className="footer-link text-cement-600 hover:text-brand-gold font-medium transition-colors leading-relaxed">+34 6 XX XX XX XX</a>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 text-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:info@legendariana.com" className="footer-link text-cement-600 hover:text-brand-gold font-medium transition-colors leading-relaxed">info@legendariana.com</a>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 text-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-cement-600 font-medium leading-relaxed">Ontinyent, Valencia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-brand-gold/20 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cement-500 font-medium text-center md:text-left">© 2025 Club Ciclista Ontinyent. Todos los derechos reservados. Aviso legal · Política de privacidad.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 lg:gap-8 mt-6 md:mt-0">
                <Link href="/politica-privacidad" className="footer-link text-cement-500 hover:text-brand-gold font-medium transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  PRIVACIDAD
                </Link>
                <Link href="/politica-cookies" className="footer-link text-cement-500 hover:text-brand-gold font-medium transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 bg-brand-gold transform rotate-45 group-hover:scale-125 transition-transform"></div>
                  COOKIES
                </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
