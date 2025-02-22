import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '@services/employee'
import type {
  Employee,
  EmployeeResponse,
  CreateEmployeeResponse,
  UpdateEmployeeResponse,
  DeleteEmployeeResponse
} from '../models/employee.model'

// Hook para manejar empleados
export const useEmployees = () => {
  const queryClient = useQueryClient()

  // Obtener todos los empleados
  const employeesQuery = useQuery<EmployeeResponse, Error>({
    queryKey: ['employees'],
    queryFn: getEmployee(null)
  })

  // Crear un nuevo empleado
  const createEmployeeMutation = useMutation<
    CreateEmployeeResponse,
    Error,
    Employee
  >({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    }
  })

  // Actualizar un empleado
  const updateEmployeeMutation = useMutation<
    UpdateEmployeeResponse,
    Error,
    Employee
  >({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    }
  })

  // Eliminar un empleado
  const deleteEmployeeMutation = useMutation<
    DeleteEmployeeResponse,
    Error,
    string
  >({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    }
  })

  return {
    employees: employeesQuery.data,
    employeesError: employeesQuery.error,
    isEmployeesLoading: employeesQuery.isLoading,
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteEmployeeMutation
  }
}
