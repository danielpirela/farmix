export interface Employee {
  employee_id: string
  email: string
  first_name: string
  last_name: string
  id_document: string
  phone: string
  address: string
  hire_date: string
  salary: number
  role_id: string
}

export interface Profile {
  profile: Employee
}
