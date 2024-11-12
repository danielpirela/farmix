'use client'

import Table from '@components/tables/Table'
import { getEmployee } from '@services/getEmployee'
import { useEffect, useState } from 'react'
import { Employee } from '../../../types'



export default function Page() {
  const [employees, setEmployees] = useState<Employee[]>([])

  const columns = [
    { header: 'Nombre', accessorKey: 'first_name' },
    { header: 'Apellido', accessorKey: 'last_name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Cédula', accessorKey: 'id_document' },
    { header: 'Dirección', accessorKey: 'address' },
    { header: 'Teléfono', accessorKey: 'phone' },
    { header: 'Salario', accessorKey:'salary' },
    { header: 'Rol', accessorKey: 'roles.role_name' },
    { header: 'Contratado', accessorKey: 'hire_date' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      const employees = await getEmployee(null)
      setEmployees(employees)
    }
    fetchData()
  }, [])

  return (
    <Table data={employees} columns={columns}>page</Table>
  )
}
