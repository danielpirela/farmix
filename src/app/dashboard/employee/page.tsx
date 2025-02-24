'use client'

import { CardDetailsEmployee } from '@components/CardDetailsEmployee'
import CreateEmployeeForm from '@components/CreateEmployeeForm'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { Modal } from '@components/form/Modal'
import { LoadingIcon, PlusIcon } from '@components/icons/DashboardIcon'
import { EditableStatusEmployee } from '@components/tables/EditableStatusEmployee'
import Table from '@components/tables/Table'
import { TableImage } from '@components/tables/TableImage'
import { useEmployee } from '@hooks/useEmployee'
import { useEmployees } from '@hooks/useEmployees'
import { Employee } from '@models/types'
import { updateEmployee } from '@services/employee'
import { useState } from 'react'

const columns = [
  { header: 'Foto', accessorKey: 'img', cell: TableImage },
  {
    header: 'Nombre',
    accessorKey: 'full_name',
    cell: (info: {
      row: { original: { first_name: string; last_name: string } }
    }) => `${info.row.original.first_name} ${info.row.original.last_name}`
  },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Cédula', accessorKey: 'id_document' },
  { header: 'Rol', accessorKey: 'roles.role_name' },
  { header: 'Estado', accessorKey: 'status', cell: EditableStatusEmployee }
]
export default function Page() {
  const { employees, isPending, isError } = useEmployee(null)
  const [isViewable, setIsViewable] = useState(false)
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [formModalOpen, setFormModalOpen] = useState(false)
  const { createEmployeeMutation } = useEmployees()
  const Finalemployees = employees ?? []

  if (isPending) return <p>Cargando...</p>
  if (isError) return <p>Hubo un error al cargar los empleados.</p>

  const onViewDetails = (data: Employee) => {
    if (!data) return setIsViewable(false)
    setIsViewable(true)
    setEmployee(data)
    return
  }

  const updateRows = async (data: Employee) => {
    if (!data) return
    const { email, roles, ...rest } = data

    const res = await updateEmployee(email, rest)
    console.log(res)
  }

  return (
    <>
      {/* Botón para abrir el formulario */}
      {/*       <ButtonAnimated
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
        title="Agregar Empleado"
      >
        <PlusIcon />
      </ButtonAnimated> */}

      {Finalemployees ? (
        <Table
          data={Finalemployees}
          columns={columns}
          onViewDetails={onViewDetails}
          onUpdate={updateRows}
        />
      ) : (
        <LoadingIcon />
      )}
      {employee && (
        <Modal isOpen={isViewable} onClose={() => setIsViewable(false)}>
          <CardDetailsEmployee data={employee || null} />
        </Modal>
      )}
      {/* Modal para crear un nuevo empleado */}
      <Modal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Nuevo Empleado"
      >
        <CreateEmployeeForm />
      </Modal>
    </>
  )
}
