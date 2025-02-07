export interface Birth {
    mother_id: string
    child_id: string
    created_at: string
    updated_at: string
}

export interface BirthResponse {
    birth: Birth[] | null | undefined
}

export interface CreateTransactionResponse {
    birth: Birth | null
}

export interface GetBirthByIdResponse {
    birth: Birth | null
}

export interface UpdateTransactionResponse {
    updatedBirth: Birth | null
}

export interface DeleteTransactionResponse {
    data: Birth[] | null
}
