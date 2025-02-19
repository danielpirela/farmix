'use client'
import { useEffect, useState } from 'react'
import { TypeOptions, typeOptions } from '../../const/animals'

export const EditableTypeAnimal = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div className="flex items-center justify-center flex-col">
      <button onClick={() => setIsStatusOpen(!isStatusOpen)}>
        <span>{value}</span>
      </button>
      {isStatusOpen && (
        <div
          className="flex flex-col z-40 min-w-16 min-h-14 p-2 mt-2 gap-1 ring-1 ring-black ring-opacity-5 overflow-hidden
           rounded-md shadow-md dark:bg-gray-800 animate-once animate-duration-300 animate-delay-300"
        >
          {typeOptions.map((opt: TypeOptions) => (
            <input
              key={opt}
              type="button"
              onClick={() => {
                setValue(opt)
                setIsStatusOpen(false)
                onBlur()
              }}
              value={opt} // Cambiado para mostrar el valor correcto
              className="flex items-center justify-start px-2 py-1 hover:scale-105 transition-all duration-300 ease-in-out"
            />
          ))}
        </div>
      )}
    </div>
  )
}
