import { Client } from '@utils/validations'
import { Supplier } from './suppliers.model'

export type FinanceType  = 'Ingreso' | 'Egreso'

export interface Finance {
    transaction_id?: string
    transaction_date: string
    type: FinanceType
    amount: number
    method: string
    description: string
    category: string
    employee_id: string
    supplier_id?: string
    client_id?: string
    suppliers?: Supplier | null | undefined
    clients?: Client | null | undefined
}

export interface TransactionResponse {
    transaction: Finance | null | undefined
}


export interface FinancesResponse {
    finances: Finance[] | null | undefined
}

export interface CreateTransactionResponse {
    transaction: Finance | null | undefined
}


export interface UpdateTransactionResponse {
    updatedTransaction: Finance | null | undefined
}


export interface DeleteTransactionResponse {
    data: Finance[] | null | undefined
}

