import { useState } from 'react'
import { StatusEmployee } from './StatusEmployee'
import { statusAtivitiesOptions } from '../../const/task'

export const EditableStatusEmployee = ({
  getValue,
  row,
  column,
  table
}: any) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const value = getValue() || ''
  const { updateData } = table.options.meta

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsStatusOpen(!isStatusOpen)
        }}
      >
        <StatusEmployee>{value}</StatusEmployee>
      </button>
      {/* Aquí se puede agregar la lista desplegable */}
      {isStatusOpen && (
        <div className="absolute top-full left-0 z-10 overflow-hidden rounded-md shadow-md bg-white dark:bg-gray-800 animate-once animate-duration-300 animate-delay-300">
          {statusAtivitiesOptions.map((status) => (
            <button
              key={status}
              onClick={async () => {
                updateData(row.index, column.id, status, 'EmployeeStatusUpdate')
              }}
            >
              <StatusEmployee>{status}</StatusEmployee>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
