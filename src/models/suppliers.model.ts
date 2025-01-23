export interface Supplier {
    supplier_id?: string;
    name: string;
    contact: string;
    phone: string;
    email: string;
    address: string;
    supplied_products?: string;
}

export interface SupplierResponse {
    suppliers: Supplier[] | null | undefined
}

export interface CreateTransactionResponse {
    supplier: Supplier | null | undefined
}

export interface UpdateTransactionResponse {
    updatedSupplier: Supplier | null | undefined
}

export interface DeleteTransactionResponse {
    data: Supplier[] | null | undefined
}
