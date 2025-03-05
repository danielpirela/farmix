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
      className="font-normal pb-2 rounded-full transition duration-300 active:scale-95 hover:scale-110 text-blue-500"
    >
      {children}
    </button>
  )
}
