import { supabase } from '@lib/supabase'
import { Client, ClientByIdResponse, CreateTransactionResponse, DeleteTransactionResponse, UpdateTransactionResponse } from '@models/clients.model'
export  async function getClients () {
    try {
        const { data, error } = await supabase
            .from('clients')
            .select('*')

        if (error) throw new Error('Error getting clients: ' + error.message)
        return { clients: data as Client[] }
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error getting clients: ' + err.message)
        return { clients: null }
    }
}
export const getClientById = async (id: string): Promise<ClientByIdResponse> => {
    try {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('id', id)
        if (error) throw new Error('Error getting client by id: ' + error.message)
        return { client: data?.[0] || null}
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error getting client by id: ' + err.message)
        return { client: null }
    }
}


export const createClient = async (client: Client): Promise<CreateTransactionResponse> => {
    try {
        const { data, error } = await supabase
            .from('clients')
            .insert(client)
        if (error) throw new Error('Error creating client: ' + error.message)
        return { client: data?.[0] || null}
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error creating client: ' + err.message)
        return { client: null }
    }
}

export const updateClient = async (client: Client): Promise<UpdateTransactionResponse> => {
    try {
        const { data, error } = await supabase
            .from('clients')
            .update(client)
            .eq('id', client.id)
        if (error) throw new Error('Error updating client: ' + error.message)
        return { updatedClient: data || null }
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error updating client: ' + err.message)
        return { updatedClient: null }
    }
}

export const deleteClient = async (id: string): Promise<DeleteTransactionResponse> => {
    try {
        const { data, error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id)
        if (error) throw new Error('Error deleting client: ' + error.message)
        return { data }
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error deleting client: ' + err.message)
        return { data: null }
    }
}
