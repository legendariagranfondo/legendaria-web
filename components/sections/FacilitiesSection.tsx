"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Wifi, Car, Coffee, Dumbbell, Users, Shield, Clock } from "lucide-react"

const facilities = [
  {
    title: "8 Pistas Profesionales",
    description: "Pistas con césped artificial de última generación, iluminación LED y sistema de drenaje avanzado",
    icon: <MapPin className="w-6 h-6" />,
    image: "/images/Valencia_CAC.jpg",
  },
  {
    title: "Zona Fitness Especializada",
    description: "Gimnasio equipado específicamente para el entrenamiento de pádel con máquinas de última generación",
    icon: <Dumbbell className="w-6 h-6" />,
    image: "/images/bandeja-joan.jpg",
  },
  {
    title: "Vestuarios Premium",
    description: "Vestuarios amplios con duchas individuales, taquillas de seguridad y zona de relajación",
    icon: <Users className="w-6 h-6" />,
    image: "/images/Valencia_CAC.jpg",
  },
  {
    title: "Cafetería & Terraza",
    description: "Espacio social con terraza panorámica, ideal para relajarse después del entrenamiento",
    icon: <Coffee className="w-6 h-6" />,
    image: "/images/mar-party.jpg",
  },
  {
    title: "Aparcamiento Gratuito",
    description: "100 plazas de aparcamiento gratuito con acceso directo a las instalaciones",
    icon: <Car className="w-6 h-6" />,
    image: "/images/Valencia_CAC.jpg",
  },
  {
    title: "WiFi de Alta Velocidad",
    description: "Conexión WiFi gratuita de alta velocidad en todas las instalaciones",
    icon: <Wifi className="w-6 h-6" />,
    image: "/images/Valencia_CAC.jpg",
  },
]

const additionalFeatures = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Seguridad 24/7",
    description: "Sistema de videovigilancia y control de acceso",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Horario Amplio",
    description: "Abierto de 7:00 a 23:00 todos los días",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Zona Infantil",
    description: "Área de juegos para los más pequeños",
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    title: "Tienda Pro Shop",
    description: "Material y equipamiento profesional",
  },
]

export default function FacilitiesSection() {
  const [selectedFacility, setSelectedFacility] = useState(0)

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-4">
            Instalaciones de <span className="text-primary-800">Primera Clase</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Cada detalle de nuestras instalaciones está pensado para ofrecerte la mejor experiencia de pádel
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Facility Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={facilities[selectedFacility].image || "/placeholder.svg"}
              alt={facilities[selectedFacility].title}
              fill
              className="object-cover transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-montserrat font-bold mb-2">{facilities[selectedFacility].title}</h3>
              <p className="text-slate-200">{facilities[selectedFacility].description}</p>
            </div>
          </div>

          {/* Facility List */}
          <div className="space-y-4">
            {facilities.map((facility, index) => (
              <button
                key={index}
                onClick={() => setSelectedFacility(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  selectedFacility === index
                    ? "bg-primary-800 text-white shadow-lg"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedFacility === index ? "bg-white/20" : "bg-primary-100 text-primary-800"
                    }`}
                  >
                    {facility.icon}
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-lg">{facility.title}</h4>
                    <p className={`text-sm ${selectedFacility === index ? "text-orange-100" : "text-slate-600"}`}>
                      {facility.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-montserrat font-bold text-center text-slate-900 mb-8">Servicios Adicionales</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-800 rounded-full mb-3">
                  {feature.icon}
                </div>
                <h4 className="font-montserrat font-semibold text-slate-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
