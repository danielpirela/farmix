'use client'

import Link from 'next/link'
import { AuthButton } from './auth/AuthButton'
import { Logo } from './Logo'
import { useState, useEffect } from 'react'
import { ToggleTheme } from './ToggleTheme'
import { MenuIcon } from './icons/DashboardIcon'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300  dark:bg-gray-800 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md'
          : 'bg-white '
      }
      ${isMenuOpen ? 'bg-white' : ''}
      `}
    >
      <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center bg-transparent">
        <div className="text-xl font-semibold text-gray-900 dark:text-white">
          <Link href={'/'} className="flex-shrink-0">
            <Logo />
          </Link>
        </div>
        {/* Toggle Button for Mobile */}
        <div className="flex items-center lg:hidden gap-4">
          <ToggleTheme isScrolled={isScrolled} />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-900 dark:text-white focus:outline-none"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-6 justify-center items-center ">
          <li className="flex space-x-6 justify-center items-center">
            <ToggleTheme isScrolled={isScrolled} />
          </li>
          <li>
            <Link
              href={'/dashboard'}
              className="inline-flex items-center  pt-1 text-sm font-semibold text-black border-b-2 border-transparent hover:border-accent hover:text-accent dark:text-white"
            >
              Inicio
            </Link>
          </li>
          <li>
            <AuthButton
              withImage={true}
              className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-black border-b-2 border-transparent hover:border-accent hover:text-accent dark:text-white"
            />
          </li>
        </ul>

        {/* Mobile Menu (Hamburger Menu) */}
        <div
          className={`lg:hidden absolute top-20 mt-3 left-0 right-0 bg-white dark:bg-gray-800 p-6 shadow-lg transition-all duration-300 transform ${
            isMenuOpen
              ? 'opacity-100 translate-y-4 visible'
              : 'opacity-0 translate-y-0 invisible'
          }`}
        >
          <ul className="space-y-4">
            <li>
              <Link
                href={'/dashboard'}
                className="block text-sm font-medium text-black dark:text-white hover:text-accent"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <AuthButton
                className="block text-sm font-medium text-black dark:text-white hover:text-accent"
                withImage={false}
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
