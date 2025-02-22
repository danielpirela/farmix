import { Role } from './types'

export interface Employee {
  employee_id?: string
  email?: string
  first_name: string
  last_name: string
  id_document: string
  phone: string
  address: string
  hire_date: string
  salary: number
  status?: string
  img?: string
  role_id?: string
  roles?: Role[]
}

export type EmployeeResponse = Employee[] | null | undefined

export type CreateEmployeeResponse = Employee | null | undefined

export type UpdateEmployeeResponse = Employee | null | undefined

export type DeleteEmployeeResponse = Employee | null | undefined

export type GetEmployeeResponse = Employee | null | undefined


