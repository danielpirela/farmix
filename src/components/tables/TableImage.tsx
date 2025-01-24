'use client'
import UserImage from '@components/auth/UserImage'

export function TableImage({ getValue, table, cell }: any) {
  const value =
    getValue() ||
    'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid'

  const { viewDetails } = table.options.meta

  return (
    <button onClick={() => viewDetails(cell.row?.original)}>
      {value && (
        <UserImage
          src={value as string}
          name={`profile photo of user ${value}`}
        />
      )}
    </button>
  )
}
