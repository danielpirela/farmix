'use client'
import { useState } from 'react'
import { StatusEmployee } from './StatusEmployee'
import {
  StatusEmployeeOptions,
  statusEmployeeOptions
} from '../../const/employee'

interface TableMeta {
  updateData: (
    rowIndex: number,
    columnId: string,
    value: string,
    query: string
  ) => Promise<void>
}

interface EditableStatusEmployeeProps {
  getValue: () => string | undefined
  row: {
    index: number
  }
  column: {
    id: string
  }
  table: {
    options: {
      meta: TableMeta
    }
  }
}

export const EditableStatusEmployee = ({
  getValue,
  row,
  column,
  table
}: EditableStatusEmployeeProps) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const value = getValue() || ''
  const { updateData } = table.options.meta

  return (
    <div className="flex items-center justify-center flex-col">
      <button onClick={() => setIsStatusOpen(!isStatusOpen)}>
        <StatusEmployee>{value}</StatusEmployee>
      </button>
      {isStatusOpen && (
        <div
          className="flex flex-col z-40 min-w-16 min-h-14 p-2 mt-2 gap-1 ring-1 ring-black ring-opacity-5 overflow-hidden
           rounded-md shadow-md dark:bg-gray-800 animate-once animate-duration-300 animate-delay-300"
        >
          {statusEmployeeOptions.map((status: StatusEmployeeOptions) => (
            <button
              key={status}
              onClick={async () => {
                updateData(row.index, column.id, status, 'EmployeeStatusUpdate')
                setIsStatusOpen(false)
              }}
              className="flex items-center justify-start px-2 py-1 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <StatusEmployee>{status}</StatusEmployee>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
