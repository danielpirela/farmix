"use client"

import { signIn, signOut } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from 'react'
import UserImage from './UserImage'
import { LogOutIcon } from '@components/icons/DashboardIcon'

const DEFAULT_IMAGE_URL = 'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid'

interface UserDetails {
  email?: string
  image?: string
  name?: string
  isProfileComplete?: boolean
}
  interface User {
  user : UserDetails
  expires :  Date
}
interface SessionProps {
  session: User
  children: ReactNode
  className: string
}


export function AuthButton({ session, children, className} : SessionProps) {
  const router = useRouter()

  const finalUserImage = session?.user?.image ?? DEFAULT_IMAGE_URL
  const finalName = session?.user?.name ?? ''

  useEffect(() => {
    console.log(
      session?.user?.isProfileComplete
    )

    if (session?.user?.isProfileComplete === false) {
      router.push('/employee/complete')
    }
  }, [session, router])

  return (
    <>
      {!session?.user ? (
        <button  onClick={() => {
          signIn('google', {
            callbackUrl: '/',
            }
          )
        }}
        className={`text-black ${className}`}
        >
          {children}
        </button>
      ) : (
        <div className='flex gap-2 pl-2 group-hover:text-accent dark:group-hover:text-accent hover:fill-accent'>
          <UserImage src={finalUserImage} name={finalName}/>
          <button  onClick={ () => {
            signOut({
              callbackUrl: '/',
            })
          }
        }
        className={`text-black ${className}`}
        >
          <LogOutIcon />
          <span className="flex-1 ms-3 whitespace-nowrap">
            {children}
          </span>
        </button>
        </div>
      )}
    </>
  )
}

