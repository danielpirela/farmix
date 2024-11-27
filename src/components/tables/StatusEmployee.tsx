import { ReactNode } from 'react'
interface Props {
  children: ReactNode
}
interface CustomClasses {
  [key: string]: boolean
}

export function StatusEmployee({ children }: Props) {
  const customClassesFather: CustomClasses = {
    'bg-blue-100 text-blue-800 ': children === 'Trabajando',
    'dark:bg-blue-900 text-blue-300 ': children === 'Trabajando',

    'bg-blue-100 text-blue-800': children === 'En progreso',
    'dark:bg-blue-900 text-blue-300': children === 'En progreso',

    'bg-yellow-100 text-yellow-800': children === 'Descansando',
    'dark:bg-yellow-900 dark:text-yellow-300': children === 'Descansando',

    'bg-green-100 text-green-800': children === 'Disponible',
    'dark:bg-green-900 dark:text-green-300': children === 'Disponible',

    'bg-green-100 text-green-800 ': children === 'Terminada',
    'dark:bg-green-900 dark:text-green-300 ': children === 'Terminada',

    'bg-red-100 text-red-800': children === 'No disponible',
    'dark:bg-red-900 dark:text-red-300': children === 'No disponible'
  }

  const customClassesSon: CustomClasses = {
    'bg-blue-500': children === 'Trabajando',
    'bg-blue-400': children === 'En progreso',

    'bg-yellow-500': children === 'Descansando',

    'bg-green-500': children === 'Disponible',
    'bg-green-500 ': children === 'Terminada',

    'bg-red-500': children === 'No disponible'
  }

  const classNameFather =
    Object.keys(customClassesFather).find((key) => customClassesFather[key]) ??
    'bg-gray-100 text-gray-800'

  const classNameSon =
    Object.keys(customClassesSon).find((key) => customClassesSon[key]) ??
    'bg-gray-100 text-gray-800'

  return (
    <span
      className={`inline-flex items-center ${classNameFather} text-xs font-medium px-2.5 py-0.5 rounded-full`}
    >
      <span className={`w-2 h-2 me-1 rounded-full ${classNameSon}`}></span>
      {children}
    </span>
  )
}
