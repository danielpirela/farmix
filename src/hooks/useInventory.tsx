'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory
} from '@services/inventory'

import type {
  Inventory,
  InventoryResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse
} from '@models/inventory.model'

// Hook para manejar el inventario
export const useInventory = () => {
  const queryClient = useQueryClient()

  // Obtener todo el inventario
  const inventoryQuery = useQuery<InventoryResponse, Error>({
    queryKey: ['inventory'],
    queryFn: getInventory
  })

  // Crear un nuevo inventario
  const createInventoryMutation = useMutation<
    CreateTransactionResponse,
    Error,
    Inventory
  >({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
    }
  })

  // Actualizar un inventario
  const updateInventoryMutation = useMutation<
    UpdateTransactionResponse,
    Error,
    { id: string; data: Partial<Inventory> }
  >({
    mutationFn: ({ id, data }) => updateInventory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
    }
  })

  // Eliminar un inventario
  const deleteInventoryMutation = useMutation<
    DeleteTransactionResponse,
    Error,
    string
  >({
    mutationFn: deleteInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
    }
  })

  return {
    inventory: inventoryQuery.data,
    inventoryError: inventoryQuery.error,
    isInventoryLoading: inventoryQuery.isLoading,
    createInventoryMutation,
    updateInventoryMutation,
    deleteInventoryMutation
  }
}
