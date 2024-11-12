import { ReactNode } from 'react'
import { AuthButton } from './auth/AuthButton'
import { DashboardIcon, LogOutIcon } from './icons/DashboardIcon'
import Link from 'next/link'

interface SessionProps {
   email?: string | null | undefined
   image?: string | null | undefined
   name?: string | null | undefined
}

export function ItemMenu ({children , session , uri} : {children : ReactNode , session : SessionProps , uri? : string  }) {
   return (
      <li>
      { children === 'Log Out' || children === 'Sing In' ? (
         <AuthButton className="flex min-w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" session={session}>
            {children}
         </AuthButton>
      )
      : (
         <Link href={uri ?? '/dashboard'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
         {children}
         </Link>
      )
      }
      </li>
   )
}
