import { useMutation } from '@tanstack/react-query'
import { ActivityData, createActivity } from '@services/activities'

export function useCreateActivity() {
  const { mutate, data, isError, isPending } = useMutation<
    ActivityData,
    Error,
    ActivityData
  >({
    mutationKey: ['createActivity'],
    mutationFn: createActivity,
    onError: (error) => {
      console.error('Error updating profile:', error.message)
    }
  })

  return {
    created: data,
    mutate,
    isOnError: isError,
    isLoading: isPending
  }
}
