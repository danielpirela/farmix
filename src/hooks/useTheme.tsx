'use client'
import { useState, useEffect } from 'react'

// Custom Hook para el manejo del tema
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Función para cambiar el modo
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Verificar el estado del tema al cargar la página
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Guardar el tema seleccionado en localStorage
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return { isDarkMode, toggleTheme }
}
