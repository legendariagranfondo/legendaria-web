"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Clock, Users } from "lucide-react"

interface ExperienciaCardProps {
  title: string
  description: string
  price: number
  duration: string
  rating: number
  image: string
  highlights: string[]
}

export default function ExperienciaCard({
  title,
  description,
  price,
  duration,
  rating,
  image,
  highlights,
}: ExperienciaCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 group hover-glow">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gold-500 text-white px-4 py-2 rounded-full">
          <span className="text-lg font-bold">€{price}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Máx. 12 personas</span>
          </div>
        </div>

        <h3 className="text-xl font-montserrat font-bold text-slate-900 mb-2">{title}</h3>

        <p className="text-slate-600 mb-4">{description}</p>

        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 mb-2">Incluye:</h4>
          <ul className="space-y-1">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-center text-sm text-slate-600">
                <div className="w-2 h-2 bg-gold-500 rounded-full mr-2" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <Button className="w-full bg-gold-500 hover:bg-gold-600 text-white font-semibold py-3">
          Reservar Experiencia
        </Button>
      </div>
    </div>
  )
}
