import { z } from 'zod'
export const HEALTH_FORM_FIELDS = {
    animal_id : 'animal_id',
    checkup_date : 'checkup_date',
    diagnosis : 'diagnosis',
    treatment : 'treatment',
    employee_id : 'employee_id',
} as const
// Esquema de validación para el control de salud
export const healthControlSchema = z.object({
  [HEALTH_FORM_FIELDS.animal_id]: z.string().min(1, 'El ID del animal es requerido'),
  [HEALTH_FORM_FIELDS.checkup_date]: z.string().min(1, 'La fecha de control es requerida'),
  [HEALTH_FORM_FIELDS.diagnosis]: z.string().min(10,'El diagnóstico es requerido'),
  [HEALTH_FORM_FIELDS.treatment]: z.string().min(10,'El tratamiento es requerido'),
  [HEALTH_FORM_FIELDS.employee_id]: z.string().min(1, 'El ID del empleado es requerido'),
})

// Tipo inferido del esquema
export type HealthControlSchema = z.infer<typeof healthControlSchema>
