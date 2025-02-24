'use client'
import { Button } from '@components/form/Button'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { Modal } from '@components/form/Modal'
import Table from '@components/tables/Table'
import { useAnimals } from '@hooks/useAnimals'
import { Animal } from '@models/animals.model'
import { useState } from 'react'
import { set, SubmitHandler, useForm } from 'react-hook-form'
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
import { Download, PlusIcon } from '@components/icons/DashboardIcon'
import { calculateAverageMilk } from '@utils/averageMilkProduction'
import { EditableCell } from '@components/tables/EditableCell'
import { EditableTypeAnimal } from '@components/tables/EditableTypeAnimal'
import { EditableBreedCell } from '@components/tables/EditableBreedCell'
import { EditableHealthStatusCell } from '@components/tables/EditableHealthStatusCell'
import { Details } from '@components/tables/Details'
import { useBirth } from '@hooks/useBirth'
import { getBirthAnimals } from '@services/birth'
import { useComponentToPDF } from '@hooks/useImageToPdf'
import { useHtml2Pdf } from '@hooks/useHtml2Pdf'
import { AnimalDetails } from '@components/modals/AnimalDetails'

export default function AnimalsPage() {
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [animal, setAnimal] = useState<Animal>()
  const [parentsData, setParentsData] = useState({
    mother: null,
    father: null
  })
  const [childrenData, setChildrenData] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const { pdfRef, downloadPDF } = useHtml2Pdf({
    filename: 'Animales_reporte.pdf'
  })

  const {
    animals,
    animalsError,
    isAnimalsLoading,
    createAnimalMutation,
    updateAnimalMutation,
    deleteAnimalMutation
  } = useAnimals()

  const columns = [
    { header: 'Parto', accessorKey: 'birth', cell: Details },
    { header: 'Id', accessorKey: 'code' },
    { header: 'Nombre', accessorKey: 'name', cell: EditableCell },
    { header: 'Tipo', accessorKey: 'type', cell: EditableTypeAnimal },
    { header: 'Raza', accessorKey: 'breed', cell: EditableBreedCell },
    {
      header: 'Estado de salud',
      accessorKey: 'health_status',
      cell: EditableHealthStatusCell
    },
    { header: 'Ubicación', accessorKey: 'location', cell: EditableCell },
    { header: 'Peso', accessorKey: 'weight', cell: EditableCell }
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

  const handleUpdateAnimal = async (animal: any) => {
    if (!animal) return
    try {
      await updateAnimalMutation.mutateAsync({
        id: animal.animal_id,
        data: animal
      })
    } catch (error) {
      console.error('Error al actualizar el animal:', error)
    }
  }

  const handleDeleteAnimal = async (id: string) => {
    await deleteAnimalMutation.mutateAsync(id)
  }

  const handleViewDetails = async (data: Animal) => {
    console.log(data)

    if (data.parents_id !== null) {
      const mother = finalAnimals.find(
        (animal) => animal.animal_id === data.parents_id[0]
      )
      const father = finalAnimals.find(
        (animal) => animal.animal_id === data.parents_id[1]
      )
      setParentsData({
        mother,
        father
      })
    }
    setAnimal(data)

    if (parentsData.mother !== null) {
      const child = await getBirthAnimals(parentsData.mother.animal_id)
      console.log(child)

      if (child === null) return

      setChildrenData(child)
    }

    setIsOpenModal(true)
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

  console.log(errors)
  if (isAnimalsLoading) return <div className="text-black">Cargando...</div>
  if (animalsError)
    return <div className="text-black">Error: {animalsError.message}</div>

  const finalAnimals = animals?.animals ?? []

  return (
    <div className="relative">
      <div className="flex justify-center items-center max-w-md">
        <Button onClick={downloadPDF} className="absolute top-0 right-0 z-50 ">
          <Download className="fill-white w-4 h-4 md:w-6 md:h-6" />
        </Button>
      </div>
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
        onViewDetails={handleViewDetails}
        updateRows={handleUpdateAnimal}
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
            {finalAnimals.map(({ animal_id, name, code }) => (
              <Option
                key={animal_id}
                value={animal_id}
                label={name + ' - ' + code}
              />
            ))}
          </Select>

          <Select
            register={register}
            name="father_id"
            label="Padre"
            errors={errors}
          >
            {finalAnimals.map(({ animal_id, name, code }) => (
              <Option
                key={animal_id}
                value={animal_id}
                label={name + ' - ' + code}
              />
            ))}
          </Select>

          <Select
            register={register}
            name="child_id"
            label="Hijo"
            errors={errors}
          >
            {finalAnimals.map(({ animal_id, name, code }) => (
              <Option
                key={animal_id}
                value={animal_id}
                label={name + ' - ' + code}
              />
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

      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="Detalles del animal"
      >
        <AnimalDetails
          animal={animal}
          parentsData={parentsData}
          childrenData={childrenData}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      </Modal>
    </div>
  )
}
