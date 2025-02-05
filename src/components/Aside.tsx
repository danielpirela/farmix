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
  animals: {
    index: '/dashboard/admin/animals',
    reports: '/dashboard/admin/animals/reports',
    isOpen: false
  },
  finances: {
    index: '/dashboard/admin/finances',
    reports: '/dashboard/admin/finances/reports',
    isOpen: false
  },
  inventory: {
    index: '/dashboard/admin/inventory',
    reports: '/dashboard/admin/inventory/reports',
    decrease: '/dashboard/admin/inventory/decrease',
    isOpen: false
  },
  employees: {
    index: '/dashboard/employees',
    reports: '/dashboard/employees/reports',
    certificates: '/dashboard/employees/certificates',
    activities: '/dashboard/employees/activities',
    isOpen: false
  },
  suppliers: {
    index: '/dashboard/admin/suppliers',
    reports: '/dashboard/admin/suppliers/reports',
    isOpen: false
  },
  clients: {
    index: '/dashboard/admin/clients',
    reports: '/dashboard/admin/clients/reports',
    isOpen: false
  }
}

export function Aside({ state }: { state: boolean }) {
  const { data: session } = useSession()
  const [menuState, setMenuState] = useState({
    dashboard: '/dashboard',
    animals: {
      index: '/dashboard/admin/animals',
      reports: '/dashboard/admin/animals/reports',
      isOpen: false
    },
    finances: {
      index: '/dashboard/admin/finances',
      reports: '/dashboard/admin/finances/reports',
      isOpen: false
    },
    inventory: {
      index: '/dashboard/admin/inventory',
      reports: '/dashboard/admin/inventory/reports',
      decrease: '/dashboard/admin/inventory/decrease',
      isOpen: false
    },
    employees: {
      index: '/dashboard/employees',
      reports: '/dashboard/employees/reports',
      certificates: '/dashboard/employees/certificates',
      activities: '/dashboard/employees/activities',
      isOpen: false
    },
    suppliers: {
      index: '/dashboard/admin/suppliers',
      reports: '/dashboard/admin/suppliers/reports',
      isOpen: false
    },
    clients: {
      index: '/dashboard/admin/clients',
      reports: '/dashboard/admin/clients/reports',
      isOpen: false
    },
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
              className={`${pathname === URLS.employees.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
            >
              Dashboard
            </span>
          </ItemMenu>
          <div>
            <div className="flex gap-1 justify-start items-center">
              <ItemMenu uri={URLS.employees.index}>
                <EmployeesIcon />
                <span
                  className={`${pathname === URLS.employees.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
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
                    className={`${pathname === URLS.employees.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                  >
                    Reportes
                  </span>
                </ItemMenu>
                <ItemMenu
                  uri={URLS.employees.certificates}
                  className="animate-fade-down duration-300 delay-150 transition-all"
                >
                  <span
                    className={`${pathname === URLS.employees.certificates ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                  >
                    Constancias
                  </span>
                </ItemMenu>
                <ItemMenu uri={URLS.employees.activities}>
                  <span
                    className={`${pathname === URLS.employees.activities ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                  >
                    Actividades
                  </span>
                </ItemMenu>
              </>
            )}
          </div>
          <div>
            <div className="flex gap-1 justify-start items-center">
              <ItemMenu uri={URLS.animals.index}>
                <MoneyIcon />
                <span
                  className={`${pathname === URLS.animals.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                >
                  Animales
                </span>
              </ItemMenu>
              <button
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 dark:hover:bg-gray-700 group"
                onClick={() =>
                  setMenuState((prev) => ({
                    ...prev,
                    animals: {
                      ...prev.animals,
                      isOpen: !prev.animals.isOpen
                    }
                  }))
                }
              >
                <ArrowDown />
              </button>
            </div>
            {menuState.animals.isOpen && (
              <ItemMenu
                uri={URLS.animals.reports}
                className="animate-fade-down duration-300 delay-150 transition-all"
              >
                <span
                  className={`${pathname === URLS.animals.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                >
                  Reportes
                </span>
              </ItemMenu>
            )}
          </div>

          <div>
            <div className="flex gap-1 justify-start items-center">
              <ItemMenu uri={URLS.finances.index}>
                <MoneyIcon />
                <span
                  className={`${pathname === URLS.finances.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
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
                  className={`${pathname === URLS.finances.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                >
                  Reportes
                </span>
              </ItemMenu>
            )}
          </div>
          <div className="flex gap-1 justify-start items-center">
            <ItemMenu uri={URLS.inventory.index}>
              <InventoryIcon />
              <span
                className={`${pathname === URLS.inventory.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
              >
                Inventario
              </span>
            </ItemMenu>
            <button
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 dark:hover:bg-gray-700 group"
              onClick={() =>
                setMenuState((prev) => ({
                  ...prev,
                  inventory: {
                    ...prev.inventory,
                    isOpen: !prev.inventory.isOpen
                  }
                }))
              }
            >
              <ArrowDown />
            </button>
          </div>
          <div>
            {menuState.inventory.isOpen && (
              <>
                <ItemMenu
                  uri={URLS.inventory.decrease}
                  className="animate-fade-down duration-300 delay-150 transition-all"
                >
                  <span
                    className={`${pathname === URLS.inventory.decrease ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                  >
                    Descargo
                  </span>
                </ItemMenu>
                <ItemMenu
                  uri={URLS.inventory.reports}
                  className="animate-fade-down duration-300 delay-150 transition-all"
                >
                  <span
                    className={`${pathname === URLS.inventory.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                  >
                    Reportes
                  </span>
                </ItemMenu>
              </>
            )}
          </div>

          <div className="flex gap-1 justify-start items-center">
            <ItemMenu uri={URLS.suppliers.index}>
              <SupliersIcon />
              <span
                className={`${pathname === URLS.suppliers.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
              >
                Proveedores
              </span>
            </ItemMenu>
            <button
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 dark:hover:bg-gray-700 group"
              onClick={() =>
                setMenuState((prev) => ({
                  ...prev,
                  suppliers: {
                    ...prev.suppliers,
                    isOpen: !prev.suppliers.isOpen
                  }
                }))
              }
            >
              <ArrowDown />
            </button>
          </div>
          <div>
            {menuState.suppliers.isOpen && (
              <ItemMenu
                uri={URLS.suppliers.reports}
                className="animate-fade-down duration-300 delay-150 transition-all"
              >
                <span
                  className={`${pathname === URLS.inventory.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                >
                  Reportes
                </span>
              </ItemMenu>
            )}
          </div>

          <div>
            <div className="flex gap-1 justify-start items-center">
              <ItemMenu uri={URLS.clients.index}>
                <MoneyIcon />
                <span
                  className={`${pathname === URLS.clients.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                >
                  Clientes
                </span>
              </ItemMenu>
              <button
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 dark:hover:bg-gray-700 group"
                onClick={() =>
                  setMenuState((prev) => ({
                    ...prev,
                    clients: {
                      ...prev.clients,
                      isOpen: !prev.clients.isOpen
                    }
                  }))
                }
              >
                <ArrowDown />
              </button>
            </div>
            {menuState.clients.isOpen && (
              <ItemMenu
                uri={URLS.clients.reports}
                className="animate-fade-down duration-300 delay-150 transition-all"
              >
                <span
                  className={`${pathname === URLS.clients.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                >
                  Reportes
                </span>
              </ItemMenu>
            )}
          </div>
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
