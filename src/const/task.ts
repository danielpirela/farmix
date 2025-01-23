export type ActivityOptions = 'Alimentar' | 'Ordeñar' | 'Limpiar establos' | 'Revisar salud' | 'Registrar datos' | 'Organizar' | 'Otro'
export type StatusAtivitiesOptions = 'En progreso' | 'Terminada'

export type Activity = {
  type: ActivityOptions;
  description: string;
}

export const statusAtivitiesOptions: StatusAtivitiesOptions[] = [
  'En progreso',
  'Terminada',
]

export const activitiesOptions: Activity[] = [
  { type: 'Alimentar', description: 'Alimentar animales' },
  { type: 'Ordeñar', description: 'Limpiar y ordenar los establecimientos' },
  { type: 'Limpiar establos', description: 'Limpiar y ordenar los establecimientos' },
  { type: 'Revisar salud', description: 'Revisar la salud y el estado de los animales' },
  { type: 'Registrar datos', description: 'Registrar los datos de las actividades realizadas' },
  { type: 'Organizar', description: 'Organizar y administrar las actividades' },
  { type: 'Otro', description: 'Describir la actividad realizada' }
]
