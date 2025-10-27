"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Users, Target } from "lucide-react"

interface ProgramCardProps {
  title: string
  description: string
  duration: string
  groupSize: string
  level: string
  price: number
  image: string
  features: string[]
}

export default function ProgramCard({
  title,
  description,
  duration,
  groupSize,
  level,
  price,
  image,
  features,
}: ProgramCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 hover:scale-105 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4 bg-brand-gold text-brand-black px-3 py-1 rounded-full text-sm font-semibold">
          {level}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-clash font-bold text-brand-black mb-2">{title}</h3>
        <p className="text-slate-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{groupSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <span>{level}</span>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-cement-600">
              <div className="w-2 h-2 bg-brand-gold rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-brand-black">
            €{price}
            <span className="text-sm font-normal text-cement-500">/mes</span>
          </div>
          <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold group-hover:shadow-lg transition-all">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  )
}
