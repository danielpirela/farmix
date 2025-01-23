import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getTransactionById,
  getFinances,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '@services/finances'

import type {
  Finance,
  TransactionResponse,
  FinancesResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse
} from '@models/finances.model'

// Hook para manejar las transacciones
export const useFinances = () => {
  const queryClient = useQueryClient()

  // Obtener todas las finanzas
  const financesQuery = useQuery<FinancesResponse, Error>({
    queryKey: ['finances'],
    queryFn: getFinances
  })

  // Hook para obtener una transacción por ID
  const useTransaction = (id: string) => {
    return useQuery<TransactionResponse, Error>({
      queryKey: ['transaction', id],
      queryFn: () => getTransactionById(id)
    })
  }

  // Crear una nueva transacción
  const createTransactionMutation = useMutation<
    CreateTransactionResponse,
    Error,
    Finance
  >({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finances'] })
    }
  })

  // Actualizar una transacción
  const updateTransactionMutation = useMutation<
    UpdateTransactionResponse,
    Error,
    { id: string; data: Partial<Finance> }
  >({
    mutationFn: ({ id, data }) => updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finances'] })
    }
  })

  // Eliminar una transacción
  const deleteTransactionMutation = useMutation<
    DeleteTransactionResponse,
    Error,
    string
  >({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finances'] })
    }
  })

  return {
    finances: financesQuery.data,
    financesError: financesQuery.error,
    isFinancesLoading: financesQuery.isLoading,
    useTransaction,
    createTransactionMutation,
    updateTransactionMutation,
    deleteTransactionMutation
  }
}
