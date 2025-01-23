import { Supplier } from './suppliers.model'

export interface Inventory {
    product_id?: string
    name: string
    description: string
    quantity_available: number
    unit_cost: number
    suppliers?: Supplier[]
    supplier_id: string
}

export interface InventoryResponse {
    inventory: Inventory[] | null | undefined
}

export interface CreateTransactionResponse {
    inventory: Inventory | null | undefined
}


export interface UpdateTransactionResponse {
    updatedTransaction: Inventory | null | undefined
}


export interface DeleteTransactionResponse {
    data: Inventory[] | null | undefined
}
