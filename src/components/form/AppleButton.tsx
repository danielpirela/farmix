'use client'

import React from 'react'

interface AppleButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export const AppleButton: React.FC<AppleButtonProps> = ({
  onClick,
  children
}) => {
  return (
    <button
      onClick={onClick}
      className="   font-normal py-2 px-4 rounded-full transition duration-300 ease-in-out text-blue-500"
    >
      {children}
    </button>
  )
}
