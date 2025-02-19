'use client'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Dashboard() {
  const { data: session } = useSession()

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!session?.user?.email) return
    }
    fetchEmployee()
  }, [session])
  return <p>a</p>
}
