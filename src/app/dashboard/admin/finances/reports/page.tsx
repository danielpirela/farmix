'use client'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)
import { useFinances } from '@hooks/useFinances'

const ReportsPage = () => {
  const { finances } = useFinances()
  const [dataEgreso, setDataEgreso] = useState({})
  const [filter, setFilter] = useState('2025')
  const [dataIngreso, setDataIngreso] = useState({})
  const [monthlyData, setMonthlyData] = useState({})
  const [yearlyData, setYearlyData] = useState({})

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
        min: 0,
        max: 1000
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
        min: 0,
        max: 12000
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
            finance.type === 'Egreso' &&
            finance.transaction_date.split('-')[0] === filter
        )
        .reduce((acc, tran) => {
          acc[tran.category] = (acc[tran.category] || 0) + tran.amount
          return acc
        }, {})

      const financesDataIngreso = finances?.finances
        ?.filter((finance) => finance.type === 'Ingreso')
        .reduce((acc, tran) => {
          acc[tran.category] = (acc[tran.category] || 0) + tran.amount
          return acc
        }, {})

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
    }
  }, [filter, finances])

  if (!dataEgreso?.labels || dataEgreso?.labels.length === 0)
    return <p>cargando</p>

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-black text-md">Reportes de Gastos</h1>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="2025" selected>
          2025
        </option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>
      <Pie data={dataEgreso} options={options} />
    </div>
  )
}

export default ReportsPage
