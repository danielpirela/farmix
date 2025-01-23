import { supabase } from '@lib/supabase'

export const getActivities = async (id: string | null) => {
  if (id !== null) {
    const { data: Activities } = await supabase
      .from('activities')
      .select('*, employees(*, roles(role_name))')
      .eq('employee_id', id)

    return Activities
  }

  const { data: Activities } = await supabase
    .from('activities')
    .select('*, employees(*)')
  return Activities
}

export interface ActivityData {
  employee_id: string
  type?: string
  description?: string
  status?: string
}

export const createActivity = async (data: ActivityData) => {
  try {
    const { data: Activities, error } = await supabase
      .from('activities')
      .insert(data)
      .select('*')

    if (error) {
      throw new Error('Error al crear la actividiad')
    }

    if (!Activities) {
      throw new Error('No se pudo crear la actividad')
    }

    return Activities
  } catch (err) {
    console.error('Error creating activity', err)
    throw err
  }
}

export const updateActivity = async (data: ActivityData, id: string) => {
  try {
    if (data && id) {
      const { data: Activities, error } = await supabase
        .from('activities')
        .update(data)
        .eq('activities_id', id)
        .select('*')

      if (error) {
        throw new Error('Error al actualizar la actividad')
      }

      if (!Activities) {
        throw new Error('No se pudo actualizar la actividad')
      }

      return Activities
    }
  } catch (err) {
    console.error('Error updating activity', err)
    throw err
  }
}
