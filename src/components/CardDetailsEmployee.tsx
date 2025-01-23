import { Employee } from '@models/types'
import { LoadingIcon } from './icons/DashboardIcon'
import UserImage from './auth/UserImage'
import { StatusEmployee } from './tables/StatusEmployee'
import { formatDate } from '@utils/formatDate'

export function CardDetailsEmployee({ data }: { data: Employee | null }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 max-w-md">
      {data ? (
        <>
          <div className="mb-4">
            <div className="flex items-center gap-2 ">
              <UserImage name={data.first_name} src={data.img} />
              <h2 className="text-lg font-semibold text-gray-800">
                {data.first_name} {data.last_name}
              </h2>
            </div>
            <span className="text-sm text-gray-500 inline-block pt-1">
              ID: {data.employee_id}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <strong className="text-black dark:text-white">Email: </strong>
              <span className="text-gray-700">{data.email}</span>
            </div>
            <div>
              <strong className="text-black dark:text-white">Teléfono: </strong>
              <span className="text-gray-700">{data.phone}</span>
            </div>
            <div>
              <strong className="text-black dark:text-white">
                Dirección:{' '}
              </strong>
              <span className="text-gray-700">{data.address}</span>
            </div>
            <div>
              <strong className="text-black dark:text-white">
                Fecha de contratación:{' '}
              </strong>
              <span className="text-gray-700">
                {formatDate(data.hire_date)}
              </span>
            </div>
            <div>
              <strong className="text-black dark:text-white">Salario: </strong>
              <span className="text-green-600 font-medium">${data.salary}</span>
            </div>
            <div>
              <strong className="text-black dark:text-white">Estado: </strong>
              <StatusEmployee>{data.status}</StatusEmployee>
            </div>
            <div>
              <strong className="text-black dark:text-white">
                ID de documento:{' '}
              </strong>
              <span className="text-gray-700">{data.id_document}</span>
            </div>
            <div>
              <strong className="text-black dark:text-white">Rol: </strong>
              <span className="text-gray-700">{data.roles.role_name}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-24">
          <LoadingIcon />
        </div>
      )}
    </div>
  )
}
