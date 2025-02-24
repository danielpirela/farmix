'use client'

import React, { useEffect, useState } from 'react'
import { Modal } from '@components/form/Modal'
import { Client } from '@models/clients.model'
import { getClientTransactions } from '@services/clients'

interface ClientDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | null
}

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  isOpen,
  onClose,
  client
}) => {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (client) {
        setLoading(true)
        try {
          const data = await getClientTransactions(client.id)
          setTransactions(data)
        } catch (error) {
          console.error('Error fetching transactions:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchTransactions()
  }, [client])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalles del Cliente">
      <div className="p-4 text-black max-h-80 overflow-y-auto">
        {client ? (
          <>
            <div className="ring-1 ring-gray-100 p-2 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">
                Información del Cliente
              </h2>
              <p className="mb-1">
                <strong>Nombre:</strong> {client.first_name} {client.last_name}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {client.email}
              </p>
              <p className="mb-1">
                <strong>Teléfono:</strong> {client.phone}
              </p>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Transacciones</h3>
            {loading ? (
              <p>Cargando transacciones...</p>
            ) : (
              <div className="mt-2 ">
                {transactions.length > 0 ? (
                  <ul className="list-disc pl-5 gap-3 flex flex-col">
                    {transactions.map((transaction) => {
                      if (
                        transaction.type === 'Egreso' ||
                        transaction.type === 'Deuda'
                      )
                        return
                      return (
                        <li
                          key={transaction.transaction_id}
                          className="py-2 ring-1 ring-gray-100 p-2 bg-gray-50 rounded-lg flex flex-col gap-1"
                        >
                          <p>
                            <strong>ID:</strong> {transaction.transaction_id}
                          </p>
                          <p>
                            <strong>Monto:</strong> {transaction.amount}$
                          </p>
                          <p>
                            <strong>Tipo:</strong>{' '}
                            {transaction.method === 'Credito' ? (
                              <span className="inline-flex items-center bg-blue-100 text-blue-800  text-xs font-medium px-2.5 py-0.5 rounded-full">
                                <span className="w-2 h-2 me-1 rounded-full bg-blue-500"></span>
                                {transaction.method}
                              </span>
                            ) : (
                              <span
                                className={`inline-flex items-center ${transaction.type === 'Ingreso' ? 'bg-green-100 text-green-800 ' : 'bg-red-100 text-red-800'} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                              >
                                <span
                                  className={`w-2 h-2 me-1 rounded-full ${transaction.type === 'Ingreso' ? 'bg-green-500' : 'bg-red-500'}`}
                                ></span>
                                {transaction.type}
                              </span>
                            )}
                          </p>
                          <p>
                            <strong>Fecha:</strong>{' '}
                            {transaction.transaction_date}
                          </p>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p>No hay transacciones para este cliente.</p>
                )}
              </div>
            )}
          </>
        ) : (
          <p>No se ha seleccionado ningún cliente.</p>
        )}
      </div>
    </Modal>
  )
}

export default ClientDetailsModal
