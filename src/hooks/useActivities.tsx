import { getActivities } from '@services/activities'
import type { Activity } from '../models/types'
import { useQuery } from '@tanstack/react-query'

export function useActivities(id?: string | null) {
  const { data, isPending, isError, refetch } = useQuery<
    Activity[] | Activity | null
  >({
    queryKey: ['activities', id],
    queryFn: () => getActivities(id ?? null)
  })

  return {
    activities: data,
    isPending,
    isError,
    refetch
  }
}
