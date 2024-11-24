'use client'

import Table from '@components/tables/Table'
import { useEmployee } from '@hooks/useEmployee'

export default function Page() {
  const { employees, isPending, isError } = useEmployee(null)

  const columns = [
    { header: 'Nombre', accessorKey: 'first_name' },
    { header: 'Apellido', accessorKey: 'last_name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Cédula', accessorKey: 'id_document' },
    { header: 'Dirección', accessorKey: 'address' },
    { header: 'Teléfono', accessorKey: 'phone' },
    { header: 'Salario', accessorKey: 'salary' },
    { header: 'Rol', accessorKey: 'roles.role_name' },
    { header: 'Contratado', accessorKey: 'hire_date' }
  ]

  if (isPending) return <p>Cargando...</p>
  if (isError) return <p>Hubo un error al cargar los empleados.</p>

  const Finalemployees = employees ?? []

  return <Table data={Finalemployees} columns={columns} />
}
