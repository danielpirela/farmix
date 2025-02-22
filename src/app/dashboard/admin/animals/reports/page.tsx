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
import { Button } from '@components/pdf/Button'

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

const monthNames = {
  '01': 'Enero',
  '02': 'Febrero',
  '03': 'Marzo',
  '04': 'Abril',
  '05': 'Mayo',
  '06': 'Junio',
  '07': 'Julio',
  '08': 'Agosto',
  '09': 'Septiembre',
  '10': 'Octubre',
  '11': 'Noviembre',
  '12': 'Diciembre'
}

const ReportsPage = () => {
  const { milkProductionData } = useMilkProduction()
  const [data, setData] = useState({})
  const [monthlyData, setMonthlyData] = useState({})
  const [yearlyData, setYearlyData] = useState({})
  const [dailyDataGeneral, setDailyDataGeneral] = useState({})
  const [monthlyDataGeneral, setMonthlyDataGeneral] = useState({})
  const [yearlyDataGeneral, setYearlyDataGeneral] = useState({})

  const options = {
    responsive: true,
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
  const monthlyOptions = {
    responsive: true,
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
    if (milkProductionData) {
      console.log(milkProductionData)

      // Procesar los datos para las estadísticas
      const milkData = milkProductionData?.reduce((acc, animal) => {
        acc[animal.name] = animal.quantity
        return acc
      }, {})

      const milkDailyData = milkProductionData?.reduce((acc, animal) => {
        acc[animal.date] = (acc[animal.date] || 0) + animal.quantity
        return acc
      }, {})
      // ... código existente ...
      const milkMonthlyData = milkProductionData?.reduce((acc, animal) => {
        const [year, month] = animal.date.split('-')
        const key = `${year}-${month}`
        acc[key] = (acc[key] || 0) + animal.quantity
        return acc
      }, {})

      const milkYearlyData = milkProductionData?.reduce((acc, animal) => {
        const year = animal.date.split('-')[0] // Obtener el mes
        acc[year] = (acc[year] || 0) + animal.quantity // Asegurarse de que acc[month] sea un número
        return acc
      }, {})

      const namesDaily = Object.keys(milkDailyData)
      const milkDaily = Object.values(milkDailyData)

      const namesMonthly = Object.keys(milkMonthlyData)
      const milkMonthly = Object.values(milkMonthlyData)

      const namesYearly = Object.keys(milkYearlyData)
      const milkYearly = Object.values(milkYearlyData)

      const names = Object.keys(milkData)
      const milk = Object.values(milkData)

      // Calcular la producción mensual de leche
      const monthlyMilkProduction = milk.map((milkQuantity) => {
        const totalMilk = (milkQuantity as number) * 30
        return totalMilk
      })

      const yearlyMilkProduction = milk.map((milkQuantity) => {
        const totalMilk = (milkQuantity as number) * 365
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
      })

      setDailyDataGeneral({
        labels: namesDaily,
        datasets: [
          {
            label: 'Producciones Diaria general',
            data: milkDaily,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }
        ]
      })

      setMonthlyDataGeneral({
        labels: namesMonthly,
        datasets: [
          {
            label: 'Producciones Mensuales de Leche',
            data: milkMonthly,
            backgroundColor: 'rgba(153, 102, 255, 0.6)'
          }
        ]
      })

      setYearlyDataGeneral({
        labels: namesYearly,
        datasets: [
          {
            label: 'Producciones Diarias de Leche',
            data: milkYearly,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }
        ]
      })
    }
  }, [])

  if (!data?.labels || data?.labels.length === 0) return <p>cargando</p>

  return (
    <div>
      <h1 className="text-black text-lg text-pretty">
        Reportes de Produccion de leche
      </h1>
      <Bar data={data} options={options} />
      <Bar data={monthlyData} options={monthlyOptions} />
      <Bar data={yearlyData} options={yearlyOptions} />
      <Bar data={dailyDataGeneral} options={dailyDataGeneral} />
      <Bar data={monthlyDataGeneral} options={monthlyOptions} />
      <Bar data={yearlyDataGeneral} options={yearlyOptions} />
    </div>
  )
}

export default ReportsPage
