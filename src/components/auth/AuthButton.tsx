"use client"

import { signIn, signOut } from 'next-auth/react'
import { ReactNode } from 'react'

interface SessionProps {
  email?: string | null | undefined
  image?: string | null | undefined
  name?: string | null | undefined
}

export function AuthButton({ session, children, className } : {session : SessionProps, children : ReactNode, className : string}) {

  return (
    <>
      {!session ? (
        <button  onClick={() => {
          signIn('google', {
            callbackUrl: '/dashboard',
            }
          )
        }}
        className={`text-black ${className}`}
        >
          {children}
        </button>
      ) : (
          <button  onClick={ () => {
            console.log('User signed out');
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

