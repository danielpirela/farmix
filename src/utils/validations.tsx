import { z } from 'zod'

const REGEX_DATE = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

export const TRASACTION_FORM_FIELDS = {
  transaction_date: 'transaction_date',
  type: 'type',
  amount: 'amount',
  method: 'method',
  description: 'description',
  descriptionOpt: 'descriptionOpt',
  category: 'category',
  employee_id: 'employee_id'
} as const

export const INVENTORY_FORM_FIELDS = {
  name: 'name',
  description: 'description',
  quantity_available: 'quantity_available',
  unit_cost: 'unit_cost',
  supplier_id: 'supplier_id'
} as const

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

export const SUPPLIER_FORM_FIELDS = {
  name: 'name',
  contact: 'contact',
  phone: 'phone',
  email: 'email',
  address: 'address',
  supplied_products: 'supplied_products'
}

export const ANIMAL_FORM_FIELDS = {
  type: 'type',
  name: 'name',
  breed: 'breed',
  birth_date: 'birth_date',
  health_status: 'health_status',
  location: 'location',
  weight: 'weight',
  daily_milk_production: 'daily_milk_production',
  life_stage: 'life_stage',
  child_id: 'child_id',
  mother_id: 'mother_id',
  father_id: 'father_id',
  parents_id: 'parents_id'
} as const

export const supplierSchema = z.object({
  [SUPPLIER_FORM_FIELDS.name]: z.string().min(3, 'Ingrese un nombre'),
  [SUPPLIER_FORM_FIELDS.contact]: z.string().min(3, 'Ingrese un contacto'),
  [SUPPLIER_FORM_FIELDS.phone]: z
    .string()
    .min(10, 'Ingrese un número de teléfono válido'),
  [SUPPLIER_FORM_FIELDS.email]: z
    .string()
    .email()
    .min(5, 'Ingrese un email válido'),
  [SUPPLIER_FORM_FIELDS.address]: z.string().min(5, 'Ingrese una dirección'),
  [SUPPLIER_FORM_FIELDS.supplied_products]: z
    .string()
    .min(3, 'Ingrese un producto')
})

export const transactionSchema = z.object({
  [TRASACTION_FORM_FIELDS.transaction_date]: z.string().date(),
  [TRASACTION_FORM_FIELDS.type]: z
    .string()
    .min(3, 'Ingrese un tipo de transacción'),
  [TRASACTION_FORM_FIELDS.amount]: z.string().min(1, 'Ingrese un monto'),
  [TRASACTION_FORM_FIELDS.description]: z
    .string()
    .min(5, 'Ingrese una descripción'),
  [TRASACTION_FORM_FIELDS.category]: z.string().min(3, 'Ingrese una categoría'),
  [TRASACTION_FORM_FIELDS.descriptionOpt]: z.string().optional(),
  [TRASACTION_FORM_FIELDS.method]: z
    .string()
    .min(3, 'Ingrese un método de pago'),
  [TRASACTION_FORM_FIELDS.employee_id]: z.string().optional()
})

export const activitySchema = z.object({
  [ACTIVITY_FORM_FIELDS.description]: z
    .string()
    .min(5, 'Escriba una descripcion'),
  [ACTIVITY_FORM_FIELDS.type]: z.string().min(4, 'Seleccione un tipo de tarea'),
  [ACTIVITY_FORM_FIELDS.descrptionOpt]: z.string().optional()
})

export const userSchema = z.object({
  [USER_FORM_FIELDS.firstName]: z
    .string()
    .min(1, 'Nombre es obligatorio')
    .optional(),
  [USER_FORM_FIELDS.lastName]: z
    .string()
    .min(1, 'Apellido es obligatorio')
    .optional(),
  [USER_FORM_FIELDS.idDocument]: z
    .string()
    .min(1, 'Cédula es obligatoria')
    .optional(),
  [USER_FORM_FIELDS.phone]: z
    .string()
    .min(14, 'Teléfono es obligatorio')
    .optional(),
  [USER_FORM_FIELDS.address]: z
    .string()
    .min(16, 'Dirección debe tener al menos 16 caracteres')
    .optional(),
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
    .optional()
})

export const inventorySchema = z.object({
  [INVENTORY_FORM_FIELDS.name]: z
    .string()
    .min(1, 'El nombre del artículo es obligatorio'),
  [INVENTORY_FORM_FIELDS.quantity_available]: z
    .string()
    .min(1, 'La cantidad debe ser al menos 1'),
  [INVENTORY_FORM_FIELDS.unit_cost]: z
    .string()
    .min(1, 'El precio debe ser mayor que 0'),
  [INVENTORY_FORM_FIELDS.description]: z.string().optional(),
  [INVENTORY_FORM_FIELDS.supplier_id]: z.string().optional()
})

export const animalSchema = z.object({
  [ANIMAL_FORM_FIELDS.type]: z.string().min(1, 'El tipo es obligatorio'),
  [ANIMAL_FORM_FIELDS.name]: z.string().min(1, 'El nombre es obligatorio'),
  [ANIMAL_FORM_FIELDS.breed]: z.string().min(1, 'La raza es obligatoria'),
  [ANIMAL_FORM_FIELDS.birth_date]: z
    .string()
    .min(1, 'La fecha de nacimiento es obligatoria'),
  [ANIMAL_FORM_FIELDS.health_status]: z
    .string()
    .min(1, 'El estado de salud es obligatorio'),
  [ANIMAL_FORM_FIELDS.location]: z
    .string()
    .min(1, 'La ubicación es obligatoria'),
  [ANIMAL_FORM_FIELDS.weight]: z
    .string()
    .min(2, 'El peso debe ser mayor que 0'),
  [ANIMAL_FORM_FIELDS.daily_milk_production]: z
    .number()
    .min(0, 'La producción diaria de leche debe ser mayor o igual a 0')
    .optional(),
  [ANIMAL_FORM_FIELDS.life_stage]: z
    .string()
    .min(1, 'La etapa de vida es obligatoria'),
  [ANIMAL_FORM_FIELDS.child_id]: z.string().optional(),
  [ANIMAL_FORM_FIELDS.mother_id]: z.string().optional(),
  [ANIMAL_FORM_FIELDS.father_id]: z.string().optional()
})

export type User = z.infer<typeof userSchema>
export type Activity = z.infer<typeof activitySchema>
export type Transaction = z.infer<typeof transactionSchema>
export type InventoryForm = z.infer<typeof inventorySchema>
export type SupplierForm = z.infer<typeof supplierSchema>
export type AnimalForm = z.infer<typeof animalSchema>
