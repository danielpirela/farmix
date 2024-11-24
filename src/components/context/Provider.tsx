'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react'
import { Employee } from '../../models/types'

type MyContextType = {
  profile: Employee
  setProfile: (employee: Employee) => void
}

// Estado inicial para el objeto `profile`
const initialProfile: Employee = {
  employee_id: '',
  email: '',
  first_name: '',
  last_name: '',
  id_document: '',
  phone: '',
  address: '',
  hire_date: '',
  salary: 0,
  role_id: ''
}

// Creamos el contexto con el tipo especificado y valor inicial
const MyContext = createContext<MyContextType | undefined>(undefined)

// Creamos el proveedor
export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Employee>(initialProfile)

  return (
    <MyContext.Provider value={{ profile, setProfile }}>
      {children}
    </MyContext.Provider>
  )
}

// Custom hook para usar el contexto
export const useMyContext = () => {
  const context = useContext(MyContext)
  if (!context) throw new Error('useMyContext debe usarse dentro de MyProvider')
  return context
}
