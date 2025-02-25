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
import { Download, PlusIcon } from '@components/icons/DashboardIcon'

import { Details } from '@components/tables/Details'
import { useComponentToPDF } from '@hooks/useImageToPdf'
import { useHtml2Pdf } from '@hooks/useHtml2Pdf'

const columns = [
  { header: 'Detalles', accessorKey: 'id', cell: Details },
  { header: 'Tipo', accessorKey: 'certificate_type' },
  { header: 'Empleado', accessorKey: 'employee_id' },
  { header: 'Fecha de Inicio', accessorKey: 'start_date' },
  { header: 'Fecha de Fin', accessorKey: 'end_date' }
]

const CertificatesPage = () => {
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const [isViewable, setIsViewable] = useState(false)
  const [certificate, setCertificate] = useState<Certificate | null>(null)

  const onViewDetails = (data: Certificate) => {
    if (!data) return setIsViewable(false)
    setIsViewable(true)
    setCertificate(data)
    return
  }

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

  const { pdfRef, downloadPDF } = useHtml2Pdf({
    filename: 'Costancia.pdf'
  })

  const handleCreateCertificate: SubmitHandler<Certificate> = async (data) => {
    if (!data) return
    try {
      await createCertificateMutation.mutateAsync(data)
      setFormModalOpen(false) // Cierra el modal después de crear
    } catch (err) {
      console.error('Error al crear certificado', err)
    }
  }
  console.log(certificates)

  if (isCertificatesLoading)
    return <div className="text-black">Cargando...</div>
  if (certificatesError)
    return <div className="text-black">Error: {certificatesError.message}</div>
  if (certificates?.length === 0)
    return <div className="text-black">No hay certificados</div>
  return (
    <div className="relative">
      <div className="flex justify-center items-center max-w-md">
        <Button onClick={downloadPDF} className="absolute top-0 right-0 z-50 ">
          <Download className="fill-white w-4 h-4 md:w-6 md:h-6" />
        </Button>
      </div>

      <ButtonAnimated
        title="Agregar Certificado"
        onClick={() => setFormModalOpen(true)}
        className="fixed bottom-4 right-4"
      >
        <PlusIcon />
      </ButtonAnimated>

      <Table
        data={certificates?.certificates ?? []}
        columns={columns}
        onViewDetails={onViewDetails}
      />
      {/* Mostrar el primer certificado con toda la información */}

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

      <Modal
        isOpen={isViewable}
        onClose={() => setIsViewable(false)}
        title="Detalles del Costancia"
      >
        {certificate && (
          <div
            className="my-2 p-2 border text-black border-gray-300 rounded-lg shadow-lg "
            ref={pdfRef}
          >
            <p className="mb-1">
              <strong>ID:</strong> {certificate.id}
            </p>
            <p className="mb-1">
              <strong>ID del Empleado:</strong> {certificate.employee_id}
            </p>
            <p className="mb-1">
              <strong>Tipo de Certificado:</strong>{' '}
              {certificate.certificate_type}
            </p>
            <p className="mb-1">
              <strong>Fecha de Inicio:</strong> {certificate.start_date}
            </p>
            <p className="mb-1">
              <strong>Fecha de Fin:</strong> {certificate.end_date}
            </p>
            <p className="mb-1">
              <strong>Motivo:</strong> {certificate.reason}
            </p>
            <p className="mb-1">
              <strong>Estado:</strong> {certificate.status}
            </p>
            <p className="mb-1">
              <strong>Emitido por:</strong> {certificate.issued_by ?? 'N/A'}
            </p>
            <p className="mb-1">
              <strong>Fecha de Creación:</strong> {certificate.created_at}
            </p>
            <p className="mb-1">
              <strong>Última Actualización:</strong> {certificate.updated_at}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CertificatesPage
