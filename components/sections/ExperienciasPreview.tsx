import Link from "next/link"
import { Button } from "@/components/ui/button"
import ExperienciaCard from "@/components/cards/ExperienciaCard"

const featuredExperiences = [
  {
    title: "Pádel & Playa Marbella",
    description: "Combina entrenamiento intensivo con relajación en la Costa del Sol",
    price: 1299,
    duration: "4 días",
    rating: 4.9,
    image: "/images/mar-party.jpg",
    highlights: ["Clases con profesionales", "Hotel 5 estrellas", "Torneos exclusivos"],
  },
  {
    title: "Pádel Academy Barcelona",
    description: "Inmersión total en la cultura del pádel catalán",
    price: 899,
    duration: "3 días",
    rating: 4.8,
    image: "/images/torneo-navidad.jpg",
    highlights: ["Visita clubs premium", "Masterclass técnica", "Networking"],
  },
]

export default function ExperienciasPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-4">
            Experiencias <span className="text-gold-500">Premium</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Vive aventuras inolvidables que combinan pádel de élite con experiencias premium
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredExperiences.map((experience, index) => (
            <ExperienciaCard key={index} {...experience} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/experiencias">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4">
              Ver Todas las Experiencias
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
