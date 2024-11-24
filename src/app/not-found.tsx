import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-white dark:bg-gray-900">
      <h1 className="text-9xl font-bold text-gray-200 animate-pulse">404</h1>
      <p className="text-xl mt-4 mb-8 text-gray-400">Página no encontrada</p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent text-white rounded-lg transition-all hover:bg-accent-ligth hover:-translate-y-1"
      >
        Volver al inicio
      </Link>
    </main>
  )
}
