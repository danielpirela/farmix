'use client'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEmployees } from '@hooks/useEmployees'
import { Button } from '@components/form/Button'
import { Form } from './form/Form'
import { Transaction } from '@utils/validations'
import { InputField } from './form/InputFiled'

// Definición del esquema de validación usando Zod
const employeeSchema = z.object({
  first_name: z.string().min(1, 'El nombre es requerido'),
  last_name: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  address: z.string().optional(),
  role_id: z.string().min(1, 'El rol es requerido')
})

type EmployeeFormInputs = z.infer<typeof employeeSchema>

const CreateEmployeeForm: React.FC = () => {
  const { createEmployeeMutation } = useEmployees()

  const methods = useForm<Transaction>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      type: '',
      description: '',
      amount: '0',
      method: '',
      category: '',
      descriptionOpt: '',
      employee_id: '',
      client_id: '',
      supplier_id: ''
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  const onSubmit: SubmitHandler<EmployeeFormInputs> = async (data) => {
    await createEmployeeMutation.mutateAsync(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} methods={methods}>
      <div>
        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <InputField
          register={register}
          name="first_name"
          type="text"
          label="Nombre"
          errors={errors}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm">{errors.first_name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-gray-700"
        >
          Apellido
        </label>
        <input
          {...register('last_name')}
          type="text"
          id="last_name"
          className={`mt-1 block w-full border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm">{errors.last_name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Teléfono
        </label>
        <input
          {...register('phone')}
          type="text"
          id="phone"
          className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Dirección
        </label>
        <input
          {...register('address')}
          type="text"
          id="address"
          className={`mt-1 block w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
      </div>

      <div>
        <label
          htmlFor="role_id"
          className="block text-sm font-medium text-gray-700"
        >
          Rol
        </label>
        <select
          {...register('role_id')}
          id="role_id"
          className={`mt-1 block w-full border ${errors.role_id ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        >
          <option value="">Selecciona un rol</option>
          <option value="admin">Admin</option>
          <option value="employee">Empleado</option>
          <option value="manager">Gerente</option>
          {/* Agrega más roles según sea necesario */}
        </select>
        {errors.role_id && (
          <p className="text-red-500 text-sm">{errors.role_id.message}</p>
        )}
      </div>

      <Button type="submit" loading={createEmployeeMutation.isLoading}>
        Crear Empleado
      </Button>
    </Form>
  )
}

export default CreateEmployeeForm
