'use client'

import { useSession } from 'next-auth/react'
import { ItemMenu } from './ItemMenu'
import {
  ActivitiesIcon,
  DashboardIcon,
  EmployeesIcon,
  InventoryIcon,
  MoneyIcon,
  SupliersIcon
} from './icons/DashboardIcon'
import { AuthButton } from './auth/AuthButton'

import { usePathname } from 'next/navigation'

const URLS = {
  dashboard: '/dashboard',
  activities: '/dashboard/employees/activities',
  inbox: '/inbox',
  employees: '/dashboard/employees',
  products: '/products',
  logout: '/logout'
}

export function Aside({ state }: { state: boolean }) {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <aside
      className={`fixed top-20 left-0 z-10 w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-out transform ${state ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="h-full overflow-y-auto px-3 py-4">
        <ul className="font-medium space-y-4">
          <ItemMenu uri={URLS.employees}>
            <DashboardIcon />
            <span
              className={`${pathname === URLS.employees ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Dashboard
            </span>
          </ItemMenu>
          <ItemMenu uri={URLS.employees}>
            <EmployeesIcon />
            <span
              className={`${pathname === URLS.employees ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Trabajadores
            </span>
          </ItemMenu>
          <ItemMenu uri={URLS.employees}>
            <MoneyIcon />
            <span
              className={`${pathname === URLS.employees ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Finanzas
            </span>
          </ItemMenu>
          <ItemMenu uri={URLS.employees}>
            <InventoryIcon />
            <span
              className={`${pathname === URLS.employees ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Inventario
            </span>
          </ItemMenu>
          <ItemMenu uri={URLS.activities}>
            <ActivitiesIcon />
            <span
              className={`${pathname === URLS.activities ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Actividades
            </span>
          </ItemMenu>
          <ItemMenu uri={URLS.employees}>
            <SupliersIcon />
            <span
              className={`${pathname === URLS.employees ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Proveedores
            </span>
          </ItemMenu>
          <AuthButton
            className="flex min-w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            session={session}
            withImage={false}
          >
            Cerrar session
          </AuthButton>
        </ul>
      </div>
    </aside>
  )
}
