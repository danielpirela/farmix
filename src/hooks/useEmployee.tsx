import { getEmployee } from '@services/employee'
import { Employee } from '../models/types'
import { useQuery } from '@tanstack/react-query'

export function useEmployee(email?: string | null | undefined) {
  const { data, isPending, isError, refetch } = useQuery<Employee[]>({
    queryKey: ['employees', email ?? null],
    queryFn: () => getEmployee(email ?? null) as Promise<Employee[]> // Aseguramos que el tipo de retorno sea Promise<Employee[]>
  })

  return {
    employees: data ?? [], // Proporcionamos un valor por defecto en caso de que data sea null
    isPending,
    isError,
    refetch
  }
}
