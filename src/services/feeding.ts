import { supabase } from '@lib/supabase'
import type {
  Feeding,
  FeedingResponse,
  CreateFeedingResponse,
  UpdateFeedingResponse,
  DeleteFeedingResponse
} from '@models/feeding.model.ts'

// Obtener todos los registros de alimentación
export const getFeedings = async (): Promise<FeedingResponse> => {
  try {
    const { data, error } = await supabase
      .from('feeding')
      .select('* , animals(*)')

    if (error) throw new Error('Error fetching feedings: ' + error.message)

    return data as Feeding[] || null
  } catch (err) {
    if (err instanceof Error) throw new Error('Error fetching feedings: ' + err.message)
    return null
  }
}

// Crear un nuevo registro de alimentación
export const createFeeding = async (data: Feeding): Promise<CreateFeedingResponse> => {
  if (!data) throw new Error('Data is required')
  try {
    const { data: feeding, error } = await supabase
      .from('feeding')
      .insert(data)
      .select('*')

    if (error) throw new Error('Error creating feeding: ' + error.message)
    return feeding?.[0] || null
  } catch (err) {
    if (err instanceof Error) throw new Error('Error creating feeding: ' + err.message)
    return null
  }
}

// Actualizar un registro de alimentación
export const updateFeeding = async (id: string, data: Partial<Feeding>): Promise<UpdateFeedingResponse> => {
  try {
    const { data: updatedFeeding, error } = await supabase
      .from('feeding')
      .update(data)
      .eq('feeding_id', id)
      .select('*')

    if (error) throw new Error('Error updating feeding: ' + error.message)
    return updatedFeeding?.[0] || null
  } catch (err) {
    if (err instanceof Error) throw new Error('Error updating feeding: ' + err.message)
    return null
  }
}

// Eliminar un registro de alimentación
export const deleteFeeding = async (id: string): Promise<DeleteFeedingResponse> => {
  try {
    const { data, error } = await supabase
      .from('feeding')
      .delete()
      .eq('feeding_id', id)
      .select('*')

    if (error) throw new Error('Error deleting feeding: ' + error.message)
    return data as Feeding || null
  } catch (err) {
    if (err instanceof Error) throw new Error('Error deleting feeding: ' + err.message)
    return null
  }
}
