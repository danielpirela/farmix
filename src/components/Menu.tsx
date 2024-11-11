'use client'

import { ReactNode, useState } from 'react'
import { Aside } from './Aside'
import { SecondNavbar } from './SecondNavbar'
import {DashboardContainer} from './DashboardContainer'


export function Menu({children} : {children : ReactNode}) {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <SecondNavbar onClickToggle={() => setIsOpen(!isOpen)}/>
      <Aside state={isOpen}/>
      <DashboardContainer>
      {children}
    </DashboardContainer>
    </div>
    )
}
