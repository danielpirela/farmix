import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface DropdownProps {
  title: string
  children: React.ReactNode
}

export const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-w-full mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-lg font-medium text-gray-800">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ${isOpen ? 'animate-fade-down' : 'animate-fade-up'}`}
      >
        {isOpen && children}
      </div>
    </div>
  )
}
