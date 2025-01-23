'use client'
import { formatDate } from '@utils/formatDate'
export function FormatData({
  getValue
}: {
  getValue: () => string | undefined
}) {
  const value = getValue() || ''

  return <p>{formatDate(value)}</p>
}
