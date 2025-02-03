'use client'

import { useState } from 'react'
import { useCertificates } from '@hooks/useCertificates'
import { Button } from '@components/form/Button'
import { Modal } from '@components/form/Modal'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supplierSchema } from '@utils/validations'
import Table from '@components/tables/Table'
import { Certificate } from '@models/certificate.model'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { PlusIcon } from '@components/icons/DashboardIcon'

const CertificatesPage = () => {
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const {
    certificates,
    certificatesError,
    isCertificatesLoading,
    createCertificateMutation
  } = useCertificates()

  const methods = useForm<Certificate>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      // Define los valores por defecto según tu modelo Certificate
      employee_id: '',
      certificate_type: '',
      start_date: '',
      end_date: ''
      // Agrega otros campos según tu modelo
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  const handleCreateCertificate: SubmitHandler<Certificate> = async (data) => {
    if (!data) return
    try {
      await createCertificateMutation.mutateAsync(data)
      setFormModalOpen(false) // Cierra el modal después de crear
    } catch (err) {
      console.error('Error al crear certificado', err)
    }
  }

  if (isCertificatesLoading)
    return <div className="text-black">Cargando...</div>
  if (certificatesError)
    return <div className="text-black">Error: {certificatesError.message}</div>
  if (certificates?.length === 0)
    return <div className="text-black">No hay certificados</div>
  return (
    <>
      <ButtonAnimated
        title="Agregar Certificado"
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
      >
        <PlusIcon />
      </ButtonAnimated>

      <Table
        data={certificates?.certificates ?? []}
        columns={[
          { header: 'Tipo', accessorKey: 'certificate_type' },
          { header: 'Empleado', accessorKey: 'employee_id' },
          { header: 'Fecha de Inicio', accessorKey: 'start_date' },
          { header: 'Fecha de Fin', accessorKey: 'end_date' }
          // Agrega más columnas según tu modelo
        ]}
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Nuevo Certificado"
      >
        <Form
          onSubmit={handleSubmit(handleCreateCertificate)}
          methods={methods}
        >
          <InputField
            name="employee_id"
            register={register}
            label="ID del Empleado"
            errors={errors}
            type="text"
          />
          <InputField
            name="certificate_type"
            register={register}
            label="Tipo de Certificado"
            errors={errors}
            type="text"
          />
          <InputField
            name="start_date"
            register={register}
            label="Fecha de Inicio"
            errors={errors}
            type="date"
          />
          <InputField
            name="end_date"
            register={register}
            label="Fecha de Fin"
            errors={errors}
            type="date"
          />
          {/* Agrega más campos según tu modelo */}
          <Button
            loading={isCertificatesLoading}
            disabled={isCertificatesLoading}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default CertificatesPage
