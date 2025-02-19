import { getActivities, updateActivity } from '@services/activities'
import type { Activity } from '../models/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UpdateTransactionResponse } from '@models/activities.model'

export function useActivities(id?: string | null) {
  const queryClient = useQueryClient()

  const { data, isPending, isError, refetch } = useQuery<
    Activity[] | Activity | null
  >({
    queryKey: ['activities', id],
    queryFn: () => getActivities(id ?? null)
  })

  const updateSupplierMutation = useMutation<
    UpdateTransactionResponse,
    Error,
    { id: string; data: Partial<Activity> }
  >({
    mutationFn: ({ id, data }) => updateActivity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', id] })
    }
  })
  return {
    useUpdateActivity: updateSupplierMutation,
    activities: data,
    isPending,
    isError,
    refetch
  }
}
