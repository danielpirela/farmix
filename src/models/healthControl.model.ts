import { Animal } from './animals.model'
import { Employee } from './types'

export interface HealthControl {
    id? : string
    animal_id : string
    checkup_date : string
    diagnosis : string
    treatment : string
    employee_id : string
    update_date : string
    employee? : Employee
    animal? : Animal
}

export type HealthControlResponse = HealthControl[] | undefined | null


export interface HealthControlByIdResponse {
    health_control : HealthControl | null | undefined
}

export interface CreateHealthControlResponse {
    health_control : HealthControl | null | undefined
}

export interface UpdateHealthControlResponse {
    updatedHealthControl : HealthControl | null | undefined
}

export interface DeleteHealthControlResponse {
    data : HealthControl | null | undefined
}
