'use client'

import Table from '@components/tables/Table'
import { useActivities } from '@hooks/useActivities'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Modal } from '@components/form/Modal'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { PlusIcon } from '@components/icons/DashboardIcon'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/ImputFiled'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { activitySchema } from '@utils/validations'
import { Button } from '@components/form/Buttom'
import { Activity } from '@models/types'
import { CardDetailsActivity } from '@components/CardDeatailsActivity'

const columns = [
  { header: 'Foto', accessorKey: 'employees.img' },
  {
    header: 'Nombre',
    accessorKey: 'employees.first_name',
    cell: (info: {
      getValue: () => string
      row: { original: { employees: { last_name: string } } }
    }) => `${info.getValue()} ${info.row.original.employees.last_name}`
  },
  { header: 'Tipo', accessorKey: 'type' },
  { header: 'Fecha', accessorKey: 'created_at' },
  { header: 'Estado', accessorKey: 'status' }
]

export default function Page() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [activity, setActivity] = useState<Activity | null>(null)
  const { data: session } = useSession()
  const id = session?.user?.id ?? null
  const { activities, isPending } = useActivities(id)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      type: '',
      description: '',
      employee_id: id
    }
  })

  const onViewDetails = (data: Activity) => {
    if (!data) return setModalOpen(false)
    setModalOpen(true)
    setActivity(data)
  }

  const onSubmit: SubmitHandler<typeof activitySchema> = (data) => {
    if (!data) {
      console.error('Error in form data:', data)
      return
    }
    console.log(data)
  }

  return (
    <div>
      <ButtonAnimated
        onClick={() => setModalOpen(true)}
        className="fixed bottom-4 right-4"
      >
        <PlusIcon />
      </ButtonAnimated>
      {isPending ? (
        <p>Cargando...</p>
      ) : (
        <Table
          data={activities ?? []}
          columns={columns}
          onViewDetails={onViewDetails}
        />
      )}
      {/* Modal for Adding Activity */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Actividades"
      >
        {activity ? (
          <CardDetailsActivity data={activity} />
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              name="type"
              register={register}
              label="Tipo"
              errors={errors}
              type="text"
            />
            <InputField
              name="description"
              register={register}
              label="Descripcion"
              errors={errors}
              type="textarea"
            />
            <Button loading={isPending} disabled={isPending} type="submit">
              Enviar
            </Button>
          </Form>
        )}
      </Modal>
    </div>
  )
}
