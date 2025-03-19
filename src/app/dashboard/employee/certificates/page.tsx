'use client'

import { useState } from 'react'
import { useCertificates } from '@hooks/useCertificates'
import { Button } from '@components/form/Button'
import { Modal } from '@components/form/Modal'
import { Form } from '@components/form/Form'
import { InputField } from '@components/form/InputFiled'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { certificateSchema } from '@utils/validations'
import Table from '@components/tables/Table'
import {
  Certificate,
  certificateStatusOptions,
  cetidicatOptions
} from '@models/certificate.model'
import { ButtonAnimated } from '@components/form/ButtonAnimated'
import { Download, PlusIcon } from '@components/icons/DashboardIcon'

import { Details } from '@components/tables/Details'
import { useHtml2Pdf } from '@hooks/useHtml2Pdf'
import UserImage from '@components/auth/UserImage'
import { AppleButton } from '@components/form/AppleButton'

import { useEmployee } from '@hooks/useEmployee'
import { Select } from '@components/form/Select'
import { Option } from '@components/form/Option'
import { useNotificationsContext } from '@components/context/NotificationsContext'
import { NotificationsContainer } from '@components/NotificationContainer'

const columns = [
  { header: 'Detalles', accessorKey: 'id', cell: Details },
  { header: 'Tipo', accessorKey: 'certificate_type' },
  {
    header: 'Nombre',
    accessorKey: 'employee',
    cell: (info: {
      row: {
        original: { employee: { first_name: string; last_name: string } }
      }
    }) =>
      `${info.row.original.employee.first_name} ${info.row.original.employee.last_name}`
  },
  { header: 'Fecha de Inicio', accessorKey: 'start_date' },
  { header: 'Fecha de Fin', accessorKey: 'end_date' }
]

const CertificatesPage = () => {
  const { addNotification } = useNotificationsContext()
  const [isFormModalOpen, setFormModalOpen] = useState(false)
  const { employees, isLoading } = useEmployee()
  const [isViewable, setIsViewable] = useState(false)
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [isInfoVisible, setIsInfoVisible] = useState(false)

  const onViewDetails = (data: Certificate) => {
    if (!data) return setIsViewable(false)
    setIsViewable(true)
    setCertificate(data)
    return
  }
  console.log(employees)

  const {
    certificates,
    certificatesError,
    isCertificatesLoading,
    createCertificateMutation
  } = useCertificates()

  const methods = useForm<Certificate>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      // Define los valores por defecto según tu modelo Certificate
      employee_id: '',
      certificate_type: '',
      reason: '',
      status: 'Pendiente',
      issued_by: '',
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

  console.log(errors)

  const handleCreateCertificate: SubmitHandler<Certificate> = async (data) => {
    if (!data) return
    try {
      await createCertificateMutation.mutateAsync(data, {
        onSuccess: () => {
          addNotification('Constancia creado exitosamente', 'success', 3000)
        },
        onError: (err) => {
          addNotification('Error al crear Constancia', 'error', 3000)
        }
      })
      setFormModalOpen(false) // Cierra el modal después de crear
    } catch (err) {
      console.error('Error al crear certificado', err)
    }
  }
  console.log(certificates)

  if (isCertificatesLoading && isLoading)
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
          <Select
            name="employee_id"
            register={register}
            label="Empleado"
            errors={errors}
          >
            {employees.map(({ employee_id, first_name, last_name }) => (
              <Option
                key={employee_id}
                value={employee_id}
                label={`${first_name} ${last_name}`}
              />
            ))}
          </Select>

          <Select
            name="issued_by"
            register={register}
            label="Emitidor"
            errors={errors}
          >
            {employees.map(({ employee_id, first_name, last_name }) => (
              <Option
                key={employee_id + crypto.randomUUID()}
                value={employee_id}
                label={`${first_name} ${last_name}`}
              />
            ))}
          </Select>

          <Select
            name="certificate_type"
            register={register}
            label="Tipo de Certificado"
            errors={errors}
          >
            {cetidicatOptions.map((option) => (
              <Option key={option} value={option} label={option} />
            ))}
          </Select>

          <Select
            name="status"
            register={register}
            label="Estatus"
            errors={errors}
          >
            {certificateStatusOptions.map((option) => (
              <Option key={option} value={option} label={option} />
            ))}
          </Select>

          <InputField
            name="reason"
            register={register}
            label="Razon"
            errors={errors}
            type="text"
            className="min-h-24"
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
            className="my-2 p-2 border text-black dark:text-white border-gray-300 dark:border-gray-900 rounded-lg shadow-lg "
            ref={pdfRef}
          >
            <div className="flex items-center justify-start gap-2 py-3">
              <UserImage
                src={certificate?.employee?.img}
                name={certificate?.employee?.first_name}
              />
              <p className=" dark:text-white text-center">
                {`${certificate?.employee?.first_name} ${certificate?.employee?.last_name}`}
              </p>
            </div>
            {isInfoVisible && (
              <div className="flex flex-col gap-2 py-3 animate-fade-down duration-300 delay-150">
                <p className="dark:text-white">
                  <strong>CI:</strong> {certificate?.employee?.id_document}
                </p>
                <p className="dark:text-white">
                  <strong>Teléfono:</strong> {certificate?.employee?.phone}
                </p>
                <p className="dark:text-white">
                  <strong>Email:</strong> {certificate?.employee?.email}
                </p>
              </div>
            )}
            <AppleButton onClick={() => setIsInfoVisible(!isInfoVisible)}>
              {isInfoVisible ? 'Ver menos' : 'Ver más'}
            </AppleButton>

            <p className="mb-1 dark:text-white">
              <strong>Tipo de Certificado:</strong>{' '}
              {certificate.certificate_type}
            </p>

            <p className="mb-1 dark:text-white">
              <strong>Fecha de Inicio:</strong> {certificate.start_date}
            </p>
            <p className="mb-1 dark:text-white">
              <strong>Fecha de Fin:</strong> {certificate.end_date}
            </p>
            <p className="mb-1 dark:text-white">
              <strong>Motivo:</strong> {certificate.reason}
            </p>
            <p className="mb-1 dark:text-white">
              <strong>Estado:</strong> {certificate.status}
            </p>
            <p className="mb-1 dark:text-white">
              <strong>Emitido por:</strong> {certificate.issued_by ?? 'N/A'}
            </p>
            <p className="mb-1 dark:text-white">
              <strong>Fecha de Creación:</strong> {certificate.created_at}
            </p>
            <p className="mb-1 dark:text-white">
              <strong>Última Actualización:</strong> {certificate.updated_at}
            </p>
          </div>
        )}
      </Modal>
      <NotificationsContainer />
    </div>
  )
}

export default CertificatesPage
