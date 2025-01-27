'use client'
import { Button } from '@components/form/Button'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { Modal } from '@components/form/Modal'
import Table from '@components/tables/Table'
import { useAnimals } from '@hooks/useAnimals'
import { Animal } from '@models/animals.model'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimalForm, animalSchema } from '@utils/validations' // Asegúrate de tener un esquema de validación para los animales
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { Select } from '@components/form/Select'
import {
  breedOptions,
  healthStatusOptions,
  lifeStageOptions,
  typeOptions
} from '../../../../const/animals'
import { Option } from '@components/form/Option'
import { PlusIcon } from '@components/icons/DashboardIcon'
import { calculateAverageMilk } from '@utils/averageMilkProduction'

const AnimalsPage = () => {
  const [isFormModalOpen, setFormModalOpen] = useState(false)

  const {
    animals,
    animalsError,
    isAnimalsLoading,
    createAnimalMutation,
    updateAnimalMutation,
    deleteAnimalMutation
  } = useAnimals()

  const columns = [
    { header: 'Id', accessorKey: 'animal_id' },
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Tipo', accessorKey: 'type' },
    { header: 'Raza', accessorKey: 'breed' },
    { header: 'Estado de salud', accessorKey: 'health_status' },
    { header: 'Ubicación', accessorKey: 'location' },
    { header: 'Peso', accessorKey: 'weight' }
  ]

  const handleCreateAnimal: SubmitHandler<Animal> = async (data) => {
    if (!data) return
    try {
      const {
        breed,
        type,
        weight,
        name,
        health_status,
        location,
        birth_date,
        life_stage,
        child_id,
        mother_id,
        father_id
      } = data

      const milkCalculated = calculateAverageMilk({
        weight: Number(weight),
        birthDate: birth_date,
        breed
      })

      const newAnimal: Animal = {
        breed,
        name,
        type,
        weight: Number(weight),
        health_status,
        life_stage,
        location,
        birth_date,
        daily_milk_production: Number(milkCalculated),
        parents_id: [father_id, mother_id] as string[] | [],
        child_id
      }
      await createAnimalMutation.mutateAsync(newAnimal)
    } catch (error) {
      console.error('Error al crear el animal:', error)
    }
  }

  const handleUpdateAnimal = async (id: string) => {
    const updatedData = { health_status: 'Saludable' } // Datos a actualizar
    await updateAnimalMutation.mutateAsync({ id, data: updatedData })
  }

  const handleDeleteAnimal = async (id: string) => {
    await deleteAnimalMutation.mutateAsync(id)
  }

  const handleViewDetails = (data: Animal) => {
    console.log(data)
  }
  const methods = useForm<AnimalForm>({
    resolver: zodResolver(animalSchema), // Asegúrate de tener un esquema de validación para los animales
    defaultValues: {
      type: '',
      name: '',
      breed: '',
      birth_date: '',
      health_status: '',
      location: '',
      weight: '',
      daily_milk_production: 0,
      life_stage: '',
      child_id: ''
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  if (isAnimalsLoading) return <div className="text-black">Cargando...</div>
  if (animalsError)
    return <div className="text-black">Error: {animalsError.message}</div>

  const finalAnimals = animals?.animals ?? []

  return (
    <>
      <ButtonAnimated
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
        title="Agregar Animal"
      >
        <PlusIcon />
      </ButtonAnimated>
      <Table
        data={finalAnimals as Animal[]}
        columns={columns}
        onViewDetails={handleViewDetails} // Implementa esta función si es necesario
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Nuevo Animal"
      >
        <Form onSubmit={handleSubmit(handleCreateAnimal)} methods={methods}>
          <InputField
            name="name"
            register={register}
            label="Nombre"
            errors={errors}
            type="text"
          />

          <Select register={register} name="breed" label="Raza" errors={errors}>
            {breedOptions.map((breed) => (
              <Option key={breed} value={breed} label={breed} />
            ))}
          </Select>

          <Select register={register} name="type" label="Tipo" errors={errors}>
            {typeOptions.map((type) => (
              <Option key={type} value={type} label={type} />
            ))}
          </Select>

          <Select
            register={register}
            name="health_status"
            label="Estado de salud"
            errors={errors}
          >
            {healthStatusOptions.map((health) => (
              <Option key={health} value={health} label={health} />
            ))}
          </Select>

          <InputField
            name="location"
            register={register}
            label="Ubicación"
            errors={errors}
            type="text"
          />

          <InputField
            name="weight"
            register={register}
            label="Peso"
            errors={errors}
            type="number"
          />

          <InputField
            name="birth_date"
            register={register}
            label="Fecha de nacimiento"
            errors={errors}
            type="date"
          />

          <Select
            register={register}
            name="life_stage"
            label="Etapa de vida"
            errors={errors}
          >
            {lifeStageOptions.map((life) => (
              <Option key={life} value={life} label={life} />
            ))}
          </Select>

          <Select
            register={register}
            name="mother_id"
            label="Madre"
            errors={errors}
          >
            {finalAnimals.map(({ animal_id, name }) => (
              <Option key={animal_id} value={animal_id} label={name} />
            ))}
          </Select>

          <Select
            register={register}
            name="father_id"
            label="Padre"
            errors={errors}
          >
            {finalAnimals.map(({ animal_id, name }) => (
              <Option key={animal_id} value={animal_id} label={name} />
            ))}
          </Select>

          <Select
            register={register}
            name="child_id"
            label="Hijo"
            errors={errors}
          >
            {finalAnimals.map(({ animal_id, name }) => (
              <Option key={animal_id} value={animal_id} label={name} />
            ))}
          </Select>

          <Button
            loading={isAnimalsLoading}
            disabled={isAnimalsLoading}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default AnimalsPage
