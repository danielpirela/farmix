import { DetailsIcon } from '@components/icons/DashboardIcon'

export function Details({ table, cell }: any) {
  const { viewDetails } = table.options.meta

  return (
    <button
      onClick={() => viewDetails(cell.row?.original)}
      className="flex items-center justify-center gap-1"
    >
      <DetailsIcon className="fill-accent w-4 h-4 hover:fill-accent-light hover:scale-110 transition-all duration-300" />
    </button>
  )
}
