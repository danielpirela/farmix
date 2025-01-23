'use client'
import UserImage from '@components/auth/UserImage'

export function TableImage({ getValue, table, cell }: any) {
  const value = getValue() || ''

  const { viewDetails } = table.options.meta

  return (
    <button onClick={() => viewDetails(cell.row?.original)}>
      <UserImage
        src={value as string}
        name={`profile photo of user ${value}`}
      />
    </button>
  )
}
