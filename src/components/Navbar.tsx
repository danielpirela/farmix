'use client'

import Link from 'next/link'
import {AuthButton} from './auth/AuthButton'
import { Logo } from './Logo'
import { useSession } from 'next-auth/react'

export function Navbar() {
  const {data : session , status} = useSession()
   return (
      <nav className="bg-white shadow-md min-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href={'/'} className="flex-shrink-0">
                <Logo />
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link href={'/dashboard'} className="inline-flex items-center px-1 pt-1 text-sm font-medium text-black border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700">
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <AuthButton session={session} status={status} className='text-black'>
                Sing In
              </AuthButton>
            </div>
          </div>
        </div>
      </nav>
    )
}

