// Configuración de Google Maps
export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyABRA7dHLDp6pdEyMT_rpKpeCFnMM6N4_0",
  defaultCenter: { lat: 39.52161, lng: -0.47234 }, // Origen Padel Club, Paterna
  defaultZoom: 15,
}

// Verificar si Google Maps está configurado
export const isGoogleMapsConfigured = () => {
  return !!GOOGLE_MAPS_CONFIG.apiKey && GOOGLE_MAPS_CONFIG.apiKey !== ""
}

// Coordenadas de Origen Padel Club
export const ORIGEN_PADEL_LOCATION = {
  lat: 39.52161, // Ubicación real en Paterna
  lng: -0.47234, // Ubicación real en Paterna
  title: "Origen Padel Club",
  address: "Carrer Ciutat d'Ontinyent, 10, 46980 Paterna, Valencia",
  phone: "+34 961 34 46 73",
  hours: "7:00 - 23:00",
  website: "https://www.origenpadelclub.es",
}
