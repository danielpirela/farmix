'use client'

import { useEffect, useState } from 'react'
import Table from '@components/tables/Table'
import { useInventory } from '@hooks/useInventory'
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
import { useComponentToPDF } from '@hooks/useImageToPdf'
import { Button } from '@components/form/Button'
import { Download } from '@components/icons/DashboardIcon'

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

const columns = [
  { header: 'Nombre', accessorKey: 'name' },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: (info: { row: { original: { total: number; unit: string } } }) =>
      `${info.row.original.total} ${info.row.original.unit}`
  }
]

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

const InventoryReportsPage = () => {
  const { productNamesWithTotal, isInventoryLoading, inventoryError } =
    useInventory()

  const { ref, exportAsPDF } = useComponentToPDF({
    filename: 'Inventario_reporte.pdf'
  })
  const [inventory, setInventory] = useState<any>(productNamesWithTotal)
  const [data, setData] = useState<any>({ labels: [], datasets: [] })

  useEffect(() => {
    const productNames = inventory.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + item.total
      return acc
    }, {})

    console.log(productNames)

    setData({
      labels: Object.keys(productNames),
      datasets: [
        {
          label: 'Balance de Inventario',
          data: Object.values(productNames),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }
      ]
    })
  }, [inventory])

  if (isInventoryLoading) return <div className="text-black">Cargando...</div>
  if (inventoryError)
    return <div className="text-black">Error: {inventoryError.message}</div>

  return (
    <div ref={ref} className="relative">
      <div className="flex justify-center items-center max-w-md">
        <Button onClick={exportAsPDF} className="absolute top-0 right-0 z-50 ">
          <Download className="fill-white w-4 h-4 md:w-6 md:h-6" />
        </Button>
      </div>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Reportes de Inventario
      </h1>
      <div className="flex justify-center mt-4">
        {data.labels.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <p className="text-black">No hay datos para mostrar.</p>
        )}
      </div>

      <h1 className="text-2xl font-bold text-center text-gray-800 my-6">
        Total de Producto
      </h1>
      <Table data={productNamesWithTotal} columns={columns} />
    </div>
  )
}

export default InventoryReportsPage
