'use client'
import { useMyContext } from '@components/context/Provider'
import { getEmployee } from '@services/getEmployee'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Dashboard() {
  const {profile , setProfile} = useMyContext()
  const {data : session} = useSession()

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!session?.user?.email) return
      const employee = await getEmployee(session.user.email)
      if (employee) setProfile(employee)
    }

    fetchEmployee()
  }, [session,setProfile])
  return (
    <p>a</p>
  )
}
