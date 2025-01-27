'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getMilkProductions,
  createMilkProduction,
  updateMilkProduction,
  deleteMilkProduction
} from '@services/milk'

import type {
  MilkProductionResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse,
  MilkProduction
} from '@models/milkProduction.model'

// Hook para manejar la producción de leche
export const useMilkProduction = () => {
  const queryClient = useQueryClient()

  // Obtener toda la producción de leche
  const milkProductionQuery = useQuery<MilkProductionResponse, Error>({
    queryKey: ['milkProduction'],
    queryFn: getMilkProductions
  })

  // Preparar los datos para la gráfica
  const milkProductionData =
    milkProductionQuery.data?.milk_production?.map((item) => ({
      date: item.production_date,
      quantity: item.milk_quantity,
      animalId: item.animal_id,
      name: item.animals?.name
      // ... otros campos que necesites para la gráfica
    })) || []

  // Crear una nueva producción de leche
  const createMilkProductionMutation = useMutation<
    CreateTransactionResponse,
    Error,
    MilkProduction[]
  >({
    mutationFn: createMilkProduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milkProduction'] })
    }
  })

  // Actualizar una producción de leche
  const updateMilkProductionMutation = useMutation<
    UpdateTransactionResponse,
    Error,
    MilkProduction
  >({
    mutationFn: updateMilkProduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milkProduction'] })
    }
  })

  // Eliminar una producción de leche
  const deleteMilkProductionMutation = useMutation<
    DeleteTransactionResponse,
    Error,
    string
  >({
    mutationFn: deleteMilkProduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milkProduction'] })
    }
  })

  return {
    milkProductionData,
    milkProduction: milkProductionQuery.data,
    milkProductionError: milkProductionQuery.error,
    isMilkProductionLoading: milkProductionQuery.isLoading,
    createMilkProductionMutation,
    updateMilkProductionMutation,
    deleteMilkProductionMutation
  }
}
