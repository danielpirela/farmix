import { supabase } from '@lib/supabase'
import type { Inventory, InventoryResponse, CreateTransactionResponse, UpdateTransactionResponse, DeleteTransactionResponse } from '@models/inventory.model'

export const getInventory = async (): Promise<InventoryResponse> => {
    try {
        const { data: inventory, error } = await supabase
        .from('inventory')
        .select('*, suppliers(*)')

        if (error) throw new Error('Error fetching inventory: ' + error.message)

        return { inventory: inventory as Inventory[] ?? null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error fetching inventory: ' + err.message)
        return { inventory: null }
    }
}

export const createInventory = async (data: Inventory): Promise<CreateTransactionResponse> => {

    if (!data) throw new Error('Data is required')
    try {
        const { data: inventory, error } = await supabase
        .from('inventory')
        .insert(data)
        .select('*')

        if (error) throw new Error('Error creating inventory: ' + error.message)
        return { inventory: inventory?.[0] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error creating inventory: ' + err.message)
        return { inventory: null }
    }
}

export const updateInventory = async (id: string, data: Partial<Inventory>): Promise<UpdateTransactionResponse> => {
    try {
        const { data: updatedInventory, error } = await supabase
            .from('inventory')
            .update(data)
            .eq('product_id', id)
            .select('*')

        if (error) throw new Error('Error updating inventory: ' + error.message)
        return { updatedTransaction: updatedInventory?.[0] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error updating inventory: ' + err.message)
        return { updatedTransaction: null }
    }
}

export const deleteInventory = async (id: string): Promise<DeleteTransactionResponse> => {
    try {
        const { data, error } = await supabase
        .from('inventory')
        .delete()
        .eq('product_id', id)
        .select('*')

        if (error) throw new Error('Error deleting inventory: ' + error.message)
        return { data: data as Inventory[] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error deleting inventory: ' + err.message)
        return { data: null }
    }
}
