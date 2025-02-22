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

  console.log(transactions)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalles del Cliente">
      <div className="p-4 text-black">
        {client ? (
          <>
            <h2 className="text-lg font-semibold">Información del Cliente</h2>
            <p>
              <strong>Nombre:</strong> {client.first_name} {client.last_name}
            </p>
            <p>
              <strong>Teléfono:</strong> {client.phone}
            </p>
            <p>
              <strong>Email:</strong> {client.email}
            </p>

            <h3 className="mt-4 text-lg font-semibold">Transacciones</h3>
            {loading ? (
              <p>Cargando transacciones...</p>
            ) : (
              <ul>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <li key={transaction.transaction_id}>
                      <p>
                        <strong>ID:</strong> {transaction.transaction_id}
                      </p>
                      <p>
                        <strong>Monto:</strong> {transaction.amount}$
                      </p>
                      <p>
                        <strong>Fecha:</strong> {transaction.transaction_date}
                      </p>
                      <hr />
                    </li>
                  ))
                ) : (
                  <p>No hay transacciones para este cliente.</p>
                )}
              </ul>
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
