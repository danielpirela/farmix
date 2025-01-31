'use client'

import { useEmployee } from '@hooks/useEmployee'
import { Employee } from '@models/types'
import { useEffect, useMemo, useState, useRef } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Button } from '@components/form/Button'
import { Download } from '@components/icons/DashboardIcon'
import html2pdf from 'html2pdf.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  responsive: true,
  maintainAspectRatio: true
}

export default function ReportsPage() {
  const { employees, isPending, isError } = useEmployee(null)
  const Finalemployees = useMemo(() => employees ?? [], [employees])
  const [chartData, setChartData] = useState<{
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string[]
      borderColor: string[]
      borderWidth: number
    }[]
  }>({
    labels: [],
    datasets: []
  })
  const pdfRef = useRef(null)

  useEffect(() => {
    import('html2pdf.js')
  }, [])
  const downloadPDF = () => {
    const opt = {
      margin: 1,
      filename: 'Reporte_salarios.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, background: '#fff' },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    if (!pdfRef.current) return
    if (!html2pdf) return

    html2pdf().from(pdfRef.current).set(opt).save('reportes_empleados.pdf')
  }

  useEffect(() => {
    if (Finalemployees.length === 0) return

    const employeeSalary = Finalemployees.reduce(
      (acc: Record<string, number>, employee) => {
        const roleName = employee?.roles?.role_name || 'Sin rol'
        acc[roleName] = (acc[roleName] || 0) + employee.salary
        return acc
      },
      {}
    )

    const roles = Object.keys(employeeSalary)
    const salaries = Object.values(employeeSalary)

    if (roles.length > 0 && salaries.length > 0) {
      setChartData({
        labels: roles,
        datasets: [
          {
            label: 'Salarios',
            data: salaries,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      })
    }
  }, [Finalemployees])

  if (!chartData.labels.length) return <p>Cargando...</p>
  if (isPending) return <p>Cargando...</p>
  if (isError) return <p>Hubo un error al cargar los empleados.</p>

  // Agrupar empleados por rol
  const groupedEmployees = Finalemployees.reduce(
    (acc, employee) => {
      const role = employee.roles?.role_name || 'Sin rol'
      if (!acc[role]) {
        acc[role] = []
      }
      acc[role].push(employee)
      return acc
    },
    {} as Record<string, Employee[]>
  )

  return (
    <div ref={pdfRef} id="report" className="relative">
      <h1 className="text-gray-900 dark:text-white text-2xl font-medium">
        Reportes de Empleados
      </h1>

      <div className="flex justify-center items-center max-w-sm">
        <Button onClick={downloadPDF} className="absolute top-0 right-0 ">
          <Download className="fill-white" />
        </Button>
      </div>
      {Finalemployees.length > 0 ? (
        <div className="flex flex-col md:flex-row sm:flex-col md:items-start  justify-between gap-4 mt-4  items-center">
          <div className="flex w-full max-w-sm justify-center items-center">
            <Pie data={chartData} options={options} />
          </div>
          <div className="w-full md:w-1/2 max-w-xl">
            {Object.entries(groupedEmployees).map(([role, employees]) => (
              <div key={role} className="mb-4">
                <h2 className="font-bold text-lg text-gray-800 dark:text-white border-b border-gray-300 my-4">
                  {role}
                </h2>
                <div className="overflow-x-auto rounded-md shadow-md bg-white dark:bg-gray-800 max-w-full animate-once animate-duration-300 animate-delay-300 mt-2">
                  <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-6 py-3 min-w-[150px] border-b border-gray-200 dark:border-gray-600">
                          Nombre
                        </th>
                        <th className="px-6 py-3 min-w-[150px] border-b border-gray-200 dark:border-gray-600">
                          Salario
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee: Employee) => (
                        <tr
                          key={employee.id_document}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis dark:text-white">{`${employee.first_name} ${employee.last_name}`}</td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis dark:text-white">
                            {employee.salary}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-black dark:text-white">
          No hay empleados disponibles.
        </p>
      )}
    </div>
  )
}
