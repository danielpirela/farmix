'use client'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)
import { useFinances } from '@hooks/useFinances'

const ReportsPage = () => {
  const { finances } = useFinances()
  const [data, setData] = useState({})
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
      const financesData = finances?.finances?.reduce((acc, tran) => {
        acc[tran.category] = tran.amount
        return acc
      }, {})

      console.log(financesData)

      const categegory = Object.keys(financesData)
      const amount = Object.values(financesData)

      // Calcular la producción mensual de leche
      /* const monthlyMilkProduction = milk.map((milkQuantity) => {
        const totalMilk = (milkQuantity as number) * 30
        return totalMilk
      })

      const yearlyMilkProduction = milk.map((milkQuantity) => {
        const totalMilk = (milkQuantity as number) * 365
        return totalMilk
      }) */

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

      // Configurar datos para la gráfica mensual
      /*  setMonthlyData({
        labels: names,
        datasets: [
          {
            label: 'Producciones Mensuales de Leche',
            data: monthlyMilkProduction, // Usar la nueva variable aquí
            backgroundColor: 'rgba(153, 102, 255, 0.6)'
          }
        ]
      })

      // Configurar datos para la gráfica anual
      setYearlyData({
        labels: names,
        datasets: [
          {
            label: 'Producciones Anuales de Leche',
            data: yearlyMilkProduction, // Usar la nueva variable aquí
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }
        ]
      }) */
    }
  }, [])

  if (!data?.labels || data?.labels.length === 0) return <p>cargando</p>

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-black text-md">Reportes de Gastos</h1>
      <Pie data={data} options={options} />
    </div>
  )
}

export default ReportsPage
