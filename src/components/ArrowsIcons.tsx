import { UpIcon, DownIcon } from '@components/icons/DashboardIcon'

interface SortIconProps {
  direction: 'asc' | 'desc' | null | false
}

export const SortIcon = ({ direction }: SortIconProps) => {
  if (direction === 'asc') {
    return <UpIcon />
  }
  if (direction === 'desc') {
    return <DownIcon />
  }
  return null
}
