'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import UserImage from './auth/UserImage'
import { UserDetails } from './UserDetails'

const DEFAULT_IMAGE_URL = 'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid'


export function UserMenu() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const { data : session } = useSession()
    const finalUserImage = session?.user?.image ?? DEFAULT_IMAGE_URL

  return (
    <div className="relative flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <UserImage src={finalUserImage} name={session?.user?.name ?? ''}/>
                </button>
              </div>
            </div>
              { isDropdownOpen && <UserDetails name={session?.user?.name} email={session?.user.email} />}
          </div>
  )
}
