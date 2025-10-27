"use client"

import { useEffect } from "react"

export default function ForceDarkHeader() {
  useEffect(() => {
    const el = document.documentElement
    el.classList.add("force-dark-header")
    return () => {
      el.classList.remove("force-dark-header")
    }
  }, [])
  return null
}


