'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, USER_FORM_FIELDS } from '@utils/validations'
import { InputField } from '@components/form/ImputFiled'
import { useUpdateProfile } from '@hooks/useUpdateProfile'
import { AlertToast } from '@components/AlertToast'
import { useSession } from 'next-auth/react'
import { Button } from '@components/form/Buttom'
import { Form } from '@components/form/Form'

export default function CompleteProfile() {
  const { data: session } = useSession()

  const { employee, mutate, isPending, isError } = useUpdateProfile()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      idDocument: '',
      phone: '',
      address: '',
      hireDate: '20/01/2022'
    },
    mode: 'onBlur'
  })

  const onSubmit = (data: any) => {
    const { address, firstName, hireDate, idDocument, lastName, phone } = data
    const profileData = {
      address: address,
      first_name: firstName,
      hire_date: hireDate,
      id_document: idDocument,
      last_name: lastName,
      phone: phone,
      salary: 0
    }

    mutate(
      {
        email: session?.user?.email ?? '',
        profileData
      },
      {
        onSuccess: () => {
          if (session) {
            session.user.isProfileComplete = true
          }
        },
        onError: (error) => {
          console.error('Error updating profile:', error.message)
        }
      }
    )
  }

  return (
    <div className="min-h-screen min-w-full flex justify-center items-center bg-white dark:bg-gray-900 dark:text-white flex-col gap-3 mt-20">
      <h2 className="text-2xl text-black  dark:text-white font-semibold ">
        Completa tu perfil
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Nombres"
          name={USER_FORM_FIELDS.firstName}
          register={register}
          errors={errors}
        />

        <InputField
          label="Apellidos"
          name={USER_FORM_FIELDS.lastName}
          register={register}
          errors={errors}
        />

        <InputField
          label="Cedula de Identidad"
          name={USER_FORM_FIELDS.idDocument}
          register={register}
          errors={errors}
        />

        <InputField
          label="Numero de Teléfono"
          name={USER_FORM_FIELDS.phone}
          register={register}
          errors={errors}
        />

        <InputField
          label="Dirección"
          name={USER_FORM_FIELDS.address}
          register={register}
          errors={errors}
        />

        <InputField
          label="Fecha de contratación"
          name={USER_FORM_FIELDS.hireDate}
          register={register}
          errors={errors}
          type="text"
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
