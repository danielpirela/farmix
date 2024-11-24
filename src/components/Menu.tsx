'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Aside } from './Aside'
import { SecondNavbar } from './SecondNavbar'
import { DashboardContainer } from './DashboardContainer'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function Menu({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isAsideOpen, setIsAsideOpen] = useState(true)

  const handleToggleAside = () => {
    setIsAsideOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!session?.user) {
      signIn('google', {
        callbackUrl: '/'
      })
    }

    if (session?.user.isProfileComplete === false) {
      router.push('employee/complete')
    }
  }, [session, router])

  return (
    <div className="flex min-h-screen max-w-full overflow-x-hidden">
      {/* Aside: Se controla su visibilidad según el estado */}
      <Aside state={isAsideOpen} />

      {/* Contenedor principal */}
      <div
        className={`flex-1 transition-all duration-300 ease-out ${isAsideOpen ? 'ml-64' : 'ml-0'}`}
      >
        {/* Navbar secundario */}
        <SecondNavbar onClickToggle={handleToggleAside} />

        {/* Contenido principal */}
        <DashboardContainer isAsideOpen={isAsideOpen}>
          {children}
        </DashboardContainer>
      </div>
    </div>
  )
}
