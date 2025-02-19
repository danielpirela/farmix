import { TableMeta } from '@tanstack/react-table'

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

export interface Profile {
  first_name: string
  last_name: string
  id_document: string
  phone: string
  address: string
  hire_date: Date
  status: string
  img: string
  salary: number
}


export interface UpdateParams {
  email: string | null | undefined
  profileData: Employee
}


export interface Profile {
  profile: Employee
}

export interface Role {
  role_id: string
  role_name: string
}

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

export interface CustomTableMeta<T> extends TableMeta<T> {
  updateData: (
    rowIndex: number,
    columnId: string,
    value: string,
    query: string
  ) => Promise<void>
  viewDetails: (data: T) => Promise<void>
  resetTableState: () => void
}

export type Data<T> = T extends Activity ? Activity[] : Employee[] | []
