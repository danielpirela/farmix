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
import { PlusIcon } from '@components/icons/DashboardIcon'
import { useSuppliers } from '@hooks/useSuppliers'

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

  const { suppliers, isSuppliersLoading } = useSuppliers()

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Descripción', accessorKey: 'description' },
    { header: 'Cantidad disponible', accessorKey: 'quantity_available' },
    { header: 'Costo unitario', accessorKey: 'unit_cost' },
    { header: 'Proveedor', accessorKey: 'suppliers.name' }
  ]

  const handleCreateInventory: SubmitHandler<Inventory> = async (data) => {
    if (!data) return

    const { name, description, quantity_available, unit_cost, supplier_id } =
      data
    const newInventory: Inventory = {
      name,
      description,
      quantity_available: Number(quantity_available),
      unit_cost: Number(unit_cost),
      supplier_id
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
      quantity_available: '0',
      unit_cost: '0',
      supplier_id: ''
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
    <>
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
        onViewDetails={handleViewDetails} // Implementa esta función si es necesario
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
            name="quantity_available"
            register={register}
            label="Cantidad disponible"
            errors={errors}
            type="number"
          />
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
          <Button
            loading={isInventoryLoading || isSuppliersLoading}
            disabled={isInventoryLoading || isSuppliersLoading}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default InventoryPage
