import { CustomTransactionType } from './CustomTransactionType'

export const TransactionTypePill = ({ getValue }: any) => {
  const value = getValue() || ''
  return <CustomTransactionType>{value}</CustomTransactionType>
}
