'use client'

import React, { useState } from 'react'
import { Modal } from '@components/form/Modal'
import { Button } from '@components/form/Button'
import { HealthControl } from '@models/healthControl.model'
import { Animal } from '@models/animals.model'
import { Employee } from '@models/types'

interface HealthControlDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  healthControl: HealthControl | null
  animal: Animal | null
  employee: Employee | null
}

const HealthControlDetailsModal: React.FC<HealthControlDetailsModalProps> = ({
  isOpen,
  onClose,
  healthControl,
  animal,
  employee
}) => {
  const [showAnimalDetails, setShowAnimalDetails] = useState(false)
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles del Control de Salud"
    >
      <div className="p-4 text-black max-h-80 overflow-y-auto">
        <h2 className="text-lg font-semibold">
          Información del Control de Salud
        </h2>
        <p>
          <strong>ID del Control:</strong> {healthControl?.id}
        </p>
        <p>
          <strong>ID del Animal:</strong> {healthControl?.animal_id}
        </p>
        <p>
          <strong>Fecha de Control:</strong> {healthControl?.checkup_date}
        </p>
        <p>
          <strong>Diagnóstico:</strong> {healthControl?.diagnosis}
        </p>
        <p>
          <strong>Tratamiento:</strong> {healthControl?.treatment}
        </p>
        <p>
          <strong>ID del Empleado:</strong> {healthControl?.employee_id}
        </p>

        <div className="mt-4">
          <Button onClick={() => setShowAnimalDetails(!showAnimalDetails)}>
            {showAnimalDetails ? 'Ver Menos' : 'Ver Más sobre el Animal'}
          </Button>
          {showAnimalDetails && animal && (
            <div className="mt-2 p-2 border rounded bg-gray-100">
              <h3 className="font-semibold">Detalles del Animal</h3>
              <p>
                <strong>Nombre:</strong> {animal.name}
              </p>
              <p>
                <strong>Código:</strong> {animal.code}
              </p>
              <p>
                <strong>Tipo:</strong> {animal.type}
              </p>
              <p>
                <strong>Raza:</strong> {animal.breed}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <Button onClick={() => setShowEmployeeDetails(!showEmployeeDetails)}>
            {showEmployeeDetails ? 'Ver Menos' : 'Ver Más sobre el Empleado'}
          </Button>
          {showEmployeeDetails && employee && (
            <div className="mt-2 p-2 border rounded bg-gray-100">
              <h3 className="font-semibold">Detalles del Empleado</h3>
              <p>
                <strong>Nombre:</strong> {employee.first_name}{' '}
                {employee.last_name}
              </p>
              <p>
                <strong>ID del Empleado:</strong> {employee.employee_id}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default HealthControlDetailsModal
