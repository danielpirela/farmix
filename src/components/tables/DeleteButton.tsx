import { DetailsIcon } from '@components/icons/DashboardIcon'

export function DeleteButton({ row, cell, table }: any) {
  const { deleteData } = table.options.meta
  return (
    <button
      onClick={() => deleteData(cell?.row?.original)}
      className="flex items-center justify-center gap-1"
    >
      <DetailsIcon className="fill-accent w-4 h-4 hover:fill-accent-light hover:scale-110 transition-all duration-300" />
    </button>
  )
}
