import { Animal } from './animals.model'

export interface MilkProduction {
    production_id?: string
    animal_id: string
    animals?: Animal
    production_date: string
    milk_quantity: number
    employee_id: string
}

export interface MilkProductionResponse {
    milk_production: MilkProduction[] | null | undefined
}

export interface CreateTransactionResponse {
    milk_production: MilkProduction | null | undefined
}

export interface UpdateTransactionResponse {
    updatedMilkProduction: MilkProduction | null | undefined
}

export interface DeleteTransactionResponse {
    data: MilkProduction[] | null | undefined
}

