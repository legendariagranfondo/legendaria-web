import { Check, X } from "lucide-react"

interface Program {
  title: string
  level: string
  price: number
  duration: string
  groupSize: string
  features: string[]
}

interface ProgramComparisonProps {
  programs: Program[]
}

const comparisonFeatures = [
  "Técnica básica",
  "Táctica avanzada",
  "Análisis de video",
  "Preparación física",
  "Torneos incluidos",
  "Seguimiento personalizado",
  "Material incluido",
  "Horarios flexibles",
]

export default function ProgramComparison({ programs }: ProgramComparisonProps) {
  const hasFeature = (program: Program, feature: string) => {
    return program.features.some((f) => f.toLowerCase().includes(feature.toLowerCase().split(" ")[0]))
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-clash font-bold text-brand-black mb-4">
            Comparativa de Programas
          </h2>
          <p className="text-xl text-cement-600 max-w-3xl mx-auto">
            Encuentra el programa que mejor se adapte a tus necesidades y objetivos
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead className="bg-brand-black text-brand-white">
              <tr>
                <th className="px-6 py-4 text-left font-clash font-semibold">Características</th>
                {programs.map((program, index) => (
                  <th key={index} className="px-6 py-4 text-center font-clash font-semibold min-w-[150px]">
                    <div className="space-y-2">
                      <div className="text-lg">{program.title}</div>
                      <div className="text-brand-gold text-sm">{program.level}</div>
                      <div className="text-2xl font-bold">€{program.price}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-cement-200">
                <td className="px-6 py-4 font-medium text-cement-700">Duración</td>
                {programs.map((program, index) => (
                  <td key={index} className="px-6 py-4 text-center text-cement-600">
                    {program.duration}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-cement-200 bg-cement-50">
                <td className="px-6 py-4 font-medium text-cement-700">Tamaño del grupo</td>
                {programs.map((program, index) => (
                  <td key={index} className="px-6 py-4 text-center text-cement-600">
                    {program.groupSize}
                  </td>
                ))}
              </tr>
              {comparisonFeatures.map((feature, featureIndex) => (
                <tr
                  key={featureIndex}
                  className={`border-b border-cement-200 ${featureIndex % 2 === 0 ? "bg-cement-50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 font-medium text-cement-700">{feature}</td>
                  {programs.map((program, programIndex) => (
                    <td key={programIndex} className="px-6 py-4 text-center">
                      {hasFeature(program, feature) ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-cement-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
