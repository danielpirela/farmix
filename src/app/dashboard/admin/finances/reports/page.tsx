'use client'
import { useEffect, useState } from 'react'
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

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  PointElement,
  Tooltip
)

import { Bar, Pie } from 'react-chartjs-2'
import { useFinances } from '@hooks/useFinances'
import Table from '@components/tables/Table'
import { TransactionTypePill } from '@components/tables/TransactionTypePill'

const columns = [
  {
    header: 'Empleado',
    accessorKey: 'full_name',
    cell: (info: {
      row: {
        original: { employees: { first_name: string; last_name: string } }
      }
    }) =>
      `${info.row.original.employees.first_name} ${info.row.original.employees.last_name}`
  },
  { header: 'Categoría', accessorKey: 'category' },
  {
    header: 'Monto',
    accessorKey: 'amount',
    cell: (info: { row: { original: { amount: number } } }) =>
      `${info.row.original.amount.toFixed(2)}$`
  },
  { header: 'Método de pago', accessorKey: 'method' },
  { header: 'Fecha', accessorKey: 'transaction_date' },
  { header: 'Tipo', accessorKey: 'type', cell: TransactionTypePill }
]

const ReportsPage = () => {
  const { finances } = useFinances()
  const [data, setData] = useState({})
  const [filter, setFilter] = useState('2025')
  const [type, setType] = useState('Egreso')
  const [typeFilter, setTypeFilter] = useState('Deuda')
  const [finalFinances, setFinalFinances] = useState([])

  const [yearlyDataIngreso, setYearlyDataIngreso] = useState({})
  const [yearlyDataEgreso, setYearlyDataEgreso] = useState({})
  const [monthlyDataIngreso, setMonthlyDataIngreso] = useState({})
  const [monthlyDataEgreso, setMonthlyDataEgreso] = useState({})
  const [startDate, setStartDate] = useState('2025-01-01')
  const [endDate, setEndDate] = useState('2025-12-31')

  const options = {
    responsive: true,
    maintainAspectRatio: true
  }

  const monthlyOptions = {
    responsive: true,
    animation: {
      duration: 500,
      easing: 'easeOutBounce'
    },
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        min: 0
      },
      x: {
        ticks: { color: 'rgba(0, 220, 195)' }
      }
    }
  }
  const yearlyOptions = {
    responsive: true,
    animation: {
      duration: 500,
      easing: 'easeOutBounce'
    },
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        min: 0
      },
      x: {
        ticks: { color: 'rgba(0, 220, 195)' }
      }
    }
  }

  useEffect(() => {
    if (finances) {
      const filteredFinances = finances?.finances?.filter((fin) => {
        console.log(fin.method)

        return fin.type === typeFilter || fin.method === 'Credito'
      })

      setFinalFinances(filteredFinances)

      console.log(filteredFinances)

      const financesData = finances?.finances
        ?.filter(
          (finance) =>
            finance.type === type &&
            finance.transaction_date >= startDate &&
            finance.transaction_date <= endDate
        )
        .reduce((acc, tran) => {
          acc[tran.category] = (acc[tran.category] || 0) + tran.amount
          return acc
        }, {})

      console.log(financesData)

      const financesMonthlyData = finances?.finances
        ?.filter((finance) => finance.type === 'Ingreso')
        .reduce((acc, tran) => {
          const [year, month] = tran.transaction_date.split('-')
          const key = `${year}-${month}`
          acc[key] = (acc[key] || 0) + tran.amount
          return acc
        }, {})

      const financesMonthlyDataEgreso = finances?.finances
        ?.filter((finance) => finance.type === 'Egreso')
        .reduce((acc, tran) => {
          const [year, month] = tran.transaction_date.split('-')
          const key = `${year}-${month}`
          acc[key] = (acc[key] || 0) + tran.amount
          return acc
        }, {})

      const financesYearlyDataEgreso = finances?.finances
        ?.filter((finance) => finance.type === 'Egreso')
        .reduce((acc, tran) => {
          const year = tran.transaction_date.split('-')[0]
          acc[year] = (acc[year] || 0) + tran.amount
          return acc
        }, {})

      const financesYearlyData = finances?.finances
        ?.filter((finance) => finance.type === 'Ingreso')
        .reduce((acc, tran) => {
          const year = tran.transaction_date.split('-')[0]
          acc[year] = (acc[year] || 0) + tran.amount
          return acc
        }, {})

      const categorMonthlyEgreso = Object.keys(financesMonthlyDataEgreso)
      const amountMonthlyEgreso = Object.values(financesMonthlyDataEgreso)

      const categoryYearly = Object.keys(financesYearlyData)
      const amountYearly = Object.values(financesYearlyData)

      const categoryMonthly = Object.keys(financesMonthlyData)
      const amountMonthly = Object.values(financesMonthlyData)

      const categoryYearlyEgreso = Object.keys(financesYearlyDataEgreso)
      const amountYearlyEgreso = Object.values(financesYearlyDataEgreso)

      const categegory = Object.keys(financesData)
      const amount = Object.values(financesData)

      setData({
        labels: categegory,
        datasets: [
          {
            label: 'Gastos diarios',
            data: amount,
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

      setYearlyDataEgreso({
        labels: categoryYearlyEgreso,
        datasets: [
          {
            label: 'Egresos anuales',
            data: amountYearlyEgreso,
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

      setMonthlyDataEgreso({
        labels: categorMonthlyEgreso,
        datasets: [
          {
            label: 'Egresos mensuales',
            data: amountMonthlyEgreso,
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

      setYearlyDataIngreso({
        labels: categoryYearly,
        datasets: [
          {
            label: 'Ingresos anuales',
            data: amountYearly,
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

      setMonthlyDataIngreso({
        labels: categoryMonthly,
        datasets: [
          {
            label: 'Ingresos mensuales',
            data: amountMonthly,
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
  }, [finances, startDate, endDate, type, typeFilter])

  if (!data?.labels || data?.labels.length === 0) return <p>cargando</p>

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4 min-h-screen">
      <h1 className="text-black text-md">Reportes de Gastos</h1>
      <div className="max-w-lg justify-center items-center">
        <div className="flex gap-4 mt-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            id="type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Egreso" defaultValue={'Egreso'}>
              Egreso
            </option>
            <option value="Ingreso">Ingreso</option>
            <option value="Deuda">Deuda</option>
          </select>
        </div>
        <div className="flex gap-4 mt-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <Pie data={data} options={options} />
      </div>

      <div className="flex flex-col items-center justify-center min-w-full">
        <h2 className="text-black text-lg">Ingresos</h2>
        <Bar data={monthlyDataIngreso} options={monthlyOptions} />
        <Bar data={yearlyDataIngreso} options={yearlyOptions} />
        <h2 className="text-black text-lg">Egresos</h2>
        <Bar data={monthlyDataEgreso} options={monthlyOptions} />
        <Bar data={yearlyDataEgreso} options={yearlyOptions} />
      </div>

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        id="typefilter"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="Deuda" defaultValue={'Egreso'}>
          Cuentas por pagar
        </option>
        <option value="Credito">Cuentas por cobrar</option>
      </select>
      {finalFinances?.length > 0 ? (
        <Table
          data={finalFinances}
          columns={columns}
          filterAndSort={typeFilter}
        />
      ) : (
        <p>No hay transacciones</p>
      )}
    </div>
  )
}

export default ReportsPage
