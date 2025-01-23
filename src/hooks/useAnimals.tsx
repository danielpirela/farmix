'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal
} from '@services/animals'
import type {
  Animal,
  AnimalResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse
} from '@models/animals.model'

// Hook para manejar los animales
export const useAnimals = () => {
  const queryClient = useQueryClient()

  // Obtener todos los animales
  const animalsQuery = useQuery<AnimalResponse, Error>({
    queryKey: ['animals'],
    queryFn: getAnimals
  })

  // Crear un nuevo animal
  const createAnimalMutation = useMutation<
    CreateTransactionResponse,
    Error,
    Animal
  >({
    mutationFn: createAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] })
    }
  })

  // Actualizar un animal
  const updateAnimalMutation = useMutation<
    UpdateTransactionResponse,
    Error,
    { id: string; data: Partial<Animal> }
  >({
    mutationFn: ({ id, data }) => updateAnimal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] })
    }
  })

  // Eliminar un animal
  const deleteAnimalMutation = useMutation<
    DeleteTransactionResponse,
    Error,
    string
  >({
    mutationFn: deleteAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] })
    }
  })

  return {
    animals: animalsQuery.data,
    animalsError: animalsQuery.error,
    isAnimalsLoading: animalsQuery.isLoading,
    createAnimalMutation,
    updateAnimalMutation,
    deleteAnimalMutation
  }
}
