'use client'

import { useEffect, useState } from 'react'
import { StatusClient } from './StatusClient'

const statusOpt = ['Activo', 'Inactivo']

interface EditableStatusClientProps {
  getValue: () => string
  row: {
    index: number
  }
  column: {
    id: string
  }
  table: {
    options: {
      meta?: {
        updateData: (index: number, id: string, value: string) => void
      }
    }
  }
}

export const EditableStatusClient: React.FC<EditableStatusClientProps> = ({
  getValue,
  row,
  column,
  table
}) => {
  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)
  const [isBreedOpen, setIsBreedOpen] = useState(false)

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div className="flex items-center justify-center flex-col">
      <button onClick={() => setIsBreedOpen(!isBreedOpen)}>
        <StatusClient>{value}</StatusClient>
      </button>
      {isBreedOpen && (
        <div
          className="flex flex-col z-40 min-w-16 min-h-14 p-2 mt-2 gap-1 ring-1 ring-black ring-opacity-5 overflow-hidden
          rounded-md shadow-md dark:bg-gray-800 animate-once animate-duration-300 animate-delay-300"
        >
          {statusOpt.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setValue(opt)
                setIsBreedOpen(false)
                onBlur()
              }}
              value={opt}
              className="flex items-center justify-start px-2 py-1 hover:scale-105 transition-all duration-300 ease-in-out text-black"
            >
              <StatusClient>{opt}</StatusClient>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
