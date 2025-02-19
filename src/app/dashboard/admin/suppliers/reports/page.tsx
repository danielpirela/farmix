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
import { useInventory } from '@hooks/useInventory'
import Table from '@components/tables/Table'

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
  { header: 'Nombre', accessorKey: 'suppliers.name' },
  { header: 'Teléfono', accessorKey: 'suppliers.phone' },
  { header: 'Email', accessorKey: 'suppliers.email' },
  { header: 'Productos', accessorKey: 'name' }
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

const SuppliersReportsPage = () => {
  const { inventory, isInventoryLoading, inventoryError } = useInventory()
  const [data, setData] = useState<any>({ labels: [], datasets: [] })
  const [filterData, setFilterdata] = useState('')
  const [filteredData, setFilteredData] = useState<any[]>(inventory?.inventory)

  useEffect(() => {
    if (inventory) {
      const supplierNames = inventory.inventory.map(
        ({ suppliers }) => suppliers.name
      )

      const supplierCounts = inventory.inventory.map(
        ({ suppliers }) => suppliers.supplied_products?.length || 0
      )

      setData({
        labels: supplierNames,
        datasets: [
          {
            label: 'Cantidad de Productos Suministrados',
            data: supplierCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }
        ]
      })

      const filteredSuppliers = inventory.inventory.filter(
        (item) => item.name === filterData || filterData === ''
      )
      setFilteredData(filteredSuppliers)
    }
  }, [inventory, filterData])
  console.log(filteredData)
  if (isInventoryLoading) return <div className="text-black">Cargando...</div>
  if (inventoryError)
    return <div className="text-black">Error: {inventoryError.message}</div>
  return (
    <>
      {/*   <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Reportes de Proveedores
      </h1>
      <div className="flex justify-center mt-4">
        {data.labels.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <p className="text-black">No hay datos para mostrar.</p>
        )}
      </div> */}

      <h1 className="text-2xl font-bold text-center text-gray-800 my-6">
        Proveedores por Producto
      </h1>

      <select
        value={filterData}
        onChange={(e) => {
          setFilterdata(e.target.value)
        }}
        id="name"
        className="bg-gray-50 border border-gray-300 text-gray-900 max-w-36  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Todos</option>
        {Array.from(new Set(inventory?.inventory.map((item) => item.name))).map(
          (name) => {
            const item = inventory.inventory.find((i) => i.name === name)
            return (
              <option
                value={name}
                key={item?.product_id}
                className="text-black"
              >
                {name}
              </option>
            )
          }
        )}
      </select>

      {filteredData !== undefined && (
        <Table
          data={inventory?.inventory || []}
          columns={columns}
          filterAndSort={filterData}
        />
      )}
    </>
  )
}

export default SuppliersReportsPage
