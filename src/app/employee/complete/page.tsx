"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { supabaseClient } from '@lib/supabase'
import { userSchema, USER_FORM_FIELDS } from '@utils/validations'
import {InputField} from '@components/form/ImputFiled'

export default function CompleteProfile() {

  const { data: session } = useSession()
  const router = useRouter()

  // Usamos React Hook Form con Zod
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      idDocument: '',
      phone: '',
      address: '',
      hireDate: '20/01/2022',
    }
  })

  const onSubmit =  handleSubmit( async (data) => {
    if(!data) {
      console.error("Error in form data:", data)
      return
    }
      const supabase = await supabaseClient()

    const { firstName, lastName,  idDocument,  phone, address, hireDate} = data

    const finalData = {
        first_name : firstName,
        last_name: lastName,
        id_document: idDocument,
        phone : phone,
        address: address,
        hire_date: hireDate,
        salary: 0,
      }

    const { error } = await supabase
      .from('employees')
      .update(finalData)
      .eq('email', session?.user?.email)

    if (error) {
      console.error("Error updating profile:", error)
      return
    }
      router.push('/')
    }
)

  return (
    <div className='min-h-screen min-w-full flex justify-center items-center bg-white flex-col gap-3'>
      <h2 className='text-2xl text-black font-semibold '>Completa tu perfil</h2>
      <form
        className='grid gap-6 mb-6 md:grid-cols-2'
        onSubmit={() => onSubmit()}>
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
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
