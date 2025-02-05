'use client'

import { useEffect, useState } from 'react'
import { healthStatusOptions } from '../../const/animals'

export const EditableHealthStatusCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)
  const [isHealthOpen, setIsHealthOpen] = useState(false)

  // Cuando el input pierde el foco, llamamos a la función updateData de la tabla
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  // Si el valor inicial cambia externamente, sincronízalo con nuestro estado
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div className="flex items-center justify-center flex-col">
      <button onClick={() => setIsHealthOpen(!isHealthOpen)}>
        <span>{value}</span>
      </button>
      {isHealthOpen && (
        <div
          className="flex flex-col z-40 min-w-16 min-h-14 p-2 mt-2 gap-1 ring-1 ring-black ring-opacity-5 overflow-hidden
           rounded-md shadow-md dark:bg-gray-800 animate-once animate-duration-300 animate-delay-300"
        >
          {healthStatusOptions.map((opt) => (
            <input
              key={opt}
              type="button"
              onClick={() => {
                setValue(opt)
                setIsHealthOpen(false)
                onBlur()
              }}
              value={opt}
              className="flex items-center justify-start px-2 py-1 hover:scale-105 transition-all duration-300 ease-in-out"
            />
          ))}
        </div>
      )}
    </div>
  )
}
