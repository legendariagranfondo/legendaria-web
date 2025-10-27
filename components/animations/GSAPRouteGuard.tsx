"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function GSAPRouteGuard() {
  const pathname = usePathname()

  useEffect(() => {
    const run = async () => {
      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        ScrollTrigger.getAll().forEach(t => t.kill())
      } catch {}
    }
    run()
  }, [pathname])

  return null
}


