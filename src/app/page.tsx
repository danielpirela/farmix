import { Button } from '@components/form/Button'
import { Navbar } from '@components/Navbar'
import { Milk, Users, ArrowRight, Leaf, BarChart3, Clock } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white dark:to-gray-900 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1597432480301-a3b64410d898?auto=format&fit=crop&q=80&w=3540")',
            transform: 'scale(1.1)'
          }}
        />
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-7xl sm:text-8xl font-bold mb-6 tracking-tight text-white">
            Farmix
          </h1>
          <p className="text-2xl sm:text-3xl font-medium text-gray-100 mb-8">
            El futuro de la gestión lechera.
          </p>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-[#007A4D] rounded-lg hover:bg-[#007A4D]/90 hover:scale-105 transition-all duration-300"
          >
            Descubrir más
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              Innovación en cada detalle
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Una nueva era en la gestión de fincas lecheras, diseñada para la
              excelencia.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[16/9]   rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/889shots_so.png"
                alt="Dashboard"
                className="w-full h-full object-fill"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white dark:bg-gray-900" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Control de Producción',
                description:
                  'Seguimiento detallado de la producción láctea diaria y análisis de rendimiento.',
                icon: BarChart3
              },
              {
                title: 'Gestión de Personal',
                description:
                  'Administre eficientemente los horarios y tareas de sus empleados.',
                icon: Users
              },
              {
                title: 'Monitoreo en Tiempo Real',
                description:
                  'Acceda a datos actualizados de su operación desde cualquier dispositivo.',
                icon: Clock
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
              >
                <feature.icon className="h-12 w-12 text-[#007A4D] mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-[#A3D8A8]/20 dark:bg-[#007A4D]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            El momento es ahora
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Únase a la revolución en gestión de fincas lecheras y transforme su
            operación.
          </p>
          {/* <Button className="flex flex-col items-center justify-center text-lg font-medium text-white rounded-lg  transition-all duration-300">
            <div className="flex items-center gap-1 py-4 px-6 ">
              <span>Comenzar Ahora</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </Button> */}
        </div>
        <div className="absolute left-0 top-0 -z-10">
          <Leaf className="h-64 w-64 text-[#007A4D]/5" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Milk className="h-8 w-8 text-[#007A4D] mb-4" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; 2024 Farmix. Todos los derechos reservados.
              </p>
            </div>
            {/*    <div className="flex flex-wrap gap-6 md:justify-end">
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#007A4D] dark:hover:text-[#A3D8A8] transition-colors"
              >
                Términos y condiciones
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#007A4D] dark:hover:text-[#A3D8A8] transition-colors"
              >
                Política de privacidad
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#007A4D] dark:hover:text-[#A3D8A8] transition-colors"
              >
                Contacto
              </a>
            </div> */}
          </div>
        </div>
      </footer>
    </main>
  )
}
