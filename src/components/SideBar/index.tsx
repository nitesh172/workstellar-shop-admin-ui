import Image from 'next/image'
import React from 'react'
import SideItems from './SideItems'
import logo from '../../../public/images/logo.svg'
import UserAction from './UserAction'

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between px-6 py-6 h-screen min-h-screen top-0 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] bottom-0 left-0 sticky w-[17%] min-w-max bg-bgColor">
      <div className='flex flex-col gap-y-6'>
        <Image
          alt="Brnad Logo"
          src={logo}
          className="h-8 w-fit cursor-pointer"
          priority
        />
        <SideItems />
      </div>
      <UserAction />
    </div>
  )
}

export default Sidebar
