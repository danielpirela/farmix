'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from '@services/suppliers'

import type {
  Supplier,
  SupplierResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse
} from '@models/suppliers.model'

// Hook para manejar los proveedores
export const useSuppliers = () => {
  const queryClient = useQueryClient()

  // Obtener todos los proveedores
  const suppliersQuery = useQuery<SupplierResponse, Error>({
    queryKey: ['suppliers'],
    queryFn: getSuppliers
  })

  // Crear un nuevo proveedor
  const createSupplierMutation = useMutation<
    CreateTransactionResponse,
    Error,
    Supplier
  >({
    mutationFn: createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    }
  })

  // Actualizar un proveedor
  const updateSupplierMutation = useMutation<
    UpdateTransactionResponse,
    Error,
    { id: string; data: Partial<Supplier> }
  >({
    mutationFn: ({ id, data }) => updateSupplier(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    }
  })

  // Eliminar un proveedor
  const deleteSupplierMutation = useMutation<
    DeleteTransactionResponse,
    Error,
    string
  >({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    }
  })

  return {
    suppliers: suppliersQuery.data,
    suppliersError: suppliersQuery.error,
    isSuppliersLoading: suppliersQuery.isLoading,
    createSupplierMutation,
    updateSupplierMutation,
    deleteSupplierMutation
  }
}
