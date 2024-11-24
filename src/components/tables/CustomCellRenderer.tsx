import React from 'react'
import { flexRender } from '@tanstack/react-table'
import { UserImage } from '@components/auth/UserImage'
import { formatDate } from '@utils/formatDate'
import { StatusEmployee } from './StatusEmployee'

type CustomCellRendererProps = {
  cell: any
}

export const CustomCellRenderer: React.FC<CustomCellRendererProps> = ({
  cell
}) => {
  const cellId = cell.id
  const cellValue = cell.getValue()

  // Mapeo de renderizadores específicos para campos
  const renderers: Record<string, (value: any) => React.ReactNode> = {
    employees_img: (value) => (
      <UserImage
        src={value as string}
        name={`profile photo of user ${value}`}
      />
    ),
    created_at: (value) => formatDate(value as string),

    status: (value) => <StatusEmployee>{value}</StatusEmployee>,

    img: (value) => (
      <UserImage
        src={value as string}
        name={`profile photo of user ${value}`}
      />
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
