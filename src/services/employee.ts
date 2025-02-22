import { supabase } from '@lib/supabase'
import { Employee, EmployeeResponse, CreateEmployeeResponse, UpdateEmployeeResponse, DeleteEmployeeResponse } from '@models/employee.model'


export const getEmployee = async (email: string | null) : Promise<EmployeeResponse> => {
  if (email === null) {
    const { data: Employee } = await supabase
      .from('employees')
      .select('*, roles(role_name)')
    return Employee
  }

  const { data: Employee } = await supabase
    .from('employees')
    .select('*, roles(role_name)')
    .eq('email', email)
    .single()

  if (!Employee) return null
  return [Employee]
}

// Crear un nuevo empleado
export const createEmployee = async (employee: Employee): Promise<CreateEmployeeResponse> => {
  if (!employee) throw new Error('Employee data is required')
  try {
    const { data, error } = await supabase
      .from('employees')
      .insert(employee)
      .select('*')

    if (error) throw new Error('Error creating employee: ' + error.message)
    return data?.[0] || null
  } catch (err) {
    if (err instanceof Error) throw new Error('Error creating employee: ' + err.message)
    return  null
  }
}

export const updateEmployee = async (email: string, profileData: Employee): Promise<UpdateEmployeeResponse> => {
  try {

    const { data: employee, error } = await supabase
    .from('employees')
    .update(profileData)
    .eq('email', email)
    .select()

  if (error || !employee) {
    throw new Error('Error updating employee: ' + (error?.message || 'Unknown error'))
  }

  return employee
} catch (err) {
  if (err instanceof Error) throw new Error('Error updating employee: ' + err.message)
    return null
  }
}

// Eliminar un empleado
export const deleteEmployee = async (id: string): Promise<DeleteEmployeeResponse> => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .delete()
      .eq('empployee_id', id)
      .select('*')

    if (error) throw new Error('Error deleting employee: ' + error.message)
    return data as Employee[] || null
  } catch (err) {
    if (err instanceof Error) throw new Error('Error deleting employee: ' + err.message)
    return null
  }
}
