import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from '@services/clients'

import type {
  Client,
  ClientResponse,
  ClientByIdResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse
} from '@models/clients.model'

// Hook para manejar clientes
export const useClients = () => {
  const queryClient = useQueryClient()

  // Obtener todos los clientes
  const clientsQuery = useQuery<ClientResponse, Error>({
    queryKey: ['clients'],
    queryFn: getClients
  })

  // Obtener un cliente por ID
  const useClient = (id: string) => {
    return useQuery<ClientByIdResponse, Error>({
      queryKey: ['client', id],
      queryFn: () => getClientById(id)
    })
  }

  // Crear un nuevo cliente
  const createClientMutation = useMutation<
    CreateTransactionResponse,
    Error,
    Client
  >({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })

  // Actualizar un cliente
  const updateClientMutation = useMutation<
    UpdateTransactionResponse,
    Error,
    Client
  >({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })

  // Eliminar un cliente
  const deleteClientMutation = useMutation<
    DeleteTransactionResponse,
    Error,
    string
  >({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })

  return {
    clients: clientsQuery.data,
    clientsError: clientsQuery.error,
    isClientsLoading: clientsQuery.isLoading,
    useClient,
    createClientMutation,
    updateClientMutation,
    deleteClientMutation
  }
}
