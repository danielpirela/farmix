import { z } from 'zod'

// Start of Selection
export const LETTERS_ONLY_REGEX = /^[a-zA-Z\s]+$/
export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9\s]+$/
export const VENEZUELA_PHONE_REGEX = /^(0412|0414|0416|0424)\d{7}$/
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const POSITIVE_NUMBERS_REGEX = /^[0-9]+$/

export const TRASACTION_FORM_FIELDS = {
  transaction_date: 'transaction_date',
  type: 'type',
  amount: 'amount',
  method: 'method',
  description: 'description',
  descriptionOpt: 'descriptionOpt',
  category: 'category',
  employee_id: 'employee_id',
  client_id: 'client_id',
  supplier_id: 'supplier_id'
} as const

export const INVENTORY_FORM_FIELDS = {
  name: 'name',
  description: 'description',
  quantity: 'quantity',
  unit_cost: 'unit_cost',
  supplier_id: 'supplier_id',
  type: 'type',
  unit: 'unit'
} as const

export const USER_FORM_FIELDS = {
  firstName: 'firstName',
  lastName: 'lastName',
  idDocument: 'idDocument',
  phone: 'phone',
  address: 'address',
  hire_date: 'hire_date'
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
  [SUPPLIER_FORM_FIELDS.name]: z
    .string()
    .min(3, 'Ingrese un nombre')
    .regex(
      ALPHANUMERIC_REGEX,
      'El nombre solo puede contener letras y números'
    ),
  [SUPPLIER_FORM_FIELDS.contact]: z
    .string()
    .min(3, 'Ingrese un contacto')
    .regex(LETTERS_ONLY_REGEX, 'El contacto solo puede contener letras'),
  [SUPPLIER_FORM_FIELDS.phone]: z
    .string()
    .min(11, 'Ingrese un número de teléfono válido')
    .regex(VENEZUELA_PHONE_REGEX, 'El número de teléfono debe ser válido'),
  [SUPPLIER_FORM_FIELDS.email]: z
    .string()
    .email()
    .min(5, 'Ingrese un email válido')
    .regex(EMAIL_REGEX, 'El email debe ser válido'),
  [SUPPLIER_FORM_FIELDS.address]: z
    .string()
    .min(5, 'Ingrese una dirección')
    .regex(
      ALPHANUMERIC_REGEX,
      'La dirección solo puede contener letras y números'
    ),
  [SUPPLIER_FORM_FIELDS.supplied_products]: z
    .string()
    .min(3, 'Ingrese un producto')
    .regex(LETTERS_ONLY_REGEX, 'El producto solo puede contener letras')
})

export const transactionSchema = z.object({
  [TRASACTION_FORM_FIELDS.transaction_date]: z.string().date(),
  [TRASACTION_FORM_FIELDS.type]: z
    .string()
    .min(3, 'Ingrese un tipo de transacción')
    .regex(
      LETTERS_ONLY_REGEX,
      'El tipo de transacción solo puede contener letras'
    ),

  [TRASACTION_FORM_FIELDS.amount]: z
    .string()
    .min(1, 'Ingrese un monto')
    .max(5, 'Ingrese un monto válido')
    .regex(POSITIVE_NUMBERS_REGEX, 'El monto debe ser un número positivo'),
  [TRASACTION_FORM_FIELDS.description]: z
    .string()
    .min(5, 'Ingrese una descripción')
    .optional(),

  [TRASACTION_FORM_FIELDS.category]: z
    .string()
    .min(3, 'Ingrese una categoría')
    .optional(),

  [TRASACTION_FORM_FIELDS.descriptionOpt]: z.string().optional(),

  [TRASACTION_FORM_FIELDS.method]: z
    .string()
    .min(3, 'Ingrese un método de pago')
    .regex(LETTERS_ONLY_REGEX, 'El método de pago solo puede contener letras'),
  [TRASACTION_FORM_FIELDS.employee_id]: z.string().optional(),
  [TRASACTION_FORM_FIELDS.client_id]: z.string().optional(),
  [TRASACTION_FORM_FIELDS.supplier_id]: z.string().optional()
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
    .regex(LETTERS_ONLY_REGEX, 'El nombre solo puede contener letras')
    .optional(),
  [USER_FORM_FIELDS.lastName]: z
    .string()
    .min(1, 'Apellido es obligatorio')
    .regex(LETTERS_ONLY_REGEX, 'El apellido solo puede contener letras')
    .optional(),
  [USER_FORM_FIELDS.idDocument]: z
    .string()
    .min(1, 'Cédula es obligatoria')
    .regex(
      /^[0-9]{1,10}$/,
      'Cédula solo puede contener números y debe tener 10 dígitos'
    ),
  [USER_FORM_FIELDS.phone]: z
    .string()
    .min(11, 'El telefono es obligatorio')
    .max(11, 'El número de teléfono debe tener 11 caracteres')
    .regex(VENEZUELA_PHONE_REGEX, 'El número de teléfono debe ser válido'),
  [USER_FORM_FIELDS.address]: z
    .string()
    .min(5, 'Dirección debe tener al menos 5 caracteres')
    .regex(
      ALPHANUMERIC_REGEX,
      'La dirección solo puede contener letras y números'
    )
    .optional(),
  [USER_FORM_FIELDS.hire_date]: z
    .string()
    .min(9, 'Ingrese una fecha válida')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener el formato AAAA-MM-DD')
    .optional()
})

export const inventorySchema = z.object({
  [INVENTORY_FORM_FIELDS.name]: z
    .string()
    .min(2, 'El nombre del artículo es obligatorio')
    .regex(
      LETTERS_ONLY_REGEX,
      'El nombre del artículo solo puede contener letras'
    ),
  [INVENTORY_FORM_FIELDS.quantity]: z
    .string()
    .min(1, 'La cantidad debe ser al menos 1')
    .regex(POSITIVE_NUMBERS_REGEX),
  [INVENTORY_FORM_FIELDS.unit_cost]: z
    .string()
    .min(1, 'El precio debe ser mayor que 0')
    .regex(POSITIVE_NUMBERS_REGEX, 'El precio debe ser un número positivo'),
  [INVENTORY_FORM_FIELDS.description]: z
    .string()
    .regex(LETTERS_ONLY_REGEX, 'La descripción solo puede contener letras')
    .optional(),
  [INVENTORY_FORM_FIELDS.supplier_id]: z.string().optional(),
  [INVENTORY_FORM_FIELDS.type]: z
    .string()
    .regex(LETTERS_ONLY_REGEX, 'El tipo de unidad solo puede contener letras')
    .optional(),
  [INVENTORY_FORM_FIELDS.unit]: z
    .string()
    .min(1, 'Seleccione un tipo de unidad')
    .regex(/^(kg|l|ml|g)$/, 'El tipo de unidad solo puede ser kg, l, ml o g')
})

export const animalSchema = z.object({
  [ANIMAL_FORM_FIELDS.type]: z
    .string()
    .min(1, 'El tipo es obligatorio')
    .regex(LETTERS_ONLY_REGEX, 'El tipo solo puede contener letras'),
  [ANIMAL_FORM_FIELDS.name]: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .regex(LETTERS_ONLY_REGEX, 'El nombre solo puede contener letras'),
  [ANIMAL_FORM_FIELDS.breed]: z
    .string()
    .min(1, 'La raza es obligatoria')
    .regex(LETTERS_ONLY_REGEX, 'La raza solo puede contener letras'),
  [ANIMAL_FORM_FIELDS.birth_date]: z
    .string()
    .min(1, 'La fecha de nacimiento es obligatoria')
    .date(),
  [ANIMAL_FORM_FIELDS.health_status]: z
    .string()
    .min(4, 'El estado de salud es obligatorio')
    .regex(LETTERS_ONLY_REGEX, 'EL estado de salud solo puede contener letras'),
  [ANIMAL_FORM_FIELDS.location]: z
    .string()
    .min(8, 'La ubicación es obligatoria')
    .regex(
      ALPHANUMERIC_REGEX,
      'La ubicación solo puede contener letras y números'
    ),
  [ANIMAL_FORM_FIELDS.weight]: z
    .string()
    .min(3, 'El peso debe ser mayor que 0')
    .regex(POSITIVE_NUMBERS_REGEX, 'El peso debe ser un número positivo'),
  [ANIMAL_FORM_FIELDS.daily_milk_production]: z
    .number()
    .min(0, 'La producción diaria de leche debe ser mayor o igual a 0')
    .optional(),
  [ANIMAL_FORM_FIELDS.life_stage]: z
    .string()
    .min(4, 'La etapa de vida es obligatoria')
    .regex(LETTERS_ONLY_REGEX, 'La etapa de vida solo puede contener letras'),
  [ANIMAL_FORM_FIELDS.child_id]: z.string().optional(),
  [ANIMAL_FORM_FIELDS.mother_id]: z.string().optional(),
  [ANIMAL_FORM_FIELDS.father_id]: z.string().optional()
})

export const clientSchema = z.object({
  first_name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .regex(LETTERS_ONLY_REGEX, 'El nombre solo puede contener letras'),
  last_name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .regex(LETTERS_ONLY_REGEX, 'El nombre solo puede contener letras'),
  phone: z
    .string()
    .min(11, 'El numero de teléfono es obligatorio')
    .regex(VENEZUELA_PHONE_REGEX, 'El número de teléfono debe ser válido'),
  email: z
    .string()
    .email('El email debe ser válido')
    .min(1, 'El email es obligatorio')
    .regex(EMAIL_REGEX, 'El email debe ser válido')
})

export type Client = z.infer<typeof clientSchema>
export type User = z.infer<typeof userSchema>
export type Activity = z.infer<typeof activitySchema>
export type Transaction = z.infer<typeof transactionSchema>
export type InventoryForm = z.infer<typeof inventorySchema>
export type SupplierForm = z.infer<typeof supplierSchema>
export type AnimalForm = z.infer<typeof animalSchema>
