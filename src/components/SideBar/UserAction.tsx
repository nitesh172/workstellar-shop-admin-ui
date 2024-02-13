import { useAuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import { deleteCookie } from 'cookies-next'
import React from 'react'

const UserAction = () => {
  const { currentUser, setIsAuthenticated } = useAuthContext()
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="text-sm font-medium text-black">
          {currentUser?.entityName}
        </div>
        <div className="text-xs text-grey capitalize">
          {currentUser?.role?.toLowerCase()}
        </div>
      </div>
      <span
        onClick={() => {
          setIsAuthenticated(false)
          deleteCookie('workStellarToken')
        }}
        className="cursor-pointer"
      >
        <Image src="/images/logout.svg" alt="" width={24} height={24} />
      </span>
    </div>
  )
}

export default UserAction
