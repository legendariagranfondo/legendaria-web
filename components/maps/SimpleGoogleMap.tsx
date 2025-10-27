"use client"

interface SimpleGoogleMapProps {
  className?: string
  height?: string
}

// Versión simple SIN API KEY - funciona inmediatamente
export default function SimpleGoogleMap({ className = "", height = "h-[400px] md:h-[600px]" }: SimpleGoogleMapProps) {
  // Coordenadas de Origen Padel Club
  const lat = 39.52161
  const lng = -0.47234
  const address = "Carrer Ciutat d'Ontinyent, 10, 46980 Paterna, Valencia"
  
  return (
    <div className={`${height} w-full overflow-hidden shadow-2xl ${className}`}>
      {/* Usar Google Maps sin API key - funciona inmediatamente */}
      <iframe
        src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=15`}
        width="100%"
        height="100%"
        style={{ border: 0, maxWidth: '100%' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Origen Padel Club Valencia"
      />
    </div>
  )
}
