// pages/profile/[id].tsx
import { GetServerSideProps } from 'next'
import Image from 'next/image'

interface EmployeeDetails {
  employee_id: string
  email: string
  first_name: string
  last_name: string
  id_document: string
  phone: string
  address: string
  hire_date: string
  salary: number
  status: string
  img: string
  role_name: string
}

interface ProfilePageProps {
  employee: EmployeeDetails
}

export default function ProfilePage({ employee }: ProfilePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <Image
            src={employee.img || '/default-avatar.png'}
            alt={`${employee.first_name} ${employee.last_name}`}
            width={128}
            height={128}
            className="rounded-full"
          />
          <h2 className="text-2xl font-semibold mt-4">
            {employee.first_name} {employee.last_name}
          </h2>
          <p className="text-gray-600">{employee.role_name}</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Employee ID:</span>
            <span>{employee.employee_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{employee.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">ID Document:</span>
            <span>{employee.id_document}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone:</span>
            <span>{employee.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Address:</span>
            <span>{employee.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Hire Date:</span>
            <span>{employee.hire_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Salary:</span>
            <span>${employee.salary.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span>{employee.status}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Fetch employee details based on the ID
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!

  // Simulated fetch. Replace this with your actual API call or database query.
  const employee = {
    employee_id: id,
    email: 'johndoe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    id_document: '12345678',
    phone: '+1234567890',
    address: '1234 Elm Street',
    hire_date: '2022-01-20',
    salary: 50000,
    status: 'Active',
    img: 'https://via.placeholder.com/128',
    role_name: 'Software Engineer'
  }

  if (!employee) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      employee
    }
  }
}
