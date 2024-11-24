import { supabase } from '@lib/supabase'
import { UpdateParams } from '../models/types'


export const getEmployee = async (email: string | null) => {
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

export const updateEmployee = async ({ email, profileData }: UpdateParams) => {
  if (!email) throw new Error('Employee is not found')
  if (!profileData) throw new Error('No data provided')

  const { data: employee, error } = await supabase
    .from('employees')
    .update(profileData)
    .eq('email', email)
    .select()

  if (error || !employee) {
    throw new Error('Error updating employee: ' + (error?.message || 'Unknown error'))
  }

  return employee
}
