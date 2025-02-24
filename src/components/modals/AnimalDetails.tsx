import React from 'react'

export const AnimalDetails = ({
  animal,
  parentsData,
  childrenData,
  showDetails,
  setShowDetails
}) => {
  const healthStatusClass =
    animal?.health_status === 'Enfermo' ? 'text-red-200' : 'text-green-200'

  return (
    <div className="text-black max-h-96 overflow-y-auto  p-4 rounded">
      <strong>Nombre: {animal?.name}</strong>
      <strong>Código: {animal?.code}</strong>
      <strong>Raza: {animal?.breed}</strong>
      <strong>Tipo: {animal?.type}</strong>
      <strong>Estado de salud: {animal?.health_status}</strong>
      <strong>Ubicación: {animal?.location}</strong>
      <strong>Peso: {animal?.weight}</strong>
      <strong>Fecha de nacimiento: {animal?.birth_date}</strong>
      <strong>Etapa de vida: {animal?.life_stage}</strong>
      {parentsData.father !== null && parentsData.mother !== null ? (
        <>
          <p>
            Madre: {`${parentsData?.mother.name} - ${parentsData?.mother.code}`}
          </p>
          <p>
            Padre: {`${parentsData?.father.name} - ${parentsData?.father.code}`}
          </p>
        </>
      ) : (
        <p>Padres no especificados</p>
      )}
      {childrenData !== null && childrenData.length > 0 ? (
        <div>
          <p>Hijos:</p>
          {childrenData?.map((child) => (
            <div key={child?.code} className="border p-2 my-2 rounded-md">
              <p>{`${child?.name} - Código: ${child?.code}`}</p>
              {showDetails && (
                <div className="animate-fade-down animate-duration-300 animate-delay-100">
                  <p>{`Tipo: ${child?.type}`}</p>
                  <p>{`Fecha de parto: ${child?.created_at}`}</p>
                </div>
              )}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-500 hover:text-blue-800 hover:scale-105 transition-all duration-300"
              >
                {showDetails ? 'Ver menos' : 'Ver más'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Hijo no especificado</p>
      )}
    </div>
  )
}
