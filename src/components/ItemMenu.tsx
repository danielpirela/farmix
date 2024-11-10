import { ReactNode } from 'react'
import { AuthButton } from './auth/AuthButton'
import { DashboardIcon } from './icons/DashboardIcon'

interface SessionProps {
    email?: string | null | undefined
    image?: string | null | undefined
    name?: string | null | undefined
  }

 export function ItemMenu ({children , session } : {children : ReactNode , session : SessionProps}) {
    return (
       <li>
       { children === 'Log Out' || children === 'Sing In' ? (
          <AuthButton className="flex min-w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" session={session}>
             <DashboardIcon/>
             <span className="ms-3">{children}</span>
          </AuthButton>
       )
       : (
          <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <DashboardIcon/>
          <span className="ms-3">{children}</span>
          </a>
       )
       }
       </li>
    )
 }
