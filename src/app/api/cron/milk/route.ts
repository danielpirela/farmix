import { supabase } from '@lib/supabase'
import { Animal } from '@models/animals.model'
import { Feeding } from '@models/feeding.model'
import { MilkProduction } from '@models/milkProduction.model'
import { createMilkProduction } from '@services/milk'
import { calculateAverageGrassIntake, calculateAverageMilk } from '@utils/averageMilkProduction'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
    const { data : animals, error } = await supabase.from('animals').select('*')
    if (!animals) {
      console.error('No se encontraron animales.')
      return
    }

    const filteredAnimals = animals.filter((animal : Animal)  => animal.type === 'Vaca' && animal.life_stage !== 'Becerro')
    const dailyProductions = filteredAnimals.map((animal : Animal) => {
      const milkCalculated = calculateAverageMilk({
        weight: Number(animal.weight),
        birthDate: animal.birth_date,
        breed: animal.breed
      })
      return {
        animal_id: animal.animal_id || '',
        production_date: new Date().toISOString().split('T')[0],
        milk_quantity: Number(milkCalculated),
        employee_id: '76c7a0b8-c947-44aa-93ec-2ca4f7825c46',
      } as MilkProduction
    })

    const animalPromise = await createMilkProduction(dailyProductions)

    // Iterar sobre cada animal y crear un registro de alimentación
    const feedingPromises = animals.filter((animal : Animal)  => animal.life_stage !== 'Becerro').map(async (animal: Animal) => {


      const FoodCalculated = calculateAverageGrassIntake({
        weight: Number(animal.weight),
        birthDate: animal.birth_date,
        breed: animal.breed
      })
        const feedingData: Feeding = {
        animal_id: animal.animal_id || '',
        employee_id: '76c7a0b8-c947-44aa-93ec-2ca4f7825c46', // ID del empleado que realiza la alimentación
        date: new Date().toISOString().split('T')[0], // Fecha de alimentación
        quantity: Number(FoodCalculated), // Cantidad aleatoria de alimento
        type: 'Pasto' // Tipo de alimento
      }

      // Guardar el registro de alimentación
      const { data: feeding, error: errorFeeding } = await supabase
        .from('feeding')
        .insert(feedingData)
        .select('*')

      console.log('Registro de alimentación guardado:', feeding)
      if (errorFeeding) throw new Error('Error fetching animals: ' + errorFeeding.message)
    })


    // Esperar a que todas las promesas se resuelvan
    const feedings = await Promise.all(feedingPromises)
    if (error) throw new Error('Error fetching animals: ' + error.message)

    return new NextResponse(feedings,animalPromise)
  } catch (error) {
      console.error('Error al guardar los registros de alimentación:', error)
    return new NextResponse(error)
}
}
