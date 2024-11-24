import { ArrowRigth } from '@components/icons/DashboardIcon'
import { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  loading?: boolean
}

export function ButtonAnimated({
  onClick,
  children,
  className,
  type,
  disabled,
  ...props
}: Props) {
  return (
    <div
      className={`flex justify-between items-center z-40   ${className ?? ''} `}
    >
      <div className="animate-shake animate-infinite animate-duration-[2000ms] flex mr-4 gap-1">
        <span className="text-gray-700 dark:text-white animate-pulse">
          Agregar Actividad
        </span>
        <ArrowRigth className="animate-slide-in animate-pulse text-gray-700 dark:text-white" />
      </div>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="bg-accent text-white font-semibold p-2 rounded-lg mr-6 shadow-md hover:bg-accent-ligth active:animate-jump animate-once hover:animate-jump animate-duration-300"
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
