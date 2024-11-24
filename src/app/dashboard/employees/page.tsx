'use client'

import { CardDetailsEmployee } from '@components/CardDetailsEmployee'
import { Modal } from '@components/form/Modal'
import Table from '@components/tables/Table'
import { useEmployee } from '@hooks/useEmployee'
import { Employee } from '@models/types'
import { useState } from 'react'

export default function Page() {
  const { employees, isPending, isError } = useEmployee(null)
  const [isViewable, setIsViewable] = useState(false)
  const [employee, setEmployee] = useState<Employee | null>(null)

  const columns = [
    { header: 'Foto', accessorKey: 'img' },
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
    { header: 'Estado', accessorKey: 'status' }
  ]

  if (isPending) return <p>Cargando...</p>
  if (isError) return <p>Hubo un error al cargar los empleados.</p>

  const Finalemployees = employees ?? []

  const onViewDetails = (data: Employee) => {
    if (!data) return setIsViewable(false)
    setIsViewable(true)
    setEmployee(data)
  }

  return (
    <>
      <Table
        data={Finalemployees}
        columns={columns}
        onViewDetails={onViewDetails}
      />
      {employee && (
        <Modal isOpen={isViewable} onClose={() => setIsViewable(false)}>
          <CardDetailsEmployee data={employee || null} />
        </Modal>
      )}
    </>
  )
}
