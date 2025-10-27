import { Award, Users, Target, Heart } from "lucide-react"

const milestones = [
  {
    year: "2016",
    title: "Fundación de JA Padel Academy",
    description: "Comenzamos con 2 pistas y un sueño: democratizar el pádel de calidad",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    year: "2018",
    title: "Expansión de Instalaciones",
    description: "Ampliamos a 6 pistas y añadimos zona de fitness especializada",
    icon: <Target className="w-6 h-6" />,
  },
  {
    year: "2020",
    title: "Certificación Internacional",
    description: "Nos convertimos en centro oficial de formación de entrenadores",
    icon: <Award className="w-6 h-6" />,
  },
  {
    year: "2024",
    title: "Más de 2,500 Alumnos",
    description: "Alcanzamos la cifra de 2,500 alumnos activos y 8 pistas profesionales",
    icon: <Users className="w-6 h-6" />,
  },
]

export default function HistorySection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-4">Nuestra Historia</h2>
            <p className="text-xl text-slate-600">
              Un viaje de pasión, crecimiento y excelencia en la enseñanza del pádel
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-800 text-white rounded-full flex items-center justify-center group-hover:bg-primary-900 transition-colors">
                    {milestone.icon}
                  </div>
                  {index < milestones.length - 1 && <div className="w-px h-16 bg-slate-300 mx-auto mt-4" />}
                </div>
                <div className="flex-1 pb-8">
                  <div className="bg-white rounded-lg p-6 shadow-md group-hover:shadow-lg transition-shadow">
                    <div className="text-primary-800 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="font-montserrat font-bold text-xl text-slate-900 mb-2">{milestone.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
