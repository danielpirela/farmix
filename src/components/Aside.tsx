'use client'

import { useSession } from 'next-auth/react'
import { ItemMenu } from './ItemMenu'
import {
  ActivitiesIcon,
  ArrowDown,
  DashboardIcon,
  EmployeesIcon,
  InventoryIcon,
  MoneyIcon,
  SupliersIcon
} from './icons/DashboardIcon'
import { AuthButton } from './auth/AuthButton'

import { usePathname } from 'next/navigation'
import { constructor, useState } from 'react'

const URLS = {
  dashboard: '/dashboard',
  activities: '/dashboard/employees/activities',
  animals: '/dashboard/admin/animals',
  finances: '/dashboard/admin/finances',
  inventory: '/dashboard/admin/inventory',
  employees: {
    index: '/dashboard/employees',
    reports: '/dashboard/employees/reports',
    isOpen: false
  },
  suppliers: '/dashboard/admin/suppliers',
  animalReports: '/dashboard/admin/animals/reports',
  employeesReports: '/dashboard/employees/reports',
  financesReports: '/dashboard/admin/finances/reports',
  logout: '/logout'
}

export function Aside({ state }: { state: boolean }) {
  const { data: session } = useSession()
  const [menuState, setMenuState] = useState({
    dashboard: '/dashboard',
    activities: '/dashboard/employees/activities',
    animals: '/dashboard/admin/animals',
    finances: '/dashboard/admin/finances',
    inventory: '/dashboard/admin/inventory',
    employees: {
      index: '/dashboard/employees',
      reports: '/dashboard/employees/reports',
      isOpen: false
    },
    suppliers: '/dashboard/admin/suppliers',
    animalReports: '/dashboard/admin/animals/reports',
    employeesReports: '/dashboard/employees/reports',
    financesReports: '/dashboard/admin/finances/reports',
    logout: '/logout'
  })

  const pathname = usePathname()

  return (
    <aside
      className={`fixed top-20 left-0 z-10 w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-out transform ${state ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="h-full overflow-y-auto px-3 py-4">
        <ul className="font-medium space-y-4">
          <ItemMenu uri={URLS.employees.index}>
            <DashboardIcon />
            <span
              className={`${pathname === URLS.employees.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Dashboard
            </span>
          </ItemMenu>
          <div>
            <div className="flex gap-1 justify-start items-center">
              <ItemMenu uri={URLS.employees.index}>
                <EmployeesIcon />
                <span
                  className={`${pathname === URLS.employees.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
                >
                  Trabajadores
                </span>
              </ItemMenu>
              <button
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 dark:hover:bg-gray-700 group"
                onClick={() =>
                  setMenuState((prev) => ({
                    ...prev,
                    employees: {
                      ...prev.employees,
                      isOpen: !prev.employees.isOpen
                    }
                  }))
                }
              >
                <ArrowDown />
              </button>
            </div>
            {menuState.employees.isOpen && (
              <ItemMenu
                uri={URLS.employees.reports}
                className="animate-fade-down duration-300 delay-150 transition-all"
              >
                <span
                  className={`${pathname === URLS.employees.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
                >
                  Reportes
                </span>
              </ItemMenu>
            )}
          </div>
          <ItemMenu uri={URLS.animals}>
            <EmployeesIcon />
            <span
              className={`${pathname === URLS.animals ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Animales
            </span>
          </ItemMenu>
          <ItemMenu uri={URLS.finances}>
            <MoneyIcon />
            <span
              className={`${pathname === URLS.finances ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Finanzas
            </span>
          </ItemMenu>
          <ItemMenu uri={URLS.inventory}>
            <InventoryIcon />
            <span
              className={`${pathname === URLS.inventory ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
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
          <ItemMenu uri={URLS.suppliers}>
            <SupliersIcon />
            <span
              className={`${pathname === URLS.suppliers ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Proveedores
            </span>
          </ItemMenu>
          <ItemMenu uri={URLS.animalReports}>
            <SupliersIcon />
            <span
              className={`${pathname === URLS.animalReports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Reportes de Animales
            </span>
          </ItemMenu>
          <ItemMenu uri={URLS.financesReports}>
            <SupliersIcon />
            <span
              className={`${pathname === URLS.financesReports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
            >
              Reportes de Finanzas
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
