'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import UserImage from './auth/UserImage'
import { UserDetails } from './UserDetails'

export function UserMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <div className="relative flex items-center">
      <div className="flex items-center ms-3">
        <div>
          <button
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <UserImage
              src={session?.user.image}
              name={session?.user?.name ?? ''}
            />
          </button>
        </div>
      </div>
      {isDropdownOpen && (
        <UserDetails
          name={session?.user?.name}
          email={session?.user.email}
          id={session?.user.id}
        />
      )}
    </div>
  )
}
