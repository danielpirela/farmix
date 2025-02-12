export interface Feeding {
  id?: string
  animal_id: string
  employee_id?: string
  date?: string
  quantity: number
  type: string
}

export type FeedingResponse = Feeding[] | null | undefined

export type CreateFeedingResponse = Feeding | null | undefined

export type UpdateFeedingResponse = Feeding | null | undefined

export type DeleteFeedingResponse = Feeding | null | undefined

export type GetFeedingResponse = Feeding | null | undefined


