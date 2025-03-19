import { Employee } from './types'

export const cetidicatOptions = [
  'Permiso',
  'Vacaciones',
  'Enfermedad',
  'Trabajo',
  'Otro'
]

export const certificateStatusOptions = [
  'Pendiente',
  'Aprobada',
  'Denegada'
]
export interface Certificate {
  id: string // UUID
  employee_id: string // Referencia al empleado
  certificate_type: string // Tipo de constancia (ej. Permiso, Vacaciones, Enfermedad)
  start_date: string // Fecha de inicio (YYYY-MM-DD)
  end_date: string // Fecha de fin (YYYY-MM-DD)
  reason: string // Motivo de la constancia
  status: 'Pendiente' | 'Aprovada' | 'Denegada' // Estado de la constancia (ej. Pendiente, Aprobado, Rechazado)
  issued_by?: string | null // ID del usuario que emite la constancia (puede ser nulo)
  created_at: string // Fecha de creación
  updated_at: string // Última actualización
  employee: Employee // Objeto de empleado
}

export interface CertificateResponse {
    certificates: Certificate[] | null | undefined
}

export interface CertificateByIdResponse {
    certificate: Certificate | null | undefined
}

export interface CreateTransactionResponse {
  certificate: Certificate | null | undefined
}

export interface UpdateTransactionResponse {
  updatedCertificate: Certificate | null | undefined
}

export interface DeleteTransactionResponse {
    data: Certificate[] | null | undefined
}


