import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface Props {
  name?: string | undefined | null
  email?: string | undefined | null
  id: string | undefined | null
}

export function UserDetails({ name, email }: Props) {
  return (
    <div className="z-50  absolute right-9 top-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
      <div className="px-4 py-3" role="none">
        <p className="text-sm text-gray-900 dark:text-white" role="none">
          {name}
        </p>
        <p
          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
          role="none"
        >
          {email}
        </p>
      </div>
      <ul className="py-1" role="none">
        <li>
          <button
            className="block px-4 py-2 w-full text-start hover:text-accent text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 "
            onClick={() =>
              signOut({
                callbackUrl: '/'
              })
            }
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  )
}
