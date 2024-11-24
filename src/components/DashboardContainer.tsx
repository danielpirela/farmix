import React, { ReactNode } from 'react'

export function DashboardContainer({
  children,
  isAsideOpen
}: {
  children: ReactNode
  isAsideOpen: boolean
}) {
  return (
    <div
      className={`flex-1 p-4 mt-16 max-w-[100vw] bg-white dark:bg-gray-800 `}
    >
      <div className="p-4 ring-2 bg-white rounded-md ring-gray-100/70 dark:ring-gray-600/25 dark:bg-gray-800 shadow-lg overflow-y-auto min-h-screen">
        {children}
      </div>
    </div>
  )
}
