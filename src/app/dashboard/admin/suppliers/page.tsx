'use client'
import { Button } from '@components/form/Button'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { Modal } from '@components/form/Modal'
import Table from '@components/tables/Table'
import { useSuppliers } from '@hooks/useSuppliers'
import { Supplier } from '@models/suppliers.model'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supplierSchema } from '@utils/validations'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { Download, PlusIcon } from '@components/icons/DashboardIcon'
import { useComponentToPDF } from '@hooks/useImageToPdf'

const SuppliersPage = () => {
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const { exportAsPDF, ref } = useComponentToPDF({
    filename: 'Lista_proveedores.pdf'
  })

  const {
    suppliers,
    isSuppliersLoading,
    createSupplierMutation,
    suppliersError
  } = useSuppliers()

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Contacto', accessorKey: 'contact' },
    { header: 'Teléfono', accessorKey: 'phone' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Dirección', accessorKey: 'address' }
  ]

  const methods = useForm<Supplier>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: '',
      contact: '',
      phone: '',
      email: '',
      address: '',
      supplied_products: ''
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods
  console.log(errors)

  const handleCreateSupplier: SubmitHandler<Supplier> = async (data) => {
    if (!data) return
    const { name, contact, phone, email, address, supplied_products } = data

    const newSupplier: Supplier = {
      name,
      contact,
      phone,
      email,
      address,
      supplied_products
    }
    try {
      await createSupplierMutation.mutateAsync(newSupplier)
    } catch (err) {
      console.error('Error al crear proveedor', err)
    }
  }

  const handleViewDetails = (data: Supplier) => {
    console.log(data)
  }

  if (isSuppliersLoading) return <div className="text-black">Cargando...</div>
  if (suppliersError)
    return <div className="text-black">Error: {suppliersError.message}</div>

  return (
    <div ref={ref} id="report" className="relative">
      <div className="flex justify-center items-center max-w-md">
        <Button onClick={exportAsPDF} className="absolute top-0 right-0 z-50 ">
          <Download className="fill-white w-4 h-4 md:w-6 md:h-6" />
        </Button>
      </div>

      <ButtonAnimated
        title="Agregar Proveedor"
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
      >
        <PlusIcon />
      </ButtonAnimated>
      <Table
        data={suppliers?.suppliers ?? []}
        columns={columns}
        onViewDetails={handleViewDetails}
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Nuevo Proveedor"
      >
        <Form onSubmit={handleSubmit(handleCreateSupplier)} methods={methods}>
          <InputField
            name="name"
            register={register}
            label="Nombre"
            errors={errors}
            type="text"
          />
          <InputField
            name="contact"
            register={register}
            label="Contacto"
            errors={errors}
            type="text"
          />
          <InputField
            name="phone"
            register={register}
            label="Teléfono"
            errors={errors}
            type="text"
          />
          <InputField
            name="email"
            register={register}
            label="Email"
            errors={errors}
            type="text"
          />
          <InputField
            name="address"
            register={register}
            label="Dirección"
            errors={errors}
            type="text"
          />
          <InputField
            name="supplied_products"
            register={register}
            label="Productos Suministrados"
            errors={errors}
            type="text"
          />
          <Button
            loading={isSuppliersLoading}
            disabled={isSuppliersLoading}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default SuppliersPage
