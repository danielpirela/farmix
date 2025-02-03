'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import UserImage from './UserImage'
import { LogOutIcon } from '@components/icons/DashboardIcon'

interface Props {
  className: string
  withImage?: boolean
}

export function AuthButton({ className, withImage }: Props) {
  const { data: session } = useSession()
  const finalName = session?.user?.name ?? ''
  console.log(session)

  return (
    <>
      {!session?.user ? (
        <button
          onClick={() => {
            signIn('google', {
              callbackUrl: '/'
            })
          }}
          className={`text-black ${className}`}
        >
          Iniciar Sesion
        </button>
      ) : (
        // Cambios realizados aquí
        <div
          className={`flex gap-2 group-hover:text-accent dark:group-hover:text-accent hover:fill-accent transition-all duration-300 ${withImage ? 'pl-2' : 'flex-col'}`}
        >
          {withImage && (
            <UserImage
              src={session?.user?.image ?? '/images/logo.png'}
              name={finalName}
            />
          )}
          <button
            onClick={() => {
              signOut({
                callbackUrl: '/'
              })
            }}
            className={`text-black hover:scale-105 transition-all duration-300  ${className} hover:text-accent  `}
          >
            <LogOutIcon />
            <span
              className={`font-medium  ${withImage ? 'flex-1 ms-3 whitespace-nowrap' : 'ml-4'}`}
            >
              Cerrar Sesion
            </span>
          </button>
        </div>
      )}
    </>
  )
}
