import { MapPin, Phone, Mail, Clock, Car, Train } from "lucide-react"

const contactInfo = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Dirección",
    info: "Calle del Pádel, 123",
    detail: "28001 Madrid, España",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Teléfono",
    info: "+34 600 123 456",
    detail: "Lunes a Domingo 7:00-23:00",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
    info: "info@japadel.com",
    detail: "Respuesta en menos de 2h",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Horarios",
    info: "7:00 - 23:00",
    detail: "Todos los días del año",
  },
]

const transportInfo = [
  {
    icon: <Car className="w-5 h-5" />,
    title: "En Coche",
    description: "Aparcamiento gratuito para 100 vehículos",
    detail: "Salida 15 de la M-30",
  },
  {
    icon: <Train className="w-5 h-5" />,
    title: "Transporte Público",
    description: "Metro línea 6 - Estación Deportes",
    detail: "Autobuses 45, 78, 156",
  },
]

export default function LocationSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-4">Visítanos</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Estamos ubicados en el corazón de Madrid, con fácil acceso y todas las comodidades
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="relative h-96 bg-slate-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">Mapa Interactivo</p>
                <p className="text-sm">Calle del Pádel, 123 - Madrid</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-montserrat font-bold text-slate-900 mb-6">Información de Contacto</h3>

            <div className="grid gap-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary-100 text-primary-800 rounded-lg">{item.icon}</div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-700 font-medium">{item.info}</p>
                      <p className="text-sm text-slate-500">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-montserrat font-semibold text-slate-900 mb-4">Cómo Llegar</h4>
              <div className="space-y-4">
                {transportInfo.map((transport, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">{transport.icon}</div>
                    <div>
                      <h5 className="font-semibold text-slate-900">{transport.title}</h5>
                      <p className="text-slate-600 text-sm">{transport.description}</p>
                      <p className="text-slate-500 text-xs">{transport.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
