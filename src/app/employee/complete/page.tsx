'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, USER_FORM_FIELDS } from '@utils/validations'
import { InputField } from '@components/form/InputFiled'
import { useUpdateProfile } from '@hooks/useUpdateProfile'
import { AlertToast } from '@components/AlertToast'
import { useSession } from 'next-auth/react'
import { Button } from '@components/form/Button'
import { Form } from '@components/form/Form'
import { getEmployee } from '@services/employee'
import { useEffect, useState } from 'react'
import { Employee } from '@models/types'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

interface FormData {
  address: string
  firstName: string
  hire_date: Date
  idDocument: string
  lastName: string
  phone: string
}

export default function CompleteProfile() {
  const router = useRouter()
  const { data: session, update } = useSession()

  const {
    data: employee,
    mutate: updateProfile,
    isPending,
    isError
  } = useUpdateProfile()
  const [prevEmployee, setPrevEmployee] = useState<Employee | null>(null)

  const methods = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: prevEmployee?.first_name,
      lastName: prevEmployee?.last_name,
      idDocument: prevEmployee?.id_document,
      phone: prevEmployee?.phone,
      address: prevEmployee?.address,
      hire_date: prevEmployee?.hire_date
    },
    mode: 'onBlur'
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  console.log(errors)

  const onSubmit = async (data: FormData) => {
    console.log(data)
    const formattedHireDate = data.hire_date
      ? format(new Date(data.hire_date), 'MM-dd-yyyy')
      : null

    const profileData = {
      address: data.address || prevEmployee?.address || '',
      first_name: data.firstName || prevEmployee?.first_name || '',
      hire_date: formattedHireDate,
      id_document: data.idDocument || prevEmployee?.id_document || '',
      last_name: data.lastName || prevEmployee?.last_name || '',
      phone: data.phone || prevEmployee?.phone || '',
      salary: 0
    }

    updateProfile(
      {
        email: session?.user?.email ?? '',
        profileData
      },
      {
        onSuccess: async () => {
          // sospechoso este condicional
          if (session) {
            await update()
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Add a small delay
            router.push('/dashboard')
          }
        },
        onError: (error) => {
          console.error('Error updating profile:', error.message)
        }
      }
    )
  }

  useEffect(() => {
    if (!session) return
    const fetchData = async () => {
      const prevEmployeetpm = await getEmployee(session?.user?.email || null)
      if (!prevEmployeetpm) return
      console.log(prevEmployeetpm[0])

      setPrevEmployee(prevEmployeetpm[0])
    }
    fetchData()
  }, [session])

  useEffect(() => {
    if (prevEmployee) {
      methods.reset({
        firstName: prevEmployee.first_name,
        lastName: prevEmployee.last_name,
        idDocument: prevEmployee.id_document,
        phone: prevEmployee.phone,
        address: prevEmployee.address,
        hire_date: prevEmployee.hire_date
          ? format(new Date(prevEmployee.hire_date), 'yyyy-MM-dd')
          : ''
      })
    }
  }, [prevEmployee, methods])

  return (
    <div className="min-h-screen min-w-full flex justify-center items-center bg-white dark:bg-gray-900 dark:text-white flex-col gap-3 mt-20">
      <h2 className="text-2xl text-black  dark:text-white font-semibold ">
        Completa tu perfil
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <InputField
          label="Nombres"
          defaultValue={prevEmployee?.first_name}
          name={USER_FORM_FIELDS.firstName}
          register={register}
          errors={errors}
        />

        <InputField
          label="Apellidos"
          defaultValue={prevEmployee?.last_name}
          name={USER_FORM_FIELDS.lastName}
          register={register}
          errors={errors}
        />

        <InputField
          label="Cedula de Identidad"
          defaultValue={prevEmployee?.id_document}
          name={USER_FORM_FIELDS.idDocument}
          register={register}
          errors={errors}
        />

        <InputField
          label="Numero de Teléfono"
          defaultValue={prevEmployee?.phone}
          name={USER_FORM_FIELDS.phone}
          register={register}
          errors={errors}
        />

        <InputField
          label="Dirección"
          defaultValue={prevEmployee?.address}
          name={USER_FORM_FIELDS.address}
          register={register}
          errors={errors}
        />

        <InputField
          label="Fecha de contratación"
          name={USER_FORM_FIELDS.hire_date}
          register={register}
          errors={errors}
          type="date"
          defaultValue={
            prevEmployee?.hire_date
              ? format(new Date(prevEmployee.hire_date), 'yyyy-MM-dd')
              : ''
          }
        />

        <Button type="submit" disabled={isPending} loading={isPending}>
          {isPending ? 'Actualizando' : 'Actualizar'}
        </Button>
      </Form>

      {!isPending && employee && !isError && (
        <AlertToast code="info" message=" Ir a pagina de inicio" href="/">
          Se actualizo el perfil correctamente
        </AlertToast>
      )}
      {isError && (
        <AlertToast code="error">No se pudo crear el perfil</AlertToast>
      )}
      {session?.user.isProfileComplete === false && (
        <AlertToast code="warning">Perfil sin completar</AlertToast>
      )}
    </div>
  )
}
