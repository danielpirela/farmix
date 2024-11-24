'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface AlertToastProps {
  children: React.ReactNode
  code?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  href?: string
  message?: string
}

export function AlertToast({
  children,
  code = 'info',
  duration = 10000,
  href,
  message
}: AlertToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timeout = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => setIsVisible(false), 300)
    }, duration)

    return () => clearTimeout(timeout)
  }, [duration])

  const colorClasses = {
    success: 'bg-green-50 text-green-400 ',
    error: 'bg-red-50 text-red-400',
    info: 'bg-blue-50 text-blue-400',
    warning: 'bg-yellow-50 text-yellow-400 '
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center p-4 mb-4 rounded-lg animate-fade-left animate-once animate-duration-300 animate-delay-100 dark:bg-gray-800 ${colorClasses[code]} ${isExiting ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}
    >
      <svg
        className={`flex-shrink-0 w-4 h-4 ${colorClasses[code]}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className={`ms-3 text-sm font-medium ${colorClasses[code]}`}>
        {href && (
          <Link href={href} className={`underline ${colorClasses[code]}`}>
            {` ${children}, ${message}`}
          </Link>
        )}
        {children}
      </div>
      <button
        onClick={() => {
          setIsExiting(true)
          setTimeout(() => setIsVisible(false), 300)
        }}
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700 hover:scale-105 active:scale-95 ${colorClasses[code]}`}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  )
}
