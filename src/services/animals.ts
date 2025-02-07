import { supabase } from '@lib/supabase'
import type { Animal, AnimalResponse, CreateTransactionResponse, UpdateTransactionResponse, DeleteTransactionResponse } from '@models/animals.model'

export const getAnimals = async (): Promise<AnimalResponse> => {
    try {
        const { data: animals, error } = await supabase
            .from('animals')
            .select('*')

        if (error) throw new Error('Error fetching animals: ' + error.message)

        return { animals: animals as Animal[] ?? null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error fetching animals: ' + err.message)
        return { animals: null }
    }
}

export const createAnimal = async (data: Animal): Promise<CreateTransactionResponse> => {
    if (!data) throw new Error('Data is required')
    try {
        const { data: animal, error } = await supabase
            .from('animals')
            .insert(data)
            .select('*')

        console.log(animal)

        if (!animal) return { animal: null }

        const birthData = {
            mother_id: await animal[0].parents_id[0],
            child_id: await animal[0].animal_id,
        }
        const { data: birth, error: parentsError } = await supabase
        .from('birth')
        .insert(birthData)
        .select('*')

        console.log(parentsError , error)

        console.log(birth)





        if (error) throw new Error('Error creating animal: ' + error.message)
        return { animal: animal?.[0] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error creating animal: ' + err.message)
        return { animal: null }
    }
}

export const updateAnimal = async (id: string, data: Partial<Animal>): Promise<UpdateTransactionResponse> => {
    try {
        const { data: updatedAnimal, error } = await supabase
            .from('animals')
            .update(data)
            .eq('animal_id', id)
            .select('*')

        if (error) throw new Error('Error updating animal: ' + error.message)
        return { updatedAnimal: updatedAnimal?.[0] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error updating animal: ' + err.message)
        return { updatedAnimal: null }
    }
}

export const deleteAnimal = async (id: string): Promise<DeleteTransactionResponse> => {
    try {
        const { data, error } = await supabase
            .from('animals')
            .delete()
            .eq('animal_id', id)
            .select('*')

        if (error) throw new Error('Error deleting animal: ' + error.message)
        return { data: data as Animal[] || null }
    } catch (err) {
        if (err instanceof Error) throw new Error('Error deleting animal: ' + err.message)
        return { data: null }
    }
}
