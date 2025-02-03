import { ReactNode } from 'react'
import Link from 'next/link'

export function ItemMenu({
  children,
  uri,
  ...props
}: {
  children: ReactNode
  uri?: string
  className?: string
}) {
  return (
    <li className="hover:text-accent group-hover:fill-accent flex-2" {...props}>
      <Link
        href={uri ?? '/dashboard'}
        className="group-hover:fill-accent hover:fill-accent flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 dark:hover:bg-gray-700 group"
      >
        {children}
      </Link>
    </li>
  )
}
