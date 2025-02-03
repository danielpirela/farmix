import { supabase } from '@lib/supabase'
import { CreateTransactionResponse, DeleteTransactionResponse, MilkProduction, MilkProductionResponse, UpdateTransactionResponse} from '@models/milkProduction.model'

export const createMilkProduction = async (productions: MilkProduction[]): Promise<CreateTransactionResponse> => {
    try {
        const { data,error } = await supabase
            .from('milk_production')
            .insert(productions)

        if (error) throw new Error('Error creating milk production: ' + error.message)

        return { milk_production: data?.[0] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error creating milk production: ' + err.message)
            return { milk_production: null }
    }
}

export const getMilkProductions = async (): Promise<MilkProductionResponse> => {
    try {
        const { data, error } = await supabase
            .from('milk_production')
            .select('*, animals(*)')

        if (error) throw new Error('Error getting milk productions: ' + error.message)
        return { milk_production: data as MilkProduction[] }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error getting milk productions: ' + err.message)
        return { milk_production: null }
    }
}


 export const getMilkProductionsByMonth = async () => {
     console.log('getMilkProductionsByMonth')

     try {
         const { data, error } = await supabase
            .rpc('group_by_month')

            console.log(data)
         if (error) throw new Error('Error getting milk productions: ' + error.message)
         return data
     } catch (err) {
         if (err instanceof Error) throw new Error('Error getting milk productions: ' + err.message)
         return { milk_production: null }
     }
 }

export const getMilkProductionByAnimalId = async (animalId: string): Promise<MilkProductionResponse | undefined> => {
    try {
        const { data, error } = await supabase
            .from('milk_production')
            .select('*, animals(*)')
           .eq('animal_id', animalId)
        if (error) throw new Error('Error getting milk production by animal id: ' + error.message)
            return { milk_production: data as MilkProduction[] }
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error getting milk production by animal id: ' + err.message)
        return undefined
    }
}

export const updateMilkProduction = async (id: string, production: MilkProduction): Promise<UpdateTransactionResponse> => {
    try {
        const { error } = await supabase
           .from('milk_production')
           .update(production)
           .eq('milk_production_id', id)
           .select('*')

        if (error) throw new Error('Error updating milk production: ' + error.message)
        return { updatedMilkProduction: production }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error updating milk production: ' + err.message)
        return { updatedMilkProduction: null }
    }
}

export const deleteMilkProduction = async (productionId: string): Promise<DeleteTransactionResponse> => {
    try {
        const { data ,error } = await supabase
           .from('milk_production')
           .delete()
           .eq('production_id', productionId)
           .select('*')
        if (error) throw new Error('Error deleting milk production: ' + error.message)
        return { data: data as MilkProduction[] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error deleting milk production: ' + err.message)
        return { data: null }
    }
}
