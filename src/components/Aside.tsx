"use client"
import { useSession } from 'next-auth/react'
import { ItemMenu } from './ItemMenu'
import { ActivitiesIcon, DashboardIcon, EmployeesIcon, InventoryIcon, LogOutIcon, MoneyIcon, SupliersIcon } from './icons/DashboardIcon'
const URLS = {
  dashboard: '/dashboard',
  kanban: '/kanban',
  inbox: '/inbox',
  employees: '/dashboard/employees',
  products: '/products',
  logout: '/logout'
}
export function Aside({state} : {state : boolean}) {
   const {data : session } = useSession()

  return (
    <aside className={`fixed top-20 left-2 z-40 w-64 h-screen max-h-[91%] pt-2 transition-all ring-2 ring-gray-100 dark:ring-white duration-300 ease-out  bg-white  dark:bg-gray-800 dark:border-gray-700 rounded-md py-1  shadow-md ${state ? '-translate-x-full transition-all duration-300 ease-out' : '-translate-x-0'}`}>
    <div className="h-full px-3 overflow-y-auto bg-white dark:bg-gray-800 min-h-full">
       <ul className="font-medium">
          <ItemMenu session={session?.user} uri={URLS.employees}>
            <DashboardIcon/>
            <span className="ms-3 font-semibold hover:text-accent hover:scale-105 transition-all duration-300 ease-out active:text-accent focus:text-accent">Dashboard</span>
          </ItemMenu>

          <ItemMenu session={session} uri={URLS.employees}>
          <EmployeesIcon/>
            <span className="ms-3 font-semibold hover:text-accent hover:scale-105 transition-all duration-300 ease-out active:text-accent focus:text-accent">Animales</span>
          </ItemMenu>

          <ItemMenu session={session?.user} uri={URLS.employees}>
            <MoneyIcon/>
            <span className="ms-3 font-semibold hover:text-accent hover:scale-105 transition-all duration-300 ease-out active:text-accent focus:text-accent"> Finanzas</span>
          </ItemMenu>

          <ItemMenu session={session?.user} uri={URLS.employees}>
            <EmployeesIcon/>
            <span className="ms-3 font-semibold hover:text-accent hover:scale-105 transition-all duration-300 ease-out active:text-accent focus:text-accent">Trabajadores</span>
          </ItemMenu>

          <ItemMenu session={session?.user} uri={URLS.employees}>
            <InventoryIcon/>
            <span className="ms-3 font-semibold hover:text-accent hover:scale-105 transition-all duration-300 ease-out active:text-accent focus:text-accent">Inventario</span>
          </ItemMenu>
          <ItemMenu session={session?.user} uri={URLS.employees}>
            <ActivitiesIcon/>
            <span className="ms-3 font-semibold hover:text-accent hover:scale-105 transition-all duration-300 ease-out active:text-accent focus:text-accent">Actividades</span>
          </ItemMenu>

          <ItemMenu session={session?.user} uri={URLS.employees}>
            <SupliersIcon/>
            <span className="ms-3 font-semibold hover:text-accent hover:scale-105 transition-all duration-300 ease-out active:text-accent focus:text-accent">Proveedores</span>
          </ItemMenu>

          <ItemMenu session={session?.user} uri={''}>
            <LogOutIcon/>
            <span className="ms-3 font-semibold hover:text-accent hover:scale-105 transition-all duration-300 ease-out active:text-accent focus:text-accent">Log Out</span>
          </ItemMenu>

       </ul>
    </div>
</aside>
  )
}
