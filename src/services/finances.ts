import { supabase } from '@lib/supabase'
import { Finance, TransactionResponse, FinancesResponse, CreateTransactionResponse, UpdateTransactionResponse, DeleteTransactionResponse } from '@models/finances.model'

export const getTransactionById = async (id: string): Promise<TransactionResponse> => {
    try {
        const { data: transactions, error } = await supabase
            .from('finances')
            .select('*')
            .eq('transaction_id', id)

        if (error) throw new Error('Error fetching transaction: ' + error.message)

        return { transaction: transactions?.[0] || null }

    } catch (err) {
        if (err instanceof Error) throw new Error('Error fetching transaction: ' + err.message)
        return { transaction: null}
    }
}

export const getFinances = async (): Promise<FinancesResponse> => {
    try {

        const { data: finances, error } = await supabase
        .from('finances')
        .select('*, employees(*), clients(*), suppliers(*)')
        console.log(finances)

        if (error) throw new Error('Error fetching finances: ' + error.message)

        return { finances: finances as Finance[] ?? null}
    } catch (err) {
        if (err instanceof Error) throw new Error('Error fetching finances: ' + err.message)
        return { finances: null }
    }
}

export const createTransaction = async (data: Finance): Promise<CreateTransactionResponse> => {
    if (!data) throw new Error('Data is required')
    try {
        const { data: transaction, error } = await supabase
        .from('finances')
        .insert(data)
        .select('*')

        if (error)throw new Error('Error creating transaction: ' + error.message)
        return { transaction : transaction?.[0] || null}
    } catch (err) {
        if (err instanceof Error) throw new Error('Error creating transaction: ' + err.message)
        return { transaction : null}
    }
}

export const updateTransaction = async (id: string, data: Partial<Finance>): Promise<UpdateTransactionResponse> => {
    try {
        const { data: updatedTransaction, error } = await supabase
            .from('finances')
            .update(data)
            .eq('transaction_id', id)
            .select('*')

        if (error) throw new Error('Error updating transaction: ' + error.message)
        return { updatedTransaction: updatedTransaction?.[0] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error updating transaction: ' + err.message)
        return { updatedTransaction: null }
    }
}

export const deleteTransaction = async (id: string): Promise<DeleteTransactionResponse> => {
    try {
        const { data, error } = await supabase
        .from('finances')
        .delete()
        .eq('transaction_id', id)
        .select('*')

        if (error) throw new Error('Error deleting transaction: ' + error.message)
        return { data : data as Finance[] || null }

        } catch (err) {
            if (err instanceof Error) throw new Error('Error deleting transaction: ' + err.message)
            return { data : null }
        }
    }
