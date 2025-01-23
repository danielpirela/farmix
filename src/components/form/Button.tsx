import { LoadingIcon } from '@components/icons/DashboardIcon'
import { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  loading?: boolean
}

export function Button({
  onClick,
  children,
  className,
  type,
  disabled,
  loading,
  ...props
}: Props) {
  return (
    <div className={`flex justify-between items-center ${className ?? ''}`}>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="bg-accent text-white font-semibold p-2 rounded-lg mr-6 shadow-md hover:bg-accent-ligth hover:scale-105 transition-all duration-300 active:animate-jump animate-once "
        {...props}
      >
        {loading && <LoadingIcon />}
        {children}
      </button>
    </div>
  )
}
