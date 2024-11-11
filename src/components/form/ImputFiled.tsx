import { UseFormRegister, FieldErrors, FieldValues, RegisterOptions, Path } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>; // Cambia a 'Path<T>' para que sea una clave válida de T
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  type?: string;
  placeholder?: string;
  validation?: RegisterOptions<T>;
};

export const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  validation,
}: InputFieldProps<T>) => {
  return (
    <div>
      <label>
        {label}:
        <input {...register(name, validation)} type={type} placeholder={placeholder} />
      </label>
      {
        errors && errors[name]?.message && (
          <p>{String(errors[name]?.message)}</p> // Asegúrate de que sea un string
        )
      }
    </div>
  );
};

export default InputField;
