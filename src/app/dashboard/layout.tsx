'use client'
import { Menu } from '@components/Menu'

export default function EmployeeLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-w-full min-h-screen bg-white dark:bg-gray-800 overflow-auto">
      <Menu>{children}</Menu>
    </div>
  )
}
