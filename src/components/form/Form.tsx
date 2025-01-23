'use client'
import { ReactNode, useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

interface Props {
  children: ReactNode
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  defaultValues?: Record<string, string>
  methods: any
}
export function Form({ children, onSubmit, defaultValues, methods }: Props) {
  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues)
    }
  }, [defaultValues, methods])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="grid gap-6 mb-6 md:grid-cols-2 overflow-y-auto max-h-96"
      >
        {children}
      </form>
    </FormProvider>
  )
}
