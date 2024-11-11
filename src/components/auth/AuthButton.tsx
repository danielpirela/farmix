"use client"

import { signIn, signOut } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from 'react'

interface User {
  email?: string | null | undefined
  image?: string | null | undefined
  name?: string | null | undefined
  isProfileComplete?: boolean
}
interface SessionProps {
  user: User
}

export function AuthButton({ session, children, className} : {session : SessionProps, children : ReactNode, className : string , status : boolean}) {
  const router = useRouter()

  useEffect(() => {
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
          <button  onClick={ () => {
             signOut({
              callbackUrl: '/',
            })
          }
          }
          className={`text-black ${className}`}
          >
            {children}
        </button>
      )}
    </>
  )
}

