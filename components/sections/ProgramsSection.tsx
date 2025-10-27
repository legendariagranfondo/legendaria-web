import ProgramCard from "@/components/cards/ProgramCard"

const programs = [
  {
    title: "Iniciación",
    description: "Perfecto para comenzar tu aventura en el pádel con bases sólidas",
    duration: "1h",
    groupSize: "4-6 personas",
    level: "Principiante",
    price: 89,
    image: "/images/bandeja-gato-grey.png",
    features: [
      "Técnica básica de golpeos",
      "Posicionamiento en pista",
      "Reglas y estrategia básica",
      "Material incluido",
    ],
  },
  {
    title: "Perfeccionamiento",
    description: "Mejora tu técnica y táctica para llevar tu juego al siguiente nivel",
    duration: "1.5h",
    groupSize: "4-6 personas",
    level: "Intermedio",
    price: 129,
    image: "/images/bandeja-joan.jpg",
    features: ["Técnica avanzada", "Táctica de juego", "Análisis de video", "Preparación física"],
  },
  {
    title: "Competición",
    description: "Entrena como un profesional y compite en torneos de alto nivel",
    duration: "2h",
    groupSize: "2-4 personas",
    level: "Avanzado",
    price: 189,
    image: "/images/joan-padelrace.jpg",
    features: ["Entrenamiento intensivo", "Preparación mental", "Análisis táctico", "Torneos incluidos"],
  },
]

export default function ProgramsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-4">
            Nuestros <span className="text-primary-800">Programas</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Desde principiante hasta profesional, tenemos el programa perfecto para tu nivel
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={index} {...program} />
          ))}
        </div>
      </div>
    </section>
  )
}
