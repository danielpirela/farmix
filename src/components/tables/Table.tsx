import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { SortIcon } from '@components/ArrowsIcons'
import { CustomCellRenderer } from './CustomCellRenderer'
interface Props<T extends object> {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  onViewDetails?: (data: T) => void
}

export default function Table<T extends object>({
  data,
  columns,
  onViewDetails
}: Props<T>) {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  })

  return (
    <>
      {data.length > 0 && (
        <div className="flex flex-col min-h-screen animate-once animate-duration-300 animate-delay-300 animate-fade-left">
          {/* Search bar */}
          <div className="pb-4">
            <label className="sr-only">Search</label>
            <div className="relative mt-1">
              <input
                type="text"
                id="table-search"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                className="block w-full sm:max-w-sm p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg h-11 bg-gray-50 focus:ring-accent focus:border-accent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search for items"
              />
            </div>
          </div>

          {/* Table container */}
          <div className="overflow-x-auto rounded-md shadow-md bg-white dark:bg-gray-800 max-w-full animate-once animate-duration-300 animate-delay-300">
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-md">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 min-w-[150px] cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <SortIcon direction={header.column.getIsSorted()} />
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="rounded-md">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis dark:text-white"
                      >
                        <button
                          onClick={() => onViewDetails(cell?.row?.original)}
                        >
                          <CustomCellRenderer cell={cell} />
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="inline-flex mt-4 space-x-1">
            <button
              onClick={() => table.previousPage()}
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent-ligth"
            >
              Anterior
            </button>
            <button
              onClick={() => table.setPageIndex(0)}
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent-ligth"
            >
              Primera
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent-ligth"
            >
              Última
            </button>
            <button
              onClick={() => table.nextPage()}
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent-ligth"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </>
  )
}
