'use client'

import React, { useState } from 'react'
import { Modal } from '@components/form/Modal'
import { HealthControl } from '@models/healthControl.model'
import { Animal } from '@models/animals.model'
import { Employee } from '@models/types'
import { AppleButton } from '@components/form/AppleButton'

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
        {healthControl ? (
          <div className="space-y-4">
            <div className="ring-1 ring-gray-200 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">
                Información del Control de Salud
              </h2>
              <p className="mb-1">
                <strong>ID:</strong> {healthControl.id}
              </p>
              <p className="mb-1">
                <strong>Fecha de Control:</strong> {healthControl.checkup_date}
              </p>
              <p className="mb-1">
                <strong>Diagnóstico:</strong> {healthControl.diagnosis}
              </p>
              <p className="mb-1">
                <strong>Tratamiento:</strong> {healthControl.treatment}
              </p>
            </div>

            {animal && (
              <div className="ring-1 ring-gray-200 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Información del Animal
                </h3>
                <p className="mb-1">
                  <strong>Nombre:</strong> {animal.name}
                </p>
                <p className="mb-1">
                  <strong>ID:</strong> {animal.code}
                </p>
                <AppleButton
                  onClick={() => setShowAnimalDetails(!showAnimalDetails)}
                >
                  {showAnimalDetails ? 'Ocultar detalles' : 'Ver más detalles'}
                </AppleButton>
                {showAnimalDetails && (
                  <div>
                    <p className="mb-1">
                      <strong>Raza:</strong> {animal.breed}
                    </p>
                    <p className="mb-1">
                      <strong>Edad:</strong>{' '}
                      {new Date().getFullYear() -
                        new Date(animal.birth_date).getFullYear()}
                      años
                    </p>
                  </div>
                )}
              </div>
            )}

            {employee && (
              <div className="ring-1 ring-gray-200 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Información del Empleado
                </h3>
                <p className="mb-1">
                  <strong>Nombre:</strong> {employee.first_name}{' '}
                  {employee.last_name}
                </p>
                <p className="mb-1">
                  <strong>ID:</strong> {employee.employee_id}
                </p>
                <AppleButton
                  onClick={() => setShowEmployeeDetails(!showEmployeeDetails)}
                >
                  {showEmployeeDetails
                    ? 'Ocultar detalles'
                    : 'Ver más detalles'}
                </AppleButton>
                {showEmployeeDetails && (
                  <div>
                    <p className="mb-1">
                      <strong>Puesto:</strong> Medico Veterinario
                    </p>
                    <p className="mb-1">
                      <strong>Departamento:</strong> {employee.status}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>No se ha seleccionado ningún control de salud.</p>
        )}
      </div>
    </Modal>
  )
}

export default HealthControlDetailsModal
