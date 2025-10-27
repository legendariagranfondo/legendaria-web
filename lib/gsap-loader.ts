/**
 * GSAP Loader optimizado - Carga única para toda la aplicación
 * Evita múltiples imports y mejora performance
 */

let gsapInstance: any = null;
let scrollTriggerInstance: any = null;
let splitTextInstance: any = null;

export const loadGSAP = async () => {
  if (typeof window === 'undefined') return { gsap: null, ScrollTrigger: null, SplitText: null };
  
  if (gsapInstance) {
    return { 
      gsap: gsapInstance, 
      ScrollTrigger: scrollTriggerInstance, 
      SplitText: splitTextInstance 
    };
  }

  try {
    const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText')
    ]);

    gsap.registerPlugin(ScrollTrigger, SplitText);
    
    // Guardar instancias para reutilización
    gsapInstance = gsap;
    scrollTriggerInstance = ScrollTrigger;
    splitTextInstance = SplitText;

    return { gsap, ScrollTrigger, SplitText };
  } catch (error) {
    console.error('Error loading GSAP:', error);
    return { gsap: null, ScrollTrigger: null, SplitText: null };
  }
};

// Función para limpiar instancias si es necesario
export const cleanupGSAP = () => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.killAll();
  }
  gsapInstance = null;
  scrollTriggerInstance = null;
  splitTextInstance = null;
};
