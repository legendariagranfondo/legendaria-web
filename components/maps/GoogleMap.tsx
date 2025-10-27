"use client"

import { useEffect, useRef } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"
import { MapPin } from "lucide-react"
import { GOOGLE_MAPS_CONFIG, ORIGEN_PADEL_LOCATION } from "@/lib/config"

interface GoogleMapProps {
  apiKey: string
  className?: string
  height?: string
}

// Componente del mapa
function MapComponent() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: GOOGLE_MAPS_CONFIG.defaultCenter,
        zoom: GOOGLE_MAPS_CONFIG.defaultZoom,
        mapTypeId: "roadmap",
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
        styles: [
          // Estilo personalizado que combine con el diseño del sitio
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ color: "#f8fafc" }],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#3b82f6" }],
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      // Crear marcador personalizado
      const marker = new window.google.maps.Marker({
        position: ORIGEN_PADEL_LOCATION,
        map,
        title: ORIGEN_PADEL_LOCATION.title,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#1e40af", // primary-800 color
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        },
      })

      // Crear InfoWindow personalizada
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-4 max-w-sm">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-gray-900">${ORIGEN_PADEL_LOCATION.title}</h4>
                <p class="text-gray-600 text-sm">Club Premium de Pádel</p>
              </div>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2 text-gray-600">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>${ORIGEN_PADEL_LOCATION.hours}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>${ORIGEN_PADEL_LOCATION.phone}</span>
              </div>
            </div>
            <button 
              onclick="window.open('https://maps.google.com/?q=${ORIGEN_PADEL_LOCATION.lat},${ORIGEN_PADEL_LOCATION.lng}', '_blank')"
              class="mt-3 w-full bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors"
            >
              Ver en Google Maps
            </button>
          </div>
        `,
      })

      // Mostrar InfoWindow al hacer clic en el marcador
      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })

      // Centrar el mapa en la ubicación del marcador
      map.setCenter(ORIGEN_PADEL_LOCATION)
    }
  }, [])

  return <div ref={ref} className="w-full h-full" />
}

// Componente principal con Wrapper
export default function GoogleMap({ apiKey, className = "", height = "h-[600px]" }: GoogleMapProps) {
  const render = (status: any) => {
    switch (status) {
      case "LOADING":
        return (
          <div className={`${height} bg-slate-200 rounded-3xl overflow-hidden shadow-2xl ${className}`}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary-800 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-600">Cargando mapa...</p>
              </div>
            </div>
          </div>
        )
      case "FAILURE":
        return (
          <div className={`${height} bg-slate-200 rounded-3xl overflow-hidden shadow-2xl ${className}`}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-slate-500 p-6">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">Error al cargar Google Maps</p>
                <p className="text-sm mb-4">Necesitas habilitar la Maps JavaScript API</p>
                <div className="bg-white rounded-lg p-4 text-xs text-left">
                  <p className="font-semibold mb-2">Pasos para solucionarlo:</p>
                  <ol className="space-y-1 text-slate-600">
                    <li>1. Ve a console.cloud.google.com</li>
                    <li>2. Habilita "Maps JavaScript API"</li>
                    <li>3. Configura facturación</li>
                    <li>4. Añade restricciones de dominio</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )
      case "SUCCESS":
        return (
          <div className={`${height} rounded-3xl overflow-hidden shadow-2xl ${className}`}>
            <MapComponent />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Wrapper apiKey={apiKey} render={render} libraries={["places"]}>
      <MapComponent />
    </Wrapper>
  )
}

// Componente de fallback para cuando no hay API key
export function GoogleMapFallback({ className = "", height = "h-[600px]" }: Omit<GoogleMapProps, "apiKey">) {
  return (
    <div className={`${height} bg-slate-200 rounded-3xl overflow-hidden shadow-2xl ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center text-slate-500">
        <div className="text-center">
          <MapPin className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg font-semibold">Mapa Interactivo</p>
          <p className="text-sm">Origen Padel Valencia</p>
          <p className="text-xs mt-2 text-slate-400">Configura Google Maps API para ver el mapa</p>
        </div>
      </div>
    </div>
  )
}
