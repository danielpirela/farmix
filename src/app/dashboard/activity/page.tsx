'use client'

import Table from '@components/tables/Table'
import { useActivities } from '@hooks/useActivities'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Modal } from '@components/form/Modal'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { LoadingIcon, PlusIcon } from '@components/icons/DashboardIcon'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { activitySchema } from '@utils/validations'
import { Button } from '@components/form/Button'
import { Activity } from '@models/types'
import { CardDetailsActivity } from '@components/CardDeatailsActivity'
import { Select } from '@components/form/Select'
import { activitiesOptions } from '../../../const/task'
import { Option } from '@components/form/Option'
import { useCreateActivity } from '@hooks/useCreateActivity'
import { AlertToast } from '@components/AlertToast'
import { TableImage } from '@components/tables/TableImage'
import { FormatData } from '@components/tables/FormatData'
import { EditableStatusActivity } from '@components/tables/EditableStatusActivity'
import { updateActivity } from '@services/activities'

export default function Page() {
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false)
  const [activity, setActivity] = useState<Activity | null>(null)

  const { data: session } = useSession()
  const id = session?.user?.id ?? null
  const { activities, isPending } = useActivities(id)
  const { mutate, created, isOnError, isLoading } = useCreateActivity()

  const columns = [
    { header: 'Foto', accessorKey: 'employees.img', cell: TableImage },
    {
      header: 'Nombre',
      accessorKey: 'employees.first_name',
      cell: (info: {
        row: {
          original: { employees: { first_name: string; last_name: string } }
        }
      }) =>
        `${info.row.original.employees.first_name} ${info.row.original.employees.last_name}`
    },
    { header: 'Tarea', accessorKey: 'type' },
    { header: 'Fecha', accessorKey: 'created_at', cell: FormatData },
    {
      header: 'Estado',
      accessorKey: 'status',
      cell: EditableStatusActivity
    }
  ]

  const methods = useForm<Activity>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      type: '',
      description: '',
      descriptionOpt: '',
      employee_id: ''
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  const onViewDetails = (data: Activity) => {
    if (!data) return setDetailsModalOpen(false)
    setActivity(data)
    setDetailsModalOpen(true)
  }

  const onSubmit: SubmitHandler<Activity> = (data) => {
    if (!data) {
      console.error('Error in form data:', data)
      return
    }
    const { type, description, descriptionOpt } = data as Activity

    mutate({
      type,
      description: descriptionOpt ?? description,
      employee_id: id ?? ''
    })
  }

  const updateRows = async (data: Activity) => {
    console.log(data.status)
    if (!data) return
    const { activities_id, employees, ...rest } = data
    const res = await updateActivity(activities_id, rest)
    console.log(res)
  }

  return (
    <div>
      {/* Botón para abrir el formulario */}
      <ButtonAnimated
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
        title="Nueva Actividad"
      >
        <PlusIcon />
      </ButtonAnimated>

      {/* Tabla de actividades */}
      {isPending ? (
        <LoadingIcon />
      ) : (
        <Table
          data={activities ?? []}
          columns={columns}
          onViewDetails={onViewDetails}
          updateRows={updateRows}
          onRefresh={created}
        />
      )}

      {/* Modal para detalles de actividad */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title="Detalles de Actividad"
      >
        {activity && <CardDetailsActivity data={activity} />}
      </Modal>

      {/* Modal para formulario */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Nueva Actividad"
      >
        <Form onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <Select name="type" register={register} label="Tipo" errors={errors}>
            {activitiesOptions.map(({ type }) => (
              <Option key={type} value={type} label={type} />
            ))}
          </Select>
          <Select
            name="description"
            register={register}
            label="Descripcion"
            errors={errors}
          >
            {activitiesOptions.map(({ description }) => (
              <Option
                key={crypto.randomUUID().toString()}
                value={description}
                label={description}
              />
            ))}
          </Select>
          <InputField
            name="descriptionOpt"
            register={register}
            label="Descripcion"
            errors={errors}
            type="textarea"
          />
          <Button
            loading={isLoading}
            disabled={isPending || isLoading}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Modal>

      {!isLoading && !isOnError && created && (
        <AlertToast code="success">Actividad creada</AlertToast>
      )}
      {isOnError && (
        <AlertToast code="error">No se pudo crear la actividad</AlertToast>
      )}
    </div>
  )
}
