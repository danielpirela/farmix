import { ReactNode } from 'react'
import { CloseIcon } from '@components/icons/DashboardIcon'
interface Props {
  isOpen: boolean
  children: ReactNode
  title?: string
  onClose: () => void
}

export function Modal({ isOpen, onClose, children, title }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full animate-jump-in animate-once animate-duration-300 animate-delay-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-800"
        >
          <CloseIcon />
        </button>
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}