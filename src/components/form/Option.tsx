interface Props {
  value: string
  label: string
}

export function Option({ value, label }: Props) {
  return (
    <option key={value} value={value}>
      {label}
    </option>
  )
}
