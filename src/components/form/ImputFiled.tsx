'use  client'

import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  Path
} from 'react-hook-form'

type InputFieldProps<T extends FieldValues> = {
  label: string
  name: Path<T> // Cambia a 'Path<T>' para que sea una clave válida de T
  register: UseFormRegister<T>
  errors?: FieldErrors<T>
  type?: string
  placeholder?: string
  validation?: RegisterOptions<T>
}

export const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = 'text',
  placeholder,
  validation
}: InputFieldProps<T>) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        <input
          {...register(name, validation)}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className="bg-gray-50 border-2  border-accent/20 text-gray-900 text-sm rounded-lg  focus:border-accent block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  dark:focus:border-accent"
        />
      </label>
      {errors && errors[name]?.message && (
        <p className="inline-block mb-2 text-sm font-light text-red-600">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  )
}
