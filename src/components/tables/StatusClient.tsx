import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface CustomClasses {
  [key: string]: boolean
}

export function StatusClient({ children }: Props) {
  const customClassesFather: CustomClasses = {
    'bg-green-100 text-green-800 ': children === 'Activo',
    'dark:bg-green-900 text-green-300 ': children === 'Activo',

    'bg-red-100 text-red-800': children === 'Inactivo',
    'dark:bg-red-900 text-red-300': children === 'Inactivo'
  }

  const customClassesSon: CustomClasses = {
    'bg-green-500': children === 'Activo',
    'bg-red-400': children === 'Inactivo'
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
