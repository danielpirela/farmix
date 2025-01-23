'use client'
import { useMyContext } from '@components/context/Provider'
import { getEmployee } from '@services/employee'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Dashboard() {
  const { data: session } = useSession()

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!session?.user?.email) return
      /* const employee = await getEmployee(session.user.email)
      if (employee) setProfile(employee) */
    }
    fetchEmployee()
  }, [session])
  return <p>a</p>
}
