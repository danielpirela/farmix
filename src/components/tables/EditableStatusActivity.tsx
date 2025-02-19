'use client'
import { useEffect, useState } from 'react'
import { StatusEmployee } from './StatusEmployee'
import {
  statusAtivitiesOptions,
  StatusAtivitiesOptions
} from '../../const/task'

export const EditableStatusActivity = ({
  getValue,
  row,
  column,
  table
}: any) => {
  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)
  const [isStatusOpen, setIsStatusOpen] = useState(false)

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div className="flex items-center justify-center flex-col">
      <button onClick={() => setIsStatusOpen(!isStatusOpen)}>
        <StatusEmployee>{value}</StatusEmployee>
      </button>
      {isStatusOpen && (
        <div
          className="flex flex-col z-40  min-w-16 min-h-14 p-2 mt-2 gap-1 ring-1 ring-black ring-opacity-5 overflow-hidden
          rounded-md shadow-md dark:bg-gray-800 animate-once animate-duration-300 animate-delay-300"
        >
          {statusAtivitiesOptions.map((status: StatusAtivitiesOptions) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                setValue(status)
                setIsStatusOpen(false)
                onBlur()
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
