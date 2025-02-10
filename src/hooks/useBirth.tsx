import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getBirths,
  getBirthById,
  createBirth,
  updateBirth,
  deleteBirth,
  getBirthAnimals
} from '../services/birth'

import type {
  Birth,
  BirthResponse,
  GetBirthByIdResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse
} from '../models/birth.model'

// Hook para manejar los nacimientos
export const useBirth = () => {
  const queryClient = useQueryClient()

  // Obtener todos los nacimientos
  const birthsQuery = useQuery<BirthResponse, Error>({
    queryKey: ['births'],
    queryFn: getBirths
  })

  // Obtener un nacimiento por ID
  const useBirthById = (id: string) => {
    return useQuery<BirthByIdResponse, Error>({
      queryKey: ['birth', id],
      queryFn: () => getBirthAnimals(id)
    })
  }

  // Crear un nuevo nacimiento
  const createBirthMutation = useMutation<
    CreateTransactionResponse,
    Error,
    Birth
  >({
    mutationFn: createBirth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['births'] })
    }
  })

  // Actualizar un nacimiento
  const updateBirthMutation = useMutation<
    UpdateTransactionResponse,
    Error,
    { id: string; data: Partial<Birth> }
  >({
    mutationFn: ({ id, data }) => updateBirth(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['births'] })
    }
  })

  // Eliminar un nacimiento
  const deleteBirthMutation = useMutation<
    DeleteTransactionResponse,
    Error,
    string
  >({
    mutationFn: deleteBirth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['births'] })
    }
  })

  return {
    births: birthsQuery.data,
    birthsError: birthsQuery.error,
    isBirthsLoading: birthsQuery.isLoading,
    useBirthById,
    createBirthMutation,
    updateBirthMutation,
    deleteBirthMutation
  }
}
