'use client'
import { Button } from '@components/form/Button'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { Modal } from '@components/form/Modal'
import { Option } from '@components/form/Option'
import { Select } from '@components/form/Select'
import Table from '@components/tables/Table'
import { useInventory } from '@hooks/useInventory'
import { Inventory } from '@models/inventory.model'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InventoryForm, inventorySchema } from '@utils/validations' // Asegúrate de tener un esquema de validación para el inventario
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { Download, PlusIcon } from '@components/icons/DashboardIcon'
import { useSuppliers } from '@hooks/useSuppliers'
import { useComponentToPDF } from '@hooks/useImageToPdf'

const InventoryPage = () => {
  const [isFormModalOpen, setFormModalOpen] = useState(false)

  const {
    inventory,
    inventoryError,
    isInventoryLoading,
    createInventoryMutation,
    updateInventoryMutation,
    deleteInventoryMutation
  } = useInventory()

  const { ref, exportAsPDF } = useComponentToPDF({
    filename: 'Inventario_reporte.pdf'
  })

  const { suppliers, isSuppliersLoading } = useSuppliers()

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Descripción', accessorKey: 'description' },
    {
      header: 'Cantidad y Tipo',
      accessorKey: 'quantity',
      cell: (info: {
        row: {
          original: { quantity: number; type: string; unit: string }
        }
      }) =>
        `${info.row.original.type === 'Cargo' ? +info.row.original.quantity : -info.row.original.quantity} ${info.row.original.unit}`
    },
    {
      header: 'Costo unitario',
      accessorKey: 'unit_cost',
      cell: (info: { row: { original: { unit_cost: number } } }) =>
        `${info.row.original.unit_cost}$`
    },
    { header: 'Proveedor', accessorKey: 'suppliers.name' },
    { header: 'Fecha', accessorKey: 'created_at' }
  ]

  const handleCreateInventory: SubmitHandler<Inventory> = async (data) => {
    if (!data) return

    const { name, description, unit_cost, supplier_id, type, quantity, unit } =
      data
    const newInventory: Inventory = {
      name,
      description,
      quantity: Number(quantity),
      unit_cost: Number(unit_cost),
      supplier_id,
      type,
      unit
    }
    try {
      await createInventoryMutation.mutateAsync(newInventory)
    } catch (error) {
      console.error('Error al crear el inventario:', error)
    }
  }

  const handleUpdateInventory = async (id: string) => {
    const updatedData = { quantity_available: 100 } // Datos a actualizar
    await updateInventoryMutation.mutateAsync({ id, data: updatedData })
  }

  const handleDeleteInventory = async (id: string) => {
    await deleteInventoryMutation.mutateAsync(id)
  }
  const handleViewDetails = (data: Inventory) => {
    console.log(data)
  }
  const methods = useForm<InventoryForm>({
    resolver: zodResolver(inventorySchema), // Asegúrate de tener un esquema de validación para el inventario
    defaultValues: {
      name: '',
      description: '',
      quantity: '0',
      unit_cost: '0',
      supplier_id: '',
      type: '',
      unit: ''
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  if (isInventoryLoading || isSuppliersLoading)
    return <div className="text-black">Cargando...</div>
  if (inventoryError)
    return <div className="text-black">Error: {inventoryError.message}</div>

  const finalInventory = inventory?.inventory ?? []

  return (
    <div ref={ref} className="relative">
      <div className="flex justify-center items-center max-w-md">
        <Button onClick={exportAsPDF} className="absolute top-0 right-0 z-50 ">
          <Download className="fill-white w-4 h-4 md:w-6 md:h-6" />
        </Button>
      </div>
      <ButtonAnimated
        title="Agregar Producto"
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
      >
        <PlusIcon />
      </ButtonAnimated>
      <Table
        data={finalInventory as Inventory[]}
        columns={columns}
        onViewDetails={handleViewDetails}
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Nuevo Inventario"
      >
        <Form onSubmit={handleSubmit(handleCreateInventory)} methods={methods}>
          <InputField
            name="name"
            register={register}
            label="Nombre"
            errors={errors}
            type="text"
          />
          <InputField
            name="description"
            register={register}
            label="Descripción"
            errors={errors}
            type="text"
          />
          <InputField
            name="quantity"
            register={register}
            label="Cantidad"
            errors={errors}
            type="number"
          />
          <Select
            name="unit"
            register={register}
            label="Unidad"
            errors={errors}
          >
            <Option value="kg" label="kg" />
            <Option value="l" label="l" />
          </Select>

          <InputField
            name="unit_cost"
            register={register}
            label="Costo unitario"
            errors={errors}
            type="number"
          />
          <Select
            name="supplier_id"
            register={register}
            label="ID del proveedor"
            errors={errors}
          >
            {suppliers &&
              !isSuppliersLoading &&
              suppliers?.suppliers?.map(({ supplier_id, name }) => (
                <Option key={supplier_id} value={supplier_id} label={name} />
              ))}
          </Select>
          <Select name="type" register={register} label="Tipo" errors={errors}>
            <Option value="Descargo" label="Descargo" />
            <Option value="Cargo" label="Cargo" />
          </Select>
          <Button
            loading={isInventoryLoading || isSuppliersLoading}
            disabled={isInventoryLoading || isSuppliersLoading}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default InventoryPage
