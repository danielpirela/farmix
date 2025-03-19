'use client'

import { useState } from 'react'
import { useClients } from '@hooks/useClients'
import { Button } from '@components/form/Button'
import { Modal } from '@components/form/Modal'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema } from '@utils/validations'
import Table from '@components/tables/Table'
import { Client } from '@models/clients.model'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { PlusIcon } from '@components/icons/DashboardIcon'
import { EditableCell } from '@components/tables/EditableCell'
import { EditableStatusClient } from '@components/tables/EditableStatusClient'
import { Details } from '@components/tables/Details'
import ClientDetailsModal from '@components/modals/ClientDetailsModal'
import { useNotificationsContext } from '@components/context/NotificationsContext'
import { NotificationsContainer } from '@components/NotificationContainer'

const columns = [
  {
    header: 'Detalles',
    accessorKey: 'actions',
    cell: Details
  },
  {
    header: 'Nombre',
    accessorKey: 'full_name',
    cell: (info: {
      row: {
        original: { first_name: string; last_name: string }
      }
    }) => `${info.row.original.first_name} ${info.row.original.last_name}`
  },
  { header: 'Teléfono', accessorKey: 'phone' },
  { header: 'Email', accessorKey: 'email', cell: EditableCell },
  { header: 'Estado', accessorKey: 'status', cell: EditableStatusClient }
]

const ClientsPage = () => {
  const { addNotification } = useNotificationsContext()
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const {
    clients,
    clientsError,
    isClientsLoading,
    createClientMutation,
    updateClientMutation
  } = useClients()

  const methods = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: ''
    },
    mode: 'onChange'
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  const handleCreateClient: SubmitHandler<Client> = async (data) => {
    console.log(data)

    if (!data) return

    const { first_name, last_name, phone, email } = data as Client

    const FinalClient: Partial<Client> = {
      first_name,
      last_name,
      phone,
      email
    }

    console.log(FinalClient)
    try {
      await createClientMutation.mutateAsync(FinalClient, {
        onSuccess: () => {
          addNotification('Cliente creado correctamente', 'success', 3000)
          setFormModalOpen(false) // Cierra el modal después de crear
        },
        onError: (error) => {
          addNotification('No se pudo crear el cliente', 'error', 3000)
        }
      })
      setFormModalOpen(false) // Cierra el modal después de crear
    } catch (err) {
      console.error('Error al crear cliente', err)
    }
  }

  const updateRows = async (data: Client) => {
    console.log(data)

    try {
      await updateClientMutation.mutateAsync(data)
    } catch (err) {
      console.error('Error al actualizar cliente', err)
    }
  }

  const handleClientDetails = (client: Client) => {
    setSelectedClient(client)
    setDetailsModalOpen(true)
  }

  if (isClientsLoading) return <div className="text-black">Cargando...</div>
  if (clientsError)
    return <div className="text-black">Error: {clientsError.message}</div>

  return (
    <div className="relative">
      <ButtonAnimated
        title="Agregar Cliente"
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
      >
        <PlusIcon />
      </ButtonAnimated>

      <Table
        data={clients?.clients ?? []}
        columns={columns}
        updateRows={updateRows}
        onViewDetails={handleClientDetails}
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Nuevo Cliente"
      >
        <Form onSubmit={handleSubmit(handleCreateClient)} methods={methods}>
          <InputField
            name="first_name"
            register={register}
            label="Nombre"
            errors={errors}
            type="text"
          />
          <InputField
            name="last_name"
            register={register}
            label="Apellido"
            errors={errors}
            type="text"
          />
          <InputField
            name="phone"
            register={register}
            label="Teléfono"
            errors={errors}
            type="number"
          />
          <InputField
            name="email"
            register={register}
            label="Email"
            errors={errors}
            type="text"
          />
          <Button
            loading={isClientsLoading}
            disabled={isClientsLoading}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Modal>

      <ClientDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        client={selectedClient}
      />

      <NotificationsContainer />
    </div>
  )
}

export default ClientsPage
