import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getHealthControls,
  createHealthControl,
  updateHealthControl,
  deleteHealthControl
} from '@services/healthControl'
import type {
  HealthControl,
  HealthControlResponse,
  CreateHealthControlResponse,
  UpdateHealthControlResponse,
  DeleteHealthControlResponse
} from '@models/healthControl.model'

// Hook para manejar los controles de salud
export const useHealthControl = () => {
  const queryClient = useQueryClient()

  // Obtener todos los controles de salud
  const healthControlsQuery = useQuery<HealthControlResponse, Error>({
    queryKey: ['healthControls'],
    queryFn: getHealthControls
  })

  // Crear un nuevo control de salud
  const createHealthControlMutation = useMutation<
    CreateHealthControlResponse,
    Error,
    HealthControl
  >({
    mutationFn: createHealthControl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthControls'] })
    }
  })

  // Actualizar un control de salud
  const updateHealthControlMutation = useMutation<
    UpdateHealthControlResponse,
    Error,
    { id: string; data: Partial<HealthControl> }
  >({
    mutationFn: ({ id, data }) => updateHealthControl(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthControls'] })
    }
  })

  // Eliminar un control de salud
  const deleteHealthControlMutation = useMutation<
    DeleteHealthControlResponse,
    Error,
    string
  >({
    mutationFn: deleteHealthControl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthControls'] })
    }
  })

  return {
    healthControls: healthControlsQuery.data,
    healthControlsError: healthControlsQuery.error,
    isHealthControlsLoading: healthControlsQuery.isLoading,
    createHealthControlMutation,
    updateHealthControlMutation,
    deleteHealthControlMutation
  }
}
