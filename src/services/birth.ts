import { supabase } from '@lib/supabase'
import type { Birth, BirthResponse, CreateTransactionResponse, UpdateTransactionResponse, DeleteTransactionResponse, GetBirthByIdResponse } from '@models/birth.model'


export const getBirths = async (): Promise<BirthResponse> => {
    try {
        const { data: births, error } = await supabase
            .from('birth')
            .select('*')

        if (error) throw new Error('Error fetching births: ' + error.message)

        return { birth: births as Birth[] ?? null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error fetching births: ' + err.message)
        return { birth: null }
    }
}
export const getBirthAnimals  = async (parentId: string) => {
try{
    if (!parentId) throw new Error('Parent ID is required')

    const { data, error } = await supabase
    .rpc('get_births_by_parent', { parent_uuid: parentId })

    console.log(data)
  if (error) {
      console.error('Error fetching births:', error.message)
      return null
    }

    return data
} catch (err) {
    console.error('Error fetching births:', err.message)
    return null
  }
}



export const getBirthById = async (id: string): Promise<GetBirthByIdResponse> => {
    try {
        const { data: birth, error } = await supabase
            .from('birth')
            .select('*')
            .eq('birth_id', id)

        if (error) throw new Error('Error fetching birth by id: ' + error.message)

        return { birth: birth?.[0] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error fetching birth by id: ' + err.message)
        return { birth: null }
    }
}

export const createBirth = async (data: Birth): Promise<CreateTransactionResponse> => {
    if (!data) throw new Error('Data is required')
    try {
        const { data: birth, error } = await supabase
            .from('birth')
            .insert(data)
            .select('*')

        if (error) throw new Error('Error creating birth: ' + error.message)
        return { birth: birth?.[0] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error creating birth: ' + err.message)
        return { birth: null }
    }
}

export const updateBirth = async (id: string, data: Partial<Birth>): Promise<UpdateTransactionResponse> => {
    try {
        const { data: updatedBirth, error } = await supabase
            .from('birth')
            .update(data)
            .eq('birth_id', id)
            .select('*')

        if (error) throw new Error('Error updating birth: ' + error.message)
        return { updatedBirth: updatedBirth?.[0] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error updating birth: ' + err.message)
        return { updatedBirth: null }
    }
}

export const deleteBirth = async (id: string): Promise<DeleteTransactionResponse> => {
    try {
        const { data, error } = await supabase
            .from('birth')
            .delete()
            .eq('birth_id', id)
            .select('*')

        if (error) throw new Error('Error deleting birth: ' + error.message)
        return { data: data as Birth[] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error deleting birth: ' + err.message)
        return { data: null }
    }
}
