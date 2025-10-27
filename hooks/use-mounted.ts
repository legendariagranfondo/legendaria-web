"use client"

import { useState, useEffect } from 'react'

/**
 * Hook para evitar problemas de hidratación
 * Retorna true solo cuando el componente está montado en el cliente
 */
export function useMounted() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
