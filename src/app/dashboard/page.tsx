'use client'

import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
} from 'chart.js'

import { useFinances } from '@hooks/useFinances'
import { useMilkProduction } from '@hooks/useMilkProduction'
import { useHealthControl } from '@hooks/useHealthControl'
import { useEmployees } from '@hooks/useEmployees'
import { Employee } from '@models/employee.model'
import Table from '@components/tables/Table'
import { MilkProduction } from '@models/milkProduction.model'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  PointElement,
  Tooltip
)

const DashboardPage = () => {
  const { finances } = useFinances()
  const { milkProductionData } = useMilkProduction()
  const { healthControls } = useHealthControl()
  const { employees } = useEmployees()

  const [financeData, setFinanceData] = useState<any>({})
  const [milkData, setMilkData] = useState<any>({})
  const [healthData, setHealthData] = useState<any>({})
  const [activeEmployees, setActiveEmployees] = useState<Employee[]>([])

  useEffect(() => {
    if (finances) {
      const totalIncome = finances.finances
        ? finances.finances
            .filter((fin) => fin.type === 'Ingreso')
            .reduce((acc, fin) => acc + fin.amount, 0)
        : 0

      const totalExpenses = finances.finances
        ? finances.finances
            .filter((fin) => fin.type === 'Egreso')
            .reduce((acc, fin) => acc + fin.amount, 0)
        : 0

      setFinanceData({
        labels: ['Ingresos', 'Egresos'],
        datasets: [
          {
            label: 'Finanzas',
            data: [totalIncome, totalExpenses],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      })
    }
  }, [finances])
  /*
  useEffect(() => {
    if (milkProductionData) {
      const milkProduction =
        milkProductionData.map((data) => data.milk_quantity) || []
      const labels =
        milkProductionData.map((data) => data.production_date) || []

      setMilkData({
        labels,
        datasets: [
          {
            label: 'Producción de Leche',
            data: milkProduction,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }
        ]
      })
    }
  }, [milkProductionData])


  useEffect(() => {
    if (healthControls) {
      const totalHealthControls = healthControls.length
      setHealthData({
        total: totalHealthControls
      })
    }
  }, [healthControls])

  useEffect(() => {
    if (employees) {
      const active = employees.filter(
        (employee) =>
          employee.status === 'Disponible' || employee.status === 'Trabajando'
      )
      setActiveEmployees(active.slice(0, 4))
    }
  }, [employees])
 */
  if (
    milkData !== undefined &&
    !employees &&
    financeData.length < 0 &&
    healthData.length < 0
  )
    return <p>Cargando...</p>
  console.log(financeData)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {financeData.length > 0 && (
        <Bar data={financeData} options={{ responsive: true }} />
      )}
      {/*
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Resumen Financiero</h2>
          <Bar data={financeData} options={{ responsive: true }} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Producción de Leche</h2>
          <Bar data={milkData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold">Controles de Salud</h2>
        <p>Total de Controles de Salud: {healthData.total}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold">Empleados Activos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {activeEmployees.map((employee) => (
            <div
              key={employee.employee_id}
              className="relative p-4 border rounded-lg shadow"
            >
              <img
                src={employee.img}
                alt={`${employee.first_name} ${employee.last_name}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2">
                <span className="h-6 w-6 text-green-500 rounded-full"></span>
              </div>
              <h3 className="mt-2 font-semibold">
                {employee.first_name} {employee.last_name}
              </h3>
              <p>{employee.roles.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold">Últimas Transacciones</h2>
        <Table
          data={finances?.finances ?? []}
          columns={[
            { header: 'ID', accessorKey: 'transaction_id' },
            { header: 'Monto', accessorKey: 'amount' },
            { header: 'Fecha', accessorKey: 'transaction_date' },
            { header: 'Tipo', accessorKey: 'type' }
          ]}
        />
      </div> */}
    </div>
  )
}

export default DashboardPage
