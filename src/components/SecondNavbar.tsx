'use client'

import Link from 'next/link'
import { Logo } from './Logo'
import { UserMenu } from './UserMenu'
import { MenuIcon } from './icons/DashboardIcon'

export function SecondNavbar({ onClickToggle }: { onClickToggle: () => void }) {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 max-h-14 px-3 py-3 lg:px-5 lg:pl-3 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start rtl:justify-end">
          <button
            className="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            onClick={onClickToggle}
          >
            <MenuIcon />
          </button>
          <Link href="/" className="flex ms-2 md:me-24">
            <Logo />
          </Link>
        </div>
        <UserMenu />
      </div>
    </nav>
  )
}
