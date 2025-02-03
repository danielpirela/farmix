import { supabase } from '@lib/supabase'
import type { Certificate, CertificateByIdResponse, CertificateResponse, CreateTransactionResponse,UpdateTransactionResponse,DeleteTransactionResponse } from '@models/certificate.model'

export const getCertificates = async (): Promise<CertificateResponse> => {
    try {
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
        if (error) throw new Error('Error getting certificates: ' + error.message)
        return { certificates: data as Certificate[] }
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error getting certificates: ' + err.message)
        return { certificates: null }
    }
}

export const getCertificateById = async (id: string): Promise<CertificateByIdResponse> => {
    try {
        const { data, error } = await supabase
            .from('certificates')
            .select('*, employees(*)')
            .eq('id', id)
        if (error) throw new Error('Error getting certificate by id: ' + error.message)
        return { certificate: data?.[0] || null}
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error getting certificate by id: ' + err.message)
        return { certificate: null }
    }
}

export const createCertificate = async (certificate: Certificate): Promise<CreateTransactionResponse> => {
    try {
        const { data, error } = await supabase
            .from('certificates')
            .insert(certificate)
        if (error) throw new Error('Error creating certificate: ' + error.message)
        return { certificate: data?.[0] || null}
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error creating certificate: ' + err.message)
        return { certificate: null }
    }
}

export const updateCertificate = async (certificate: Certificate): Promise<UpdateTransactionResponse> => {
    try {
        const { data, error } = await supabase
            .from('certificates')
            .update(certificate)
            .eq('id', certificate.id)
        if (error) throw new Error('Error updating certificate: ' + error.message)
        return { updatedCertificate: data || null }
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error updating certificate: ' + err.message)
        return { updatedCertificate: null }
    }
}

export const deleteCertificate = async (id: string): Promise<DeleteTransactionResponse> => {
    try {
        const { data, error } = await supabase
            .from('certificates')
            .delete()
            .eq('id', id)
        if (error) throw new Error('Error deleting certificate: ' + error.message)
        return { data }
    }
    catch (err) {
        if (err instanceof Error) throw new Error('Error deleting certificate: ' + err.message)
        return { data: null }
    }
}
