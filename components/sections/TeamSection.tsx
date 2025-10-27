import Image from "next/image"
import { Award, Star } from "lucide-react"

const coaches = [
  {
    name: "Juan Antonio Pérez",
    role: "Director Técnico",
    specialization: "Competición y Alto Rendimiento",
    experience: "Elite Coach",
    certifications: ["Entrenador Nacional", "Preparador Físico", "Psicología Deportiva"],
    achievements: ["Ex-jugador profesional", "Entrenador de 5 campeones nacionales"],
    image: "/images/jordi.jpeg",
    rating: 4.9,
  },
  {
    name: "María González",
    role: "Entrenadora Senior",
    specialization: "Técnica y Perfeccionamiento",
    experience: "12+ años",
    certifications: ["Entrenadora Nacional", "Especialista en Biomecánica"],
    achievements: ["Mejor entrenadora 2023", "200+ alumnos formados"],
    image: "/images/luis_gandassegui.jpeg",
    rating: 4.8,
  },
  {
    name: "Carlos Ruiz",
    role: "Entrenador Especialista",
    specialization: "Iniciación y Pádel Kids",
    experience: "8+ años",
    certifications: ["Entrenador Autonómico", "Monitor Deportivo Infantil"],
    achievements: ["Especialista en metodología infantil", "Creador programa Kids"],
    image: "/images/guille.jpg",
    rating: 4.9,
  },
  {
    name: "Ana Martín",
    role: "Preparadora Física",
    specialization: "Acondicionamiento y Prevención",
    experience: "10+ años",
    certifications: ["Licenciada en CCAFD", "Especialista en Lesiones Deportivas"],
    achievements: ["Fisioterapeuta deportiva", "Experta en readaptación"],
    image: "/images/gato.jpg",
    rating: 4.7,
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-4">
            Nuestro Equipo de <span className="text-primary-800">Profesionales</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Entrenadores certificados con años de experiencia y pasión por enseñar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={coach.image || "/placeholder.svg"}
                  alt={coach.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{coach.rating}</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-lg">{coach.name}</h3>
                  <p className="text-gold-400 text-sm font-medium">{coach.role}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 mb-1">Especialización</h4>
                  <p className="text-sm text-slate-600">{coach.specialization}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 mb-1">Experiencia</h4>
                  <p className="text-sm text-slate-600">{coach.experience}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Certificaciones</h4>
                  <div className="space-y-1">
                    {coach.certifications.map((cert, certIndex) => (
                      <div key={certIndex} className="flex items-center text-xs text-slate-600">
                        <Award className="w-3 h-3 text-primary-800 mr-1" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Logros</h4>
                  <div className="space-y-1">
                    {coach.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center text-xs text-slate-600">
                        <div className="w-2 h-2 bg-primary-800 rounded-full mr-2" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-montserrat font-bold text-center text-slate-900 mb-8">
            Nuestro Equipo en Números
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">15+</div>
              <div className="text-slate-600">Entrenadores Certificados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">120+</div>
              <div className="text-slate-600">Años de Experiencia Combinada</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">2500+</div>
              <div className="text-slate-600">Alumnos Formados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">4.8</div>
              <div className="text-slate-600">Valoración Media</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
