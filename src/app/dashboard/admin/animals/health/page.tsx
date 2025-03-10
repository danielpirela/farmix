'use client'

import { useHealthControl } from '@hooks/useHealthControl'
import { Button } from '@components/form/Button'
import { Modal } from '@components/form/Modal'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { healthControlSchema } from '@utils/validations/healthControlSchema'
import { HealthControl } from '@models/healthControl.model'
import { useEffect, useState } from 'react'
import Table from '@components/tables/Table'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { Download, PlusIcon } from '@components/icons/DashboardIcon'
import { useAnimals } from '@hooks/useAnimals'
import { Select } from '@components/form/Select'
import { Option } from '@components/form/Option'
import { useEmployee } from '@hooks/useEmployee'
import { Details } from '@components/tables/Details'
import HealthControlDetailsModal from '@components/modals/HealthControlDetailsModal'

const columns = [
  { header: 'Acciones', accessorKey: 'actions', cell: Details }, // Asegúrate de tener un componente DeleteButton
  {
    header: 'Animal ID',
    accessorKey: 'animal_id',
    cell: (info: {
      row: {
        original: { code: number; name: string }
      }
    }) =>
      `${info.row.original.animals.name} - ${info.row.original.animals.code}`
  },
  { header: 'Fecha de Control', accessorKey: 'checkup_date' },
  { header: 'Diagnóstico', accessorKey: 'diagnosis' },
  { header: 'Tratamiento', accessorKey: 'treatment' }
]

const HealthControlPage = () => {
  const {
    healthControls,
    isHealthControlsLoading,
    healthControlsError,
    createHealthControlMutation,
    deleteHealthControlMutation
  } = useHealthControl()
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const { animals, animalsError } = useAnimals()
  const { employees, isError, isLoading } = useEmployee()
  const [selectedHealthControl, setSelectedHealthControl] =
    useState<HealthControl | null>(null)
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false)

  const methods = useForm<HealthControl>({
    resolver: zodResolver(healthControlSchema),
    defaultValues: {
      animal_id: '',
      checkup_date: '',
      diagnosis: '',
      treatment: '',
      employee_id: ''
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  const handleCreateHealthControl: SubmitHandler<HealthControl> = async (
    data
  ) => {
    await createHealthControlMutation.mutateAsync(data)
    setFormModalOpen(false)
  }

  const handleDeleteHealthControl = async (id: string) => {
    await deleteHealthControlMutation.mutateAsync(id)
  }
  const handleViewDetails = async (data: HealthControl) => {
    if (data === null) return
    setSelectedHealthControl(data)
    setDetailsModalOpen(true)
  }

  if (isHealthControlsLoading || isHealthControlsLoading || isLoading)
    return <div className="text-black">Cargando...</div>
  if (healthControlsError || animalsError || isError)
    return (
      <div className="text-black">Error: {healthControlsError?.message}</div>
    )

  console.log(healthControls)

  return (
    <>
      <ButtonAnimated
        title="Agregar Control de Salud"
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
      >
        <PlusIcon />
      </ButtonAnimated>

      <Table
        data={healthControls ?? []}
        columns={columns}
        deleteRows={handleDeleteHealthControl}
        onViewDetails={handleViewDetails}
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Nuevo Control de Salud"
      >
        <Form
          onSubmit={handleSubmit(handleCreateHealthControl)}
          methods={methods}
        >
          <Select
            name="animal_id"
            label="Animal"
            errors={errors}
            register={register}
          >
            {animals?.animals?.map(({ code, name, animal_id }) => (
              <Option
                key={animal_id}
                value={animal_id}
                label={name + ' - ' + code}
              />
            ))}
          </Select>

          <Select
            name="employee_id"
            label="Veterinario"
            errors={errors}
            register={register}
          >
            {employees?.map(({ employee_id, first_name, last_name }) => (
              <Option
                key={employee_id}
                value={employee_id}
                label={first_name + ' - ' + last_name}
              />
            ))}
          </Select>
          <InputField
            name="checkup_date"
            register={register}
            label="Fecha de Control"
            errors={errors}
            type="date"
          />
          <InputField
            name="diagnosis"
            register={register}
            label="Diagnóstico"
            errors={errors}
            type="text"
          />
          <InputField
            name="treatment"
            register={register}
            label="Tratamiento"
            errors={errors}
            type="text"
          />
          <Button
            loading={isHealthControlsLoading}
            disabled={isHealthControlsLoading}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Modal>
      <HealthControlDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        healthControl={selectedHealthControl}
        animal={selectedHealthControl?.animals}
        employee={selectedHealthControl?.employees}
      />
    </>
  )
}

export default HealthControlPage
