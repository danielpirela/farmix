export interface Animal {
  animal_id?: string
  mother_id?: string
  father_id?: string
  name: string
  type: string
  breed: string
  birth_date: string
  health_status: string
  location: string
  weight: number
  daily_milk_production: number
  life_stage: string
  gender: string
  child_id: string
  parents_id: string[]
}

export interface AnimalResponse {
  animals: Animal[] | null | undefined
}

export interface CreateTransactionResponse {
  animal: Animal | null | undefined
}

export interface UpdateTransactionResponse {
  updatedAnimal: Animal | null | undefined
}

export interface DeleteTransactionResponse {
  data: Animal[] | null | undefined
}
