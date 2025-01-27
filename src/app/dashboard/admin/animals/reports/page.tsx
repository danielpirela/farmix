'use client'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { useMilkProduction } from '@hooks/useMilkProduction'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const ReportsPage = () => {
  const { milkProductionData } = useMilkProduction()
  const [data, setData] = useState({})
  const [monthlyData, setMonthlyData] = useState({})

  const options = {
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
        max: 30
      },
      x: {
        ticks: { color: 'rgba(0, 220, 195)' }
      }
    }
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

  useEffect(() => {
    if (milkProductionData) {
      console.log(milkProductionData)

      // Procesar los datos para las estadísticas
      const milkData = milkProductionData?.reduce((acc, animal) => {
        acc[animal.name] = animal.quantity
        return acc
      }, {})

      console.log(milkData)

      const names = Object.keys(milkData)
      const milk = Object.values(milkData)

      // Calcular la producción mensual de leche
      const monthlyMilkProduction = milk.map((milkQuantity) => {
        const totalMilk = (milkQuantity as number) * 30
        return totalMilk
      })

      setData({
        labels: names,
        datasets: [
          {
            label: 'Producciones Diarias de Leche',
            data: milk,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }
        ]
      })

      // Configurar datos para la gráfica mensual
      setMonthlyData({
        labels: names,
        datasets: [
          {
            label: 'Producciones Mensuales de Leche',
            data: monthlyMilkProduction, // Usar la nueva variable aquí
            backgroundColor: 'rgba(153, 102, 255, 0.6)'
          }
        ]
      })
    }
  }, [])

  if (!data?.labels || data?.labels.length === 0) return <p>cargando</p>

  return (
    <div>
      <h1>Reportes de Ganado</h1>
      <Bar data={data} options={options} />
      <Bar data={monthlyData} options={monthlyOptions} />
    </div>
  )
}

export default ReportsPage
