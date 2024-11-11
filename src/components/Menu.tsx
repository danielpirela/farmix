'use client'

import { ReactNode, useState } from 'react'
import { Aside } from './Aside'
import { SecondNavbar } from './SecondNavbar'


export function Menu({children} : {children : ReactNode}) {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <SecondNavbar onClickToggle={() => setIsOpen(!isOpen)}/>
      <Aside state={isOpen}/>
      {children}
    </div>
    )
}
