import React, { ReactNode } from 'react'

export function DashboardContainer({children} : {children : ReactNode}) {
  return (
    <div className="p-4 sm:ml-64">
    <div className="p-4 ring-2 bg-white rounded-md ring-gray-100 dark:ring-gray-800 mt-16 min-h-full max-h-[99%] shadow-lg">
        {children}
    </div>
    </div>
  )
}
