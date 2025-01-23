import { RefreshIcon } from '@components/icons/DashboardIcon'
import { CustomTableMeta } from '@models/types'
import { useState } from 'react'

interface EditableStatusEmployeeProps<T> {
  table: {
    options: {
      meta: CustomTableMeta<T>
    }
  }
}

export const RefeshButton = <T,>({ table }: EditableStatusEmployeeProps<T>) => {
  const { resetTableState } = table.options.meta
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    resetTableState()
    setIsActive(true)
  }

  return (
    <button
      onClick={() => handleClick()}
      className="flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent-ligth"
    >
      <RefreshIcon
        className={`text-white ${isActive ? 'animate-spin animate-duration-300' : ''}`}
      />
    </button>
  )
}
