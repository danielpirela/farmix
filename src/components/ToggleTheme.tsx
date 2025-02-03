'use client'
import { useTheme } from '@hooks/useTheme' // Importamos el custom hook
import { Moon, Sun } from 'lucide-react'

export function ToggleTheme({ isScrolled }: { isScrolled: boolean }) {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`z-50 p-2 bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:scale-110 transition-all duration-300 ${isScrolled ? 'bg-white/10' : ' dark:bg-gray-800/90'}`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-white" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800" />
      )}
    </button>
  )
}
