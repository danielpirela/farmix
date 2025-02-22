'use client'

import Table from '@components/tables/Table'
import { useEmployee } from '@hooks/useEmployee'
import CreateEmployeeForm from '@components/CreateEmployeeForm'

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
  const finalemployees = employees ?? []
  if (isPending) return <p>Cargando...</p>
  if (isError) return <p>Hubo un error al cargar los empleados.</p>

  return <Table data={finalemployees} columns={columns} />
}
