'use client'
import { useEffect, useState } from 'react'

export const EditableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="max-w-28 hover:scale-105 transition-all duration-300 ease-in-out focus:ring-accent focus:border-1 dark:bg-transparent"
    />
  )
}
