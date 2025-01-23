import { supabase } from '@lib/supabase'
import type {
  Supplier,
  SupplierResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse
} from '@models/suppliers.model'

// URL base para la API de proveedores
const BASE_URL = 'suppliers'

// Obtener todos los proveedores
export const getSuppliers = async (): Promise<SupplierResponse> => {
  try {
    const { data: suppliers, error } = await supabase
      .from(BASE_URL)
      .select('*')

    if (error) throw new Error('Error fetching suppliers: ' + error.message)

    return { suppliers: suppliers as Supplier[] ?? null }
  } catch (err) {
    if (err instanceof Error) throw new Error('Error fetching suppliers: ' + err.message)
    return { suppliers: null }
  }
}

// Crear un nuevo proveedor
export const createSupplier = async (supplier: Supplier): Promise<CreateTransactionResponse> => {
  if (!supplier) throw new Error('Supplier data is required')
  try {
    const { data: createdSupplier, error } = await supabase
      .from(BASE_URL)
      .insert(supplier)
      .select('*')

    if (error) throw new Error('Error creating supplier: ' + error.message)
    return { supplier: createdSupplier?.[0] || null }
  } catch (err) {
    if (err instanceof Error) throw new Error('Error creating supplier: ' + err.message)
    return { supplier: null }
  }
}

// Actualizar un proveedor
export const updateSupplier = async (id: string, data: Partial<Supplier>): Promise<UpdateTransactionResponse> => {
  try {
    const { data: updatedSupplier, error } = await supabase
      .from(BASE_URL)
      .update(data)
      .eq('supplier_id', id)
      .select('*')

    if (error) throw new Error('Error updating supplier: ' + error.message)
    return { updatedSupplier: updatedSupplier?.[0] || null }
  } catch (err) {
    if (err instanceof Error) throw new Error('Error updating supplier: ' + err.message)
    return { updatedSupplier: null }
  }
}

// Eliminar un proveedor
export const deleteSupplier = async (id: string): Promise<DeleteTransactionResponse> => {
  try {
    const { data, error } = await supabase
      .from(BASE_URL)
      .delete()
      .eq('supplier_id', id)
      .select('*')

    if (error) throw new Error('Error deleting supplier: ' + error.message)
    return { data: data as Supplier[] || null }
  } catch (err) {
    if (err instanceof Error) throw new Error('Error deleting supplier: ' + err.message)
    return { data: null }
  }
}

