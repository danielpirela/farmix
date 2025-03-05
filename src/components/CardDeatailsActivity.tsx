import { Activity } from '@models/types'
import { LoadingIcon } from './icons/DashboardIcon'
import UserImage from './auth/UserImage'
import { StatusEmployee } from './tables/StatusEmployee'
import { formatDate } from '@utils/formatDate'

export function CardDetailsActivity({ data }: { data: Activity | null }) {
  return (
    <div className="bg-white dark:bg-slate-800 border dark:border-gray-900/50 border-gray-200 rounded-md shadow-sm p-4 max-w-md">
      {data ? (
        <>
          <div className="mb-4">
            <div className="flex items-center gap-2 ">
              <UserImage
                name={data.employees.first_name}
                src={data.employees.img}
              />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {data.employees.first_name} {data.employees.last_name}
              </h2>
            </div>
            <span className="text-sm text-gray-500 inline-block pt-1 dark:text-white">
              ID: {data.employee_id}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <strong className="text-black dark:text-white">Email: </strong>
              <span className="text-gray-700 dark:text-white">
                {data.employees.email}
              </span>
            </div>
            <div>
              <strong className="text-black dark:text-white">Teléfono: </strong>
              <span className="text-gray-700 dark:text-white">
                {data.employees.phone}
              </span>
            </div>
            <div>
              <strong className="text-black dark:text-white">Tarea: </strong>
              <span className="text-gray-700 dark:text-white">{data.type}</span>
            </div>
            <div>
              <strong className="text-black dark:text-white">
                Descripcion:{' '}
              </strong>
              <span className="text-gray-700 dark:text-white">
                {data.description}
              </span>
            </div>
            <div>
              <strong className="text-black dark:text-white">
                ID de documento:{' '}
              </strong>
              <span className="text-gray-700 dark:text-white">
                {data.employees.id_document}
              </span>
            </div>
            <div>
              <strong className="text-black dark:text-white">Rol: </strong>
              <span className="text-gray-700 dark:text-white">
                {data?.employees?.roles?.role_name}
              </span>
            </div>
            <div>
              <strong className="text-black dark:text-white">
                Fecha de creacion:{' '}
              </strong>
              <span className="text-gray-700 dark:text-white">
                {formatDate(data.created_at)}
              </span>
            </div>
            <div>
              <strong className="text-black dark:text-white">Estado: </strong>
              <StatusEmployee>{data.status}</StatusEmployee>
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
