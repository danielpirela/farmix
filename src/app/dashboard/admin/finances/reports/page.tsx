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
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement
)
import { useFinances } from '@hooks/useFinances'

const ReportsPage = () => {
  const { finances } = useFinances()
  const [dataEgreso, setDataEgreso] = useState({})
  const [filter, setFilter] = useState('2025')
  const [type, setType] = useState('Egreso')
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
      // Procesar los datos para las estadísticas
      const financesDataEgreso = finances?.finances
        ?.filter(
          (finance) =>
            finance.type === type &&
            finance.transaction_date >= startDate &&
            finance.transaction_date <= endDate &&
            finance.transaction_date.split('-')[0] === filter
        )
        .reduce((acc, tran) => {
          acc[tran.category] = (acc[tran.category] || 0) + tran.amount
          return acc
        }, {})

      console.log(financesDataEgreso)

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

      const categegory = Object.keys(financesDataEgreso)
      const amount = Object.values(financesDataEgreso)

      setDataEgreso({
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
  }, [filter, finances, startDate, endDate, type])

  if (!dataEgreso?.labels || dataEgreso?.labels.length === 0)
    return <p>cargando</p>

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4 min-h-screen">
      <h1 className="text-black text-md">Reportes de Gastos</h1>
      <div className="max-w-lg justify-center items-center">
        <div className="flex gap-4 mt-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="2025" defaultValue={'2025'}>
              2025
            </option>
            <option value="2024">2024</option>
          </select>

          <select
            value={type}
            onChange={(e) => setFilter(e.target.value)}
            id="type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Egreso" defaultValue={'Egreso'}>
              Egreso
            </option>
            <option value="Ingreso">Ingreso</option>
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
        <Pie data={dataEgreso} options={options} />
      </div>

      <div className="flex flex-col items-center justify-center min-w-full">
        <h2 className="text-black text-lg">Ingresos</h2>
        <Bar data={monthlyDataIngreso} options={monthlyOptions} />
        <Bar data={yearlyDataIngreso} options={yearlyOptions} />
        <h2 className="text-black text-lg">Egresos</h2>
        <Bar data={monthlyDataEgreso} options={monthlyOptions} />
        <Bar data={yearlyDataEgreso} options={yearlyOptions} />
      </div>
    </div>
  )
}

export default ReportsPage
