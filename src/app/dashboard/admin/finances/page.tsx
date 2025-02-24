'use client'
import { TransactionTypePill } from '@components/tables/TransactionTypePill'
import { Button } from '@components/form/Button'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { Modal } from '@components/form/Modal'
import { Option } from '@components/form/Option'
import { Select } from '@components/form/Select'
import Table from '@components/tables/Table'
import { useFinances } from '@hooks/useFinances'
import { Finance } from '@models/finances.model'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Transaction, transactionSchema } from '@utils/validations'
import {
  transactionMethods,
  transactionOptions,
  transactionTypes
} from '../../../../const/finances'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { PlusIcon } from '@components/icons/DashboardIcon'
import { useSession } from 'next-auth/react'
import { useSuppliers } from '@hooks/useSuppliers'
import { useClients } from '@hooks/useClients'

const FinancesPage = () => {
  const { data: session } = useSession()
  const id = session?.user?.id ?? null

  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false)

  const {
    finances,
    financesError,
    isFinancesLoading,
    createTransactionMutation,
    updateTransactionMutation,
    deleteTransactionMutation
  } = useFinances()

  const { suppliers, isSuppliersLoading } = useSuppliers()
  const { clients, isClientsLoading } = useClients()

  const columns = [
    {
      header: 'Empleado',
      accessorKey: 'full_name',
      cell: (info: {
        row: {
          original: { employees: { first_name: string; last_name: string } }
        }
      }) =>
        `${info.row.original.employees.first_name} ${info.row.original.employees.last_name}`
    },
    { header: 'Categoría', accessorKey: 'category' },
    {
      header: 'Monto',
      accessorKey: 'amount',
      cell: (info: { row: { original: { amount: number } } }) =>
        `${info.row.original.amount.toFixed(2)}$`
    },
    { header: 'Método de pago', accessorKey: 'method' },
    { header: 'Fecha', accessorKey: 'transaction_date' },
    { header: 'Tipo', accessorKey: 'type', cell: TransactionTypePill }
  ]

  const handleCreateTransaction: SubmitHandler<Transaction> = async (data) => {
    if (!data) return
    const {
      type,
      description,
      category,
      amount,
      method,
      transaction_date,
      descriptionOpt,
      client_id,
      supplier_id
    } = data

    const client = client_id === '' ? null : client_id
    const supplier = supplier_id === '' ? null : supplier_id
    const newTransaction = {
      type,
      amount: Number(amount),
      transaction_date: transaction_date,
      description: descriptionOpt ?? description,
      method,
      category,
      employee_id: id,
      client_id: client,
      supplier_id: supplier
    }
    await createTransactionMutation.mutateAsync(newTransaction)
  }

  const handleUpdateTransaction = async (id: string) => {
    const updatedData = { amount: 200 } // Datos a actualizar
    await updateTransactionMutation.mutateAsync({ id, data: updatedData })
  }

  const handleDeleteTransaction = async (id: string) => {
    await deleteTransactionMutation.mutateAsync(id)
  }

  const methods = useForm<Transaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: '',
      description: '',
      amount: '0',
      method: '',
      category: '',
      descriptionOpt: '',
      employee_id: '',
      client_id: '',
      supplier_id: ''
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  if (isFinancesLoading || isSuppliersLoading || isClientsLoading)
    return <div className="text-black">Cargando...</div>
  if (financesError)
    return <div className="text-black">Error: {financesError.message}</div>

  const finalFinances = finances?.finances ?? []

  const handleViewDetails = (data: Finance) => {
    console.log(data)
  }

  return (
    <>
      <ButtonAnimated
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
        title="Nueva Transacción"
      >
        <PlusIcon />
      </ButtonAnimated>

      <Table
        data={finalFinances as Finance[]}
        columns={columns}
        onViewDetails={handleViewDetails}
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Nueva Transacción"
      >
        <Form
          onSubmit={handleSubmit(handleCreateTransaction)}
          methods={methods}
        >
          <InputField
            name="amount"
            register={register}
            label="Monto"
            errors={errors}
            type="number"
          />
          <Select name="type" register={register} label="Tipo" errors={errors}>
            {transactionTypes.map((type) => (
              <Option key={type} value={type} label={type} />
            ))}
          </Select>

          <Select
            name="method"
            register={register}
            label="Metodo de pago"
            errors={errors}
          >
            {transactionMethods.map((method) => (
              <Option key={method} value={method} label={method} />
            ))}
          </Select>

          <Select
            name="category"
            register={register}
            label="Categoria"
            errors={errors}
          >
            {transactionOptions.map(({ category }) => (
              <Option key={category} value={category} label={category} />
            ))}
          </Select>

          <Select
            name="description"
            register={register}
            label="Descripcion"
            errors={errors}
          >
            {transactionOptions.map(({ description }) => (
              <Option
                key={crypto.randomUUID().toString()}
                value={description}
                label={description}
              />
            ))}
          </Select>

          <InputField
            name="descriptionOpt"
            register={register}
            label="Descripcion"
            errors={errors}
            type="textarea"
          />

          <InputField
            name="transaction_date"
            register={register}
            label="Fecha"
            errors={errors}
            type="date"
          />

          <Select
            name="client_id"
            register={register}
            label="Cliente"
            errors={errors}
          >
            {clients?.clients.map(({ first_name, last_name, id }) => (
              <Option
                key={id}
                value={id}
                label={`${first_name} ${last_name}`}
              />
            ))}
          </Select>
          <Select
            name="supplier_id"
            register={register}
            label="Proveedor"
            errors={errors}
          >
            {suppliers?.suppliers.map(({ name, supplier_id }) => (
              <Option key={supplier_id} value={supplier_id} label={name} />
            ))}
          </Select>

          <Button
            loading={isFinancesLoading}
            disabled={isFinancesLoading}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default FinancesPage
