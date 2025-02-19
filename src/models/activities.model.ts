import { Employee } from './types'

export interface Activity {
  activities_id: string
  description: string
  descriptionOpt?: string
  type: string
  employee_id: string
  status: string
  employees: Employee
  created_at : string
}

export interface ActivityResponse {
  data: Activity[] | null | undefined
}

export interface CreateTransactionResponse {
  data: Activity | null | undefined
}

export interface UpdateTransactionResponse {
  data: Activity | null | undefined
}

export interface DeleteTransactionResponse {
  data: Activity | null | undefined
}
