import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '@services/certificates'
import type {
  Certificate,
  CertificateResponse,
  CertificateByIdResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse
} from '@models/certificate.model'

// Hook para manejar certificados
export const useCertificates = () => {
  const queryClient = useQueryClient()

  // Obtener todos los certificados
  const certificatesQuery = useQuery<CertificateResponse, Error>({
    queryKey: ['certificates'],
    queryFn: getCertificates
  })

  // Obtener un certificado por ID
  const useCertificate = (id: string) => {
    return useQuery<CertificateByIdResponse, Error>({
      queryKey: ['certificate', id],
      queryFn: () => getCertificateById(id)
    })
  }

  // Crear un nuevo certificado
  const createCertificateMutation = useMutation<
    CreateTransactionResponse,
    Error,
    Certificate
  >({
    mutationFn: createCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] })
    }
  })

  // Actualizar un certificado
  const updateCertificateMutation = useMutation<
    UpdateTransactionResponse,
    Error,
    Certificate
  >({
    mutationFn: updateCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] })
    }
  })

  // Eliminar un certificado
  const deleteCertificateMutation = useMutation<
    DeleteTransactionResponse,
    Error,
    string
  >({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] })
    }
  })

  return {
    certificates: certificatesQuery.data,
    certificatesError: certificatesQuery.error,
    isCertificatesLoading: certificatesQuery.isLoading,
    useCertificate,
    createCertificateMutation,
    updateCertificateMutation,
    deleteCertificateMutation
  }
}
