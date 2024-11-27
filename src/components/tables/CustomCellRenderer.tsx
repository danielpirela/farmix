import React from 'react'
import { flexRender } from '@tanstack/react-table'
import { UserImage } from '@components/auth/UserImage'
import { formatDate } from '@utils/formatDate'

type CustomCellRendererProps = {
  cell: any
  onViewDetails?: () => void
}

export const CustomCellRenderer: React.FC<CustomCellRendererProps> = ({
  cell,
  onViewDetails
}) => {
  const cellId = cell.id
  const cellValue = cell.getValue()

  const renderers: Record<string, (value: any) => React.ReactNode> = {
    employees_img: (value) => (
      <button onClick={() => onViewDetails(cell?.row?.original)}>
        <UserImage
          src={value as string}
          name={`profile photo of user ${value}`}
        />
      </button>
    ),
    created_at: (value) => formatDate(value as string),

    img: (value) => (
      <button onClick={() => onViewDetails(cell?.row?.original)}>
        <UserImage
          src={value as string}
          name={`profile photo of user ${value}`}
        />
      </button>
    )
  }

  // Determina si existe un renderizador específico para el campo
  const matchedKey = Object.keys(renderers).find((key) =>
    new RegExp(`\\d+_${key}`).test(cellId)
  )

  // Renderiza según el mapeo o usa flexRender como predeterminado
  return (
    <>
      {matchedKey
        ? renderers[matchedKey](cellValue)
        : flexRender(cell.column.columnDef.cell, cell.getContext())}
    </>
  )
}
