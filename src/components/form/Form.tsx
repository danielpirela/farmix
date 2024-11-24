import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
export function Form({ children, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="grid gap-6 mb-6 md:grid-cols-2">
      {children}
    </form>
  )
}
