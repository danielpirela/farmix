import { supabase } from '@lib/supabase'
import type {
  HealthControl,
  HealthControlResponse,
  CreateHealthControlResponse,
  UpdateHealthControlResponse,
  DeleteHealthControlResponse
} from '@models/healthControl.model'

// Obtener todos los registros de control de salud
export const getHealthControls = async (): Promise<HealthControlResponse> => {
  try {
    const { data, error } = await supabase
      .from('health_control')
      .select('* , employees(*), animals(*)')

    if (error) throw new Error('Error fetching health controls: ' + error.message)

    return data as HealthControl[] || null
  } catch (err) {
    if (err instanceof Error) throw new Error('Error fetching health controls: ' + err.message)
    return null
  }
}

// Crear un nuevo registro de control de salud
export const createHealthControl = async (data: HealthControl): Promise<CreateHealthControlResponse> => {
  if (!data) throw new Error('Data is required')
  try {
    const { data: healthControl, error } = await supabase
      .from('health_control')
      .insert(data)
      .select('*')

    if (error) throw new Error('Error creating health control: ' + error.message)
    return { healthControl: healthControl?.[0] || null }
  } catch (err) {
    if (err instanceof Error) throw new Error('Error creating health control: ' + err.message)
    return { healthControl: null }
  }
}

// Actualizar un registro de control de salud
export const updateHealthControl = async (id: string, data: Partial<HealthControl>): Promise<UpdateHealthControlResponse> => {
  try {
    const { data: updatedHealthControl, error } = await supabase
      .from('health_control')
      .update(data)
      .eq('id', id)
      .select('*')

    if (error) throw new Error('Error updating health control: ' + error.message)
    return { updatedHealthControl: updatedHealthControl?.[0] || null }
  } catch (err) {
    if (err instanceof Error) throw new Error('Error updating health control: ' + err.message)
    return { updatedHealthControl: null }
  }
}

// Eliminar un registro de control de salud
export const deleteHealthControl = async (id: string): Promise<DeleteHealthControlResponse> => {
  try {
    const { data, error } = await supabase
      .from('health_control')
      .delete()
      .eq('id', id)
      .select('*')

    if (error) throw new Error('Error deleting health control: ' + error.message)
    return { data: data as HealthControl[] || null }
  } catch (err) {
    if (err instanceof Error) throw new Error('Error deleting health control: ' + err.message)
    return { data: null }
  }
}
