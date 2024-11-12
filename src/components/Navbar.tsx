'use client'
import Link from 'next/link'
import {AuthButton} from './auth/AuthButton'
import { Logo } from './Logo'
import { useSession } from 'next-auth/react'

export function Navbar() {
  const {data : session } = useSession()

   return (
      <nav className="bg-white shadow-md min-w-full dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href={'/'} className="flex-shrink-0">
                <Logo />
              </Link>

            </div>
            <div className="flex items-center justify-center">
                <Link href={'/dashboard'} className="inline-flex items-center mr-10 pt-1 text-sm font-medium text-black border-b-2 border-transparent hover:border-accent hover:text-accent">
                  Dashboard
                </Link>
              <AuthButton session={session} className="inline-flex items-center px-1 pt-1 text-sm font-medium text-black border-b-2 border-transparent hover:border-accent hover:text-accent">
                {session?.user? 'Cerrar Sesión' : 'Iniciar Sesión'}
              </AuthButton>
            </div>
          </div>
        </div>
      </nav>
    )
}

