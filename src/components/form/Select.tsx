'use  client'

import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  Path
} from 'react-hook-form'

type SelectProps<T extends FieldValues> = {
  label: string
  name: Path<T> // Cambia a 'Path<T>' para que sea una clave válida de T
  register: UseFormRegister<T>
  errors?: FieldErrors<T>
  validation?: RegisterOptions<T>
  children?: React.ReactNode
}

export const Select = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  validation,
  children
}: SelectProps<T>) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        <select
          {...register(name, validation)}
          name={name}
          id={name}
          className="bg-gray-50 border-2  border-accent/20 text-gray-900 text-sm rounded-lg  focus:border-accent block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  dark:focus:border-accent"
        >
          {children}
        </select>
      </label>
      {errors && errors[name]?.message && (
        <p className="inline-block mb-2 text-sm font-light text-red-600">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  )
}
