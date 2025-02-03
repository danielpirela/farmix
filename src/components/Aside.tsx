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
import { useState } from 'react'

const URLS = {
  dashboard: '/dashboard',
  activities: '/dashboard/employees/activities',
  animals: '/dashboard/admin/animals',
  finances: {
    index: '/dashboard/admin/finances',
    reports: '/dashboard/admin/finances/reports',
    isOpen: false
  },
  inventory: '/dashboard/admin/inventory',
  employees: {
    index: '/dashboard/employees',
    reports: '/dashboard/employees/reports',
    certificates: '/dashboard/employees/certificates',
    isOpen: false
  },
  suppliers: '/dashboard/admin/suppliers',
  animalReports: '/dashboard/admin/animals/reports'
}

export function Aside({ state }: { state: boolean }) {
  const { data: session } = useSession()
  const [menuState, setMenuState] = useState({
    dashboard: '/dashboard',
    activities: '/dashboard/employees/activities',
    animals: '/dashboard/admin/animals',
    finances: {
      index: '/dashboard/admin/finances',
      reports: '/dashboard/admin/finances/reports',
      isOpen: false
    },
    inventory: '/dashboard/admin/inventory',
    employees: {
      index: '/dashboard/employees',
      reports: '/dashboard/employees/reports',
      certificates: '/dashboard/employees/certificates',
      isOpen: false
    },
    suppliers: '/dashboard/admin/suppliers',
    animalReports: '/dashboard/admin/animals/reports',
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
              <>
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
                <ItemMenu
                  uri={URLS.employees.certificates}
                  className="animate-fade-down duration-300 delay-150 transition-all"
                >
                  <span
                    className={`${pathname === URLS.employees.certificates ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
                  >
                    Constancias
                  </span>
                </ItemMenu>
              </>
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
          <div>
            <div className="flex gap-1 justify-start items-center">
              <ItemMenu uri={URLS.finances.index}>
                <MoneyIcon />
                <span
                  className={`${pathname === URLS.finances.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
                >
                  Finanzas
                </span>
              </ItemMenu>
              <button
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 dark:hover:bg-gray-700 group"
                onClick={() =>
                  setMenuState((prev) => ({
                    ...prev,
                    finances: {
                      ...prev.finances,
                      isOpen: !prev.finances.isOpen
                    }
                  }))
                }
              >
                <ArrowDown />
              </button>
            </div>
            {menuState.finances.isOpen && (
              <ItemMenu
                uri={URLS.finances.reports}
                className="animate-fade-down duration-300 delay-150 transition-all"
              >
                <span
                  className={`${pathname === URLS.finances.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300`}
                >
                  Reportes
                </span>
              </ItemMenu>
            )}
          </div>
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
