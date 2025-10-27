import { Target, Users, Trophy, Heart, Brain, Zap } from "lucide-react"

const benefits = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Objetivos Claros",
    description: "Cada programa tiene metas específicas y medibles para tu progreso",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Grupos Reducidos",
    description: "Máximo 6 personas por grupo para atención personalizada",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Metodología Probada",
    description: "Sistema de enseñanza desarrollado por entrenadores de élite con metodología propia",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Ambiente Positivo",
    description: "Entorno motivador que fomenta el aprendizaje y la diversión",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Desarrollo Integral",
    description: "Trabajamos técnica, táctica, física y aspectos mentales del juego",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Progreso Acelerado",
    description: "Metodología optimizada para resultados visibles en pocas semanas",
  },
]

export default function ProgramBenefits() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-clash font-bold text-brand-black mb-4">
            ¿Por Qué Elegir Nuestros Programas?
          </h2>
          <p className="text-xl text-cement-600 max-w-3xl mx-auto">
            Cada detalle está pensado para maximizar tu aprendizaje y disfrute del pádel
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full mb-4 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-clash font-bold text-brand-black mb-2">{benefit.title}</h3>
              <p className="text-cement-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
