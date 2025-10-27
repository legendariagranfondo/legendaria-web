import { Brain, Target, Users, TrendingUp } from "lucide-react"

const methodologySteps = [
  {
    step: "01",
    title: "Evaluación Inicial",
    description: "Analizamos tu nivel técnico, físico y objetivos personales para crear un plan personalizado",
    icon: <Target className="w-8 h-8" />,
    color: "bg-primary-600",
  },
  {
    step: "02",
    title: "Aprendizaje Progresivo",
    description: "Metodología step-by-step que garantiza una base sólida antes de avanzar al siguiente nivel",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "bg-primary-700",
  },
  {
    step: "03",
    title: "Práctica Dirigida",
    description: "Ejercicios específicos y situaciones reales de juego para consolidar lo aprendido",
    icon: <Users className="w-8 h-8" />,
    color: "bg-primary-800",
  },
  {
    step: "04",
    title: "Desarrollo Mental",
    description: "Trabajamos la concentración, gestión de presión y estrategia mental del juego",
    icon: <Brain className="w-8 h-8" />,
    color: "bg-gold-500",
  },
]

export default function MethodologySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-4">Nuestra Metodología</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Un sistema probado que combina técnica, táctica y desarrollo personal para resultados excepcionales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methodologySteps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 ${step.color} text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-xl text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-50 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-montserrat font-bold text-slate-900 mb-4">Resultados Garantizados</h3>
            <p className="text-lg text-slate-600 mb-6 max-w-3xl mx-auto">
              Nuestro método ha sido desarrollado y perfeccionado durante 8 años, garantizando que cada alumno alcance
              sus objetivos de forma eficiente y duradera.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-800 mb-2">95%</div>
                <div className="text-slate-600">Alumnos satisfechos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-800 mb-2">6 sem</div>
                <div className="text-slate-600">Mejora visible promedio</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-800 mb-2">100%</div>
                <div className="text-slate-600">Metodología personalizada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
