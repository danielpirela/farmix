import { z } from 'zod'

export const USER_FORM_FIELDS = {
  firstName: 'firstName',
  lastName: 'lastName',
  idDocument: 'idDocument',
  phone: 'phone',
  address: 'address',
  hireDate: 'hireDate'
} as const

export const ACTIVITY_FORM_FIELDS = {
  type: 'type',
  description: 'description',
  descrptionOpt: 'descriptionOpt'
} as const

const REGEX_DATE = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

export const activitySchema = z.object({
  [ACTIVITY_FORM_FIELDS.description]: z
    .string()
    .min(5, 'Escriba una descripcion'),
  [ACTIVITY_FORM_FIELDS.type]: z.string().min(4, 'Seleccione un tipo de tarea'),
  [ACTIVITY_FORM_FIELDS.descrptionOpt]: z.string().optional()
})
export const userSchema = z.object({
  [USER_FORM_FIELDS.firstName]: z.string().min(1, 'Nombre es obligatorio'),
  [USER_FORM_FIELDS.lastName]: z.string().min(1, 'Apellido es obligatorio'),
  [USER_FORM_FIELDS.idDocument]: z.string().min(1, 'Cédula es obligatoria'),
  [USER_FORM_FIELDS.phone]: z.string().min(14, 'Teléfono es obligatorio'),
  [USER_FORM_FIELDS.address]: z
    .string()
    .min(16, 'Dirección debe tener al menos 16 caracteres'),
  [USER_FORM_FIELDS.hireDate]: z
    .string()
    .regex(REGEX_DATE, 'La fecha debe estar en formato dd/mm/yyyy')
    .refine((date) => {
      const [day, month, year] = date.split('/').map(Number)
      const dateObject = new Date(year, month - 1, day) // Año, mes (0-11), día
      return (
        dateObject.getDate() === day &&
        dateObject.getMonth() === month - 1 &&
        dateObject.getFullYear() === year
      )
    }, 'La fecha proporcionada no es válida')
})

export type User = z.infer<typeof userSchema>
export type Activity = z.infer<typeof activitySchema>
