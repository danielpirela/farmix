import cron from 'node-cron'
import { getAnimals } from '@services/animals'
import { Animal, AnimalResponse } from '@models/animals.model'
import { createFeeding } from '@services/feeding'
import { Feeding } from '@models/feeding.model'

let isRunning = false

// Tarea programada para ejecutar todos los días a las 10:10 PM
cron.schedule('* 32 22 * * *', async () => {
  if (isRunning) {
    console.log('El cron job ya está en ejecución. Saliendo...')
    return
  }

  isRunning = true

  try {
    const animals: AnimalResponse = await getAnimals()
    if (!animals.animals) {
      console.error('No se encontraron animales.')
      return
    }

    // Iterar sobre cada animal y crear un registro de alimentación
    const feedingPromises = animals.animals.map(async (animal: Animal) => {
      const feedingData: Feeding = {
        animal_id: animal.animal_id || '',
        employee_id: '76c7a0b8-c947-44aa-93ec-2ca4f7825c46', // ID del empleado que realiza la alimentación
        date: new Date().toISOString().split('T')[0], // Fecha de alimentación
        quantity: Math.floor(Math.random() * 100) + 1, // Cantidad aleatoria de alimento
        type: 'Pasto' // Tipo de alimento
      }

      // Guardar el registro de alimentación
      const res = await createFeeding(feedingData)
      console.log('Registro de alimentación guardado:', res)
    })

    // Esperar a que todas las promesas se resuelvan
    await Promise.all(feedingPromises)

    console.log('Todos los registros de alimentación guardados exitosamente.')
  } catch (error) {
    console.error('Error al guardar los registros de alimentación:', error)
  } finally {
    isRunning = false
  }
})

export async function startCronJob() {
  console.log('Cron job configurado para guardar la alimentación diaria de los animales.')
}
