import { useMutation } from '@tanstack/react-query'
import { updateEmployee } from '@services/employee'
import type { UpdateParams, Employee } from '../models/types'

export function useUpdateProfile() {
  return useMutation<Employee[], Error, UpdateParams>({
    mutationFn: updateEmployee, // La función para ejecutar la actualización
    onSuccess: (data) => {
      console.log('Employee updated successfully:', data)
    },
    onError: (error) => {
      console.error('Error updating profile:', error.message)
    }
  })
}
