export type BreedOptions = 'Holstein' | 'Jersey' | 'Angus' | 'Hereford' | 'Charolais' | 'Simmental'
export type TypeOptions = 'Vaca' | 'Toro'
export type HealthStatus = 'Sana' | 'Enferma'
export type LifeStage = 'Joven' | 'Adulto' | 'Becerro'

export const lifeStageOptions : LifeStage[] = [
    'Joven',
    'Adulto',
    'Becerro'
]

export const typeOptions: TypeOptions[] = [
    'Vaca',
    'Toro',
]

export const healthStatusOptions: HealthStatus[] = [
    'Sana',
    'Enferma'
]

export const breedOptions: BreedOptions[] = [
    'Holstein',
    'Jersey',
    'Angus',
    'Hereford',
    'Charolais',
    'Simmental',
]
