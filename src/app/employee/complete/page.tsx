"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { supabaseClient } from '@components/lib/supabase'
import { userSchema, USER_FORM_FIELDS } from '@utils/validations'
import {InputField} from '@components/components/form/ImputFiled'

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
        hire_date: hireDate
      }

    const { data: Employee, error } = await supabase
      .from('employees')
      .update(finalData)
      .eq('email', session?.user?.email)

    if (error) {
      console.error("Error updating profile:", error)
      return
    }
    console.log("respuesta del update" + Employee)

    router.push('/')
    }
)

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
        }}>
        <InputField
          label="First Name"
          name={USER_FORM_FIELDS.firstName}
          register={register}
          errors={errors}
        />

        <InputField
          label="Last Name"
          name={USER_FORM_FIELDS.lastName}
          register={register}
          errors={errors}
        />

        <InputField
          label="ID Document"
          name={USER_FORM_FIELDS.idDocument}
          register={register}
          errors={errors}
        />

        <InputField
          label="Phone"
          name={USER_FORM_FIELDS.phone}
          register={register}
          errors={errors}
        />

        <InputField
          label="Address"
          name={USER_FORM_FIELDS.address}
          register={register}
          errors={errors}
        />

        <InputField
          label="Hire Date (dd/mm/yyyy)"
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
