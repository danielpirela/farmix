'use client'

import Table from '@components/tables/Table'
import { useActivities } from '@hooks/useActivities'
import { useSession } from 'next-auth/react'
import { Activity } from '@models/types'
import { useState } from 'react'
import { Modal } from '@components/form/Modal'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { PlusIcon } from '@components/icons/DashboardIcon'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { activitySchema } from '@utils/validations'
import { Button } from '@components/form/Button'

const columns = [
  { header: 'Tipo', accessorKey: 'type' },
  { header: 'Fecha', accessorKey: 'created_at' },
  { header: 'Descripcion', accessorKey: 'description' },
  { header: 'Nombre', accessorKey: 'employees.first_name' },
  { header: 'Apellido', accessorKey: 'employees.last_name' },
  { header: 'Cédula', accessorKey: 'employees.id_document' },
  { header: 'Teléfono', accessorKey: 'employees.phone' },
  { header: 'Rol', accessorKey: 'employees.roles.role_name' }
]

export default function Page() {
  const [isModalOpen, setModalOpen] = useState(false)
  const { data: session } = useSession()
  const id = session?.user?.id ?? null
  const { activities, isError, isPending } = useActivities(id)

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

  const onSubmit = (data) => {
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
      <Table data={activities} columns={columns} />
      {/* Modal for Adding Activity */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Actividades"
      >
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
      </Modal>
    </div>
  )
}
