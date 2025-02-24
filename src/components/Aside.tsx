'use client'

import { useSession } from 'next-auth/react'
import { ItemMenu } from './ItemMenu'
import {
  ActivitiesIcon,
  ArrowDown,
  ClientIcon,
  EmployeesIcon,
  InventoryIcon,
  MoneyIcon,
  SupliersIcon
} from './icons/DashboardIcon'
import { AuthButton } from './auth/AuthButton'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { ActivityIcon, Icon, Milk } from 'lucide-react'

const URLS = {
  dashboard: '/dashboard',
  animals: {
    index: '/dashboard/admin/animals',
    reports: '/dashboard/admin/animals/reports',
    health: '/dashboard/admin/animals/health',
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
    isOpen: false
  },
  employees: {
    index: '/dashboard/employee',
    reports: '/dashboard/employee/reports',
    certificates: '/dashboard/employee/certificates',
    activities: '/dashboard/employee/activities',
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
  activity: {
    index: '/dashboard/activity',
    isOpen: false
  }
}

const ROLES = {
  admin: '43dc32e1-bbc6-4752-a43c-f730ba28365d',
  employee: '5c9fc195-2609-46ce-8b47-736229ce7bca',
  owner: '88e647c3-b321-48d0-b807-1b5e444c4f1c',
  veterinary: 'cd73bfd8-5c3d-4faa-8483-0d0cd3b0e404',
  milker: '5872e3a8-02bf-4ac4-b42e-188f70dacb35',
  foreman: '9ead41a0-06a6-4310-a71e-70e4a4e8ab27'
}

export const Aside = ({ state }: { state: boolean }) => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [menuState, setMenuState] = useState({
    animals: false,
    finances: false,
    inventory: false,
    employees: false,
    suppliers: false,
    clients: false
  })

  const validations = {
    animals:
      session?.user.role === ROLES.admin ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.veterinary ||
      session?.user.role === ROLES.foreman ||
      session?.user.role === ROLES.milker,

    animalsReports:
      session?.user.role === ROLES.admin ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman,

    animalsHealth:
      session?.user.role === ROLES.admin ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman ||
      session?.user.role === ROLES.milker ||
      session?.user.role === ROLES.veterinary,

    finances:
      session?.user.role === ROLES.admin || session?.user.role === ROLES.owner,

    financesReports:
      session?.user.role === ROLES.admin || session?.user.role === ROLES.owner,

    inventory:
      session?.user.role === ROLES.admin ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman ||
      session?.user.role === ROLES.employee,

    inventoryReports:
      session?.user.role === ROLES.admin ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman ||
      session?.user.role === ROLES.employee,

    employees:
      session?.user.role === ROLES.admin || session?.user.role === ROLES.owner,

    employeesActivities:
      session?.user.role === ROLES.admin ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman,

    employeesReports:
      session?.user.role === ROLES.admin ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman,

    certificates:
      session?.user.role === ROLES.employee ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman ||
      session?.user.role === ROLES.milker ||
      session?.user.role === ROLES.veterinary ||
      session?.user.role === ROLES.admin,

    suppliers:
      session?.user.role === ROLES.admin ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman,

    suppliersReports:
      session?.user.role === ROLES.admin ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman,

    clients:
      session?.user.role === ROLES.employee ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman ||
      session?.user.role === ROLES.admin,

    activity:
      session?.user.role === ROLES.employee ||
      session?.user.role === ROLES.owner ||
      session?.user.role === ROLES.foreman ||
      session?.user.role === ROLES.milker ||
      session?.user.role === ROLES.veterinary ||
      session?.user.role === ROLES.admin
  }

  const toggleMenu = (menu: string) => {
    setMenuState((prev) => ({ ...prev, [menu]: !prev[menu] }))
  }

  return (
    <aside
      className={`fixed top-20 left-0 z-10 w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-out transform ${state ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex h-full overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-6 pl-2">
          {/* Animales */}
          {validations.animals && (
            <>
              <div className="cursor-pointer flex items-center">
                <Milk className="h-6 w-6 text-black dark:text-white" />
                <Link
                  href={URLS.animals.index}
                  className="ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white"
                >
                  Animales
                </Link>
                <ArrowDown
                  onClick={() => toggleMenu('animals')}
                  className={`ml-2 transform w-4 h-4 transition-transform text-black dark:text-white ${menuState.animals ? 'rotate-180' : ''}`}
                />
              </div>
              {menuState.animals && (
                <div className="ml-6">
                  {validations.animalsReports && (
                    <ItemMenu uri={URLS.animals.reports}>
                      <span
                        className={`${pathname === URLS.animals.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                      >
                        Reportes de Animales
                      </span>
                    </ItemMenu>
                  )}
                  {validations.animalsHealth && (
                    <ItemMenu uri={URLS.animals.health}>
                      <span
                        className={`${pathname === URLS.animals.health ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                      >
                        Salud de Animales
                      </span>
                    </ItemMenu>
                  )}
                </div>
              )}
            </>
          )}

          {/* Finanzas */}
          {validations.finances && (
            <>
              <div className="cursor-pointer flex items-center">
                <MoneyIcon />
                <Link
                  href={URLS.finances.index}
                  className="ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white"
                >
                  Finanzas
                </Link>
                <ArrowDown
                  onClick={() => toggleMenu('finances')}
                  className={`ml-2 transform w-4 h-4 transition-transform text-black dark:text-white ${menuState.finances ? 'rotate-180' : ''}`}
                />
              </div>
              {menuState.finances && (
                <div className="ml-6">
                  {validations.financesReports && (
                    <ItemMenu uri={URLS.finances.reports}>
                      <span
                        className={`${pathname === URLS.finances.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                      >
                        Reportes de Finanzas
                      </span>
                    </ItemMenu>
                  )}
                </div>
              )}
            </>
          )}

          {/* Inventario */}
          {validations.inventory && (
            <>
              <div className="cursor-pointer flex items-center">
                <InventoryIcon />
                <Link
                  href={URLS.inventory.index}
                  className="ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white"
                >
                  Inventario
                </Link>
                <ArrowDown
                  onClick={() => toggleMenu('inventory')}
                  className={`ml-2 transform w-4 h-4 transition-transform text-black dark:text-white ${menuState.inventory ? 'rotate-180' : ''}`}
                />
              </div>
              {menuState.inventory && (
                <div className="ml-6">
                  {validations.inventoryReports && (
                    <ItemMenu uri={URLS.inventory.reports}>
                      <span
                        className={`${pathname === URLS.inventory.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                      >
                        Reportes de Inventario
                      </span>
                    </ItemMenu>
                  )}
                </div>
              )}
            </>
          )}

          {/* Empleados */}
          {validations.employees && (
            <>
              <div className="cursor-pointer flex items-center">
                <EmployeesIcon />
                <Link
                  href={URLS.employees.index}
                  className="ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white"
                >
                  Empleados
                </Link>
                <ArrowDown
                  onClick={() => toggleMenu('employees')}
                  className={`ml-2 transform w-4 h-4 transition-transform text-black dark:text-white ${menuState.employees ? 'rotate-180' : ''}`}
                />
              </div>
              {menuState.employees && (
                <>
                  <div className="ml-6">
                    {validations.employeesActivities && (
                      <ItemMenu uri={URLS.employees.activities}>
                        <span
                          className={`${pathname === URLS.employees.activities ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                        >
                          Actividades de Empleados
                        </span>
                      </ItemMenu>
                    )}
                  </div>
                  <div className="ml-6">
                    {validations.certificates && (
                      <ItemMenu uri={URLS.employees.certificates}>
                        <span
                          className={`${pathname === URLS.employees.certificates ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                        >
                          Constancias
                        </span>
                      </ItemMenu>
                    )}
                  </div>
                  <div className="ml-6">
                    {validations.employeesReports && (
                      <ItemMenu uri={URLS.employees.reports}>
                        <span
                          className={`${pathname === URLS.employees.reports ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                        >
                          Reportes
                        </span>
                      </ItemMenu>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {/* Proveedores */}
          {validations.suppliers && (
            <>
              <div
                onClick={() => toggleMenu('suppliers')}
                className="cursor-pointer flex items-center"
              >
                <ItemMenu uri={URLS.suppliers.index}>
                  <SupliersIcon />
                  <span
                    className={`${pathname === URLS.suppliers.index ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                  >
                    Proveedores
                  </span>
                </ItemMenu>
                <ArrowDown
                  className={`ml-2 transform w-4 h-4 transition-transform text-black dark:text-white ${menuState.suppliers ? 'rotate-180' : ''}`}
                />
              </div>
              {menuState.suppliers && (
                <div className="ml-6">
                  {validations.suppliersReports && (
                    <ItemMenu uri={URLS.suppliers.reports}>
                      <span
                        className={`${pathname === URLS.employees.activities ? 'text-accent' : ''} ml-3 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
                      >
                        Reportes de Proveedores
                      </span>
                    </ItemMenu>
                  )}
                </div>
              )}
            </>
          )}

          {/* Clientes */}
          {validations.clients && (
            <ItemMenu uri={URLS.clients.index}>
              <ClientIcon />
              <span
                className={`${pathname === URLS.clients.index ? 'text-accent' : ''} ml-2 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
              >
                Clientes
              </span>
            </ItemMenu>
          )}

          {validations.activity && (
            <ItemMenu uri={URLS.activity.index}>
              <ActivitiesIcon />
              <span
                className={`${pathname === URLS.activity.index ? 'text-accent' : ''} ml-2 font-medium hover:text-accent hover:scale-105 transition-all duration-300 text-black dark:text-white`}
              >
                Actividades
              </span>
            </ItemMenu>
          )}

          <AuthButton
            className="flex min-w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            session={session}
            withImage={false}
          >
            Cerrar sesión
          </AuthButton>
        </ul>
      </div>
    </aside>
  )
}
