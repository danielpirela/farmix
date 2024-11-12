'use client'
import Link from 'next/link'
import { Logo } from './Logo'
import { UserMenu } from './UserMenu'

export function SecondNavbar({onClickToggle} : {onClickToggle : () => void}){

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 max-h-14 m-2 max-w-[99%] rounded-md  shadow-md">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start rtl:justify-end">
              <button
                  className="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg  hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-gray-700"
                  onClick={onClickToggle}
                  >
              <svg className="w-6 h-6 hover:fill-accent" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                 <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
           </button>
          <Link href="/" className="flex ms-2 md:me-24">
          <Logo/>
          </Link>
        </div>
        <UserMenu />
      </div>
    </div>
  </nav>
  )
}
