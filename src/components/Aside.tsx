"use client"
import { useSession } from 'next-auth/react'
import { ItemMenu } from './ItemMenu'
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
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-all duration-300 ease-out  bg-white  dark:bg-gray-800 dark:border-gray-700"  ${state ? '-translate-x-full transition-all duration-300 ease-out' : '-translate-x-0'}`}>
    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
       <ul className="space-y-2 font-medium">
         <ItemMenu session={session?.user} uri={URLS.employees}>Dashboard</ItemMenu>
         <ItemMenu session={session} uri={URLS.employees}>Kanban</ItemMenu>
         <ItemMenu session={session?.user} uri={URLS.employees} >Inbox</ItemMenu>
         <ItemMenu session={session?.user} uri={URLS.employees}>Trabajadores</ItemMenu>
         <ItemMenu session={session?.user} uri={URLS.employees}>Products</ItemMenu>
         <ItemMenu session={session?.user} uri={''}>Log Out</ItemMenu>
       </ul>
    </div>
</aside>
  )
}
