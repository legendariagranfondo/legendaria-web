"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, User, MessageSquare, MessageCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const message = `¡Hola! Me interesa conocer más sobre JA Padel Academy. 

Mi información:
- Nombre: ${formData.name || 'No especificado'}
- Email: ${formData.email || 'No especificado'}
- Teléfono: ${formData.phone || 'No especificado'}
- Programa de interés: ${formData.program || 'No especificado'}

Mensaje: ${formData.message || 'Quiero más información sobre los programas disponibles.'}`
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+34644465873&text=${encodedMessage}`
    
    // Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_contact_click', {
        event_category: 'conversion',
        event_label: 'contact_form',
        value: 1
      })
    }
    
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">
            Nombre completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent"
              placeholder="Tu nombre"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-slate-300">
            Teléfono
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent"
              placeholder="+34 600 123 456"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="program" className="block text-sm font-medium text-slate-300">
            Programa de interés
          </label>
          <select
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent"
          >
            <option value="" className="text-slate-900">
              Selecciona un programa
            </option>
            <option value="iniciacion" className="text-slate-900">
              Iniciación
            </option>
            <option value="perfeccionamiento" className="text-slate-900">
              Perfeccionamiento
            </option>
            <option value="competicion" className="text-slate-900">
              Competición
            </option>
            <option value="personalizado" className="text-slate-900">
              Personalizado
            </option>
            <option value="kids" className="text-slate-900">
              Pádel Kids
            </option>
            <option value="senior" className="text-slate-900">
              Pádel Senior
            </option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-slate-300">
          Mensaje
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent resize-none"
            placeholder="Cuéntanos sobre tu nivel actual, objetivos o cualquier pregunta..."
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="submit"
          className="flex-1 bg-primary-800 hover:bg-primary-900 text-white py-3 text-lg font-semibold"
        >
          Solicitar Información
        </Button>
        
        <Button
          type="button"
          onClick={openWhatsApp}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Chatear por WhatsApp
        </Button>
      </div>
    </form>
  )
}
