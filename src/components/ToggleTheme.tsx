'use client'
import { useTheme } from '@hooks/useTheme' // Importamos el custom hook

export function ToggleTheme() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
        className="sr-only" // Ocultamos el input real
      />
      <span
        className={`w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out ${
          isDarkMode ? 'bg-accent' : 'bg-gray-300'
        }`}
      >
        <span
          className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out transform ${
            isDarkMode ? 'translate-x-5' : 'translate-x-1'
          }`}
        ></span>
      </span>
    </label>
  )
}
