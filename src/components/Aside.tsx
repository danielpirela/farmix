"use client"
import { useSession } from 'next-auth/react'
import { ItemMenu } from './ItemMenu'

export function Aside({state} : {state : boolean}) {
   const {data : session } = useSession()

  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-all duration-300 ease-out  bg-white  dark:bg-gray-800 dark:border-gray-700"  ${state ? '-translate-x-full transition-all duration-300 ease-out' : '-translate-x-0'}`}>
    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
       <ul className="space-y-2 font-medium">
         <ItemMenu session={session?.user}>Dashboard</ItemMenu>
         <ItemMenu session={session}>Kanban</ItemMenu>
         <ItemMenu session={session?.user}>Inbox</ItemMenu>
         <ItemMenu session={session?.user}>Users</ItemMenu>
         <ItemMenu session={session?.user}>Products</ItemMenu>
         <ItemMenu session={session?.user}>Sing In</ItemMenu>
         <ItemMenu session={session?.user}>Log Out</ItemMenu>
       </ul>
    </div>
</aside>
  )
}
