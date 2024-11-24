import { Navbar } from '@components/Navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-geist-sans)] min-w-full">
      <Navbar />
      <div className="bg-white mt-20 dark:bg-gray-800 min-h-screen flex flex-col justify-center items-center p-6">
        {/* Hero Section */}
        <div className="text-center animate__animated animate__fadeIn animate__delay-1s">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-6 animate__animated animate__fadeInUp animate__delay-1s">
            Bienvenido a la Gestión Eficiente de Fincas
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 animate__animated animate__fadeInUp animate__delay-1.5s">
            Nuestra plataforma le permite gestionar su finca de manera sencilla
            y eficiente, optimizando todos los procesos operativos.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 mb-8 animate__animated animate__fadeInUp animate__delay-2s">
            Mejore el rendimiento, controle el inventario, gestione empleados y
            mucho más.
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 text-white bg-accent rounded-md hover:bg-accent hover:scale-105 transition-all active:scale-95  animate__animated animate__fadeInUp animate__delay-2.5s"
          >
            Comienza Ahora
          </a>
        </div>

        {/* Feature Section */}
        <div className="mt-16 max-w-7xl w-full px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8 animate__animated animate__fadeInUp animate__delay-3s">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-3.5s">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Gestión de Inventarios
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Mantén el control total de tu inventario, gestionando productos,
                insumos y más con facilidad.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-4s">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Gestión de Empleados
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Administra de manera eficiente a tu personal, con acceso rápido
                a sus registros y tareas.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-4.5s">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Monitoreo de Actividades
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Realiza un seguimiento completo de las actividades realizadas en
                la finca para mejorar la productividad.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 p-8 bg-accent-ligth rounded-lg text-center animate__animated animate__fadeIn animate__delay-5s">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            ¿Estás listo para mejorar la gestión de tu finca?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Únete a nosotros y empieza a optimizar tu finca hoy mismo. ¡Es hora
            de tomar control!
          </p>
          <Link
            href="/api/auth/"
            className="inline-block px-6 py-3 text-white bg-accent rounded-md hover:bg-accent/80 scale-105 transition-all active:scale-95 duration-300"
          >
            ¡Regístrate Ahora!
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2024 Todos los derechos reservados. Finca Manager</p>
        </footer>
      </div>
    </main>
  )
}
