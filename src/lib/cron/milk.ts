import cron from 'node-cron'
import { calculateAverageMilk } from '@utils/averageMilkProduction'
import { getAnimals } from '@services/animals'
import { Animal, AnimalResponse } from '@models/animals.model'
import { createMilkProduction, getMilkProductionsByMonth } from '@services/milk'
import { MilkProduction } from '@models/milkProduction.model'

// Tarea programada para ejecutar todos los días a la medianoche
cron.schedule('0 10 * * *', async () => {
  try {
    const animals : AnimalResponse = await getAnimals()
    if (!animals.animals) {
      console.error('No se encontraron animales.')
      return
    }

    const filteredAnimals = animals.animals.filter((animal : Animal)  => animal.type === 'Vaca')
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
    await createMilkProduction(dailyProductions)
    console.log('Producción diaria de leche guardada exitosamente.')
  } catch (error) {
    console.error('Error al guardar la producción diaria de leche:', error)
  }
})

export async function startCronJob() {
  console.log('Cron job configurado para guardar la producción diaria de leche.')
}
