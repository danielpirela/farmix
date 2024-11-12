import { useState } from 'react'
import { Employee } from '../../types'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"

import type {  ColumnDef} from "@tanstack/react-table"

interface Props {
  data: Employee[]
  columns: ColumnDef<TData>[]
}

export default function Table({ data, columns }: Props) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
  <div className='flex flex-col overflow-x-auto min-h-screen'>
  <div className="pb-4">
        <label className="sr-only">Search</label>
        <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
              type="text"
              id="table-search"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 h-11 bg-gray-50 focus:ring-accent focus:border-accent hover:border-accent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
        </div>
    </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll rounded-md px-3">
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer min-w-[150px]" // Ancho mínimo para las celdas
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              {header.isPlaceholder ? null : (
                <div className='flex items-center'>
                  {flexRender(
                    header.column.columnDef.header || header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    { asc: "⬆️", desc: "⬇️" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis dark:text-white">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
    <tfoot>
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((footer) => (
            <th key={footer.id}>
              {flexRender(
                footer.column.columnDef.footer,
                footer.getContext()
              )}
            </th>
          ))}
        </tr>
      ))}
    </tfoot>
  </table>

  {/* Paginação */}
  <div className="inline-flex mt-2 xs:mt-0 gap-1">
    <button onClick={() => table.previousPage()} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round"  strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
      </svg>
      Anterior
    </button>
    <button onClick={() => table.setPageIndex(0)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      Primera
    </button>
    <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      Última
    </button>
    <button onClick={() => table.nextPage()} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-md hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      Siguiente
      <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
  </div>
</div>
  )
}
