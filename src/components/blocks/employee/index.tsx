'use client'
import DynamicTable from '@/components/DynamicTable'
import { Pagination } from '@/components/Pagination'
import PopupEncloser from '@/components/PopupEncloser/PopupEncloser'
import { useEmployeeContext } from '@/context/EmployeesContext'
import { usePaginationContext } from '@/context/PaginationContext'
import { usePopper } from '@/hooks/use-popper'
import { HttpMethod, UserProps, UserStatus } from '@/types'
import { convertISODate, useCaller } from '@/utils/API'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import AddUserPopup from './AddUserPopup'
import ConfirmationPopup from '@/components/ConfirmationPopup'

const EmployeeTable = () => {
  const {
    setConfirmBanPopup,
    setUser,
    addPopup,
    confirmBanPopup,
    users,
    searchTerm,
    getUsers,
    user,
    setAddPopup,
    loading,
  } = useEmployeeContext()

  const { page, limit } = usePaginationContext()

  const initialized = useRef(false)
  const [access, setAccess] = useState(false)

  const close = () => {
    setAddPopup(false)
    setUser(null)
  }

  const closeDeletePopup = () => {
    setConfirmBanPopup(false)
    setUser(null)
  }

  const { execute: banUser } = useCaller({
    method: HttpMethod.PATCH,
    doneCb: (resp: any) => {
      if (!resp) return
      getUsers(`users?perPage=${limit}&currentPage=${page}`)
      toast.success(
        `User ${user?.status === UserStatus.INACTIVE ? 'enabled' : 'disabled'}.`
      )
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      setAccess(true)
    }
  }, [])

  useEffect(() => {
    !!access &&
      !searchTerm &&
      getUsers(`users?perPage=${limit}&currentPage=${page}`)
  }, [limit, page, access, searchTerm])

  return (
    <div className="flex flex-col gap-7">
      <DynamicTable
        data={users}
        loading={loading}
        options={{
          fieldFunctions: {
            id: (user: UserProps, index: number) => {
              return page === 1 ? index + 1 : (page - 1) * limit + index + 1
            },
            entityName: (user: UserProps) => {
              return (
                <div className="flex flex-col">
                  <div>{user.entityName}</div>
                  <div className="text-grey">
                    {user.country}{!!user.city && user.city !== 'NA' && `, ${user.city}`}
                  </div>
                </div>
              )
            },
            action: (user: UserProps) => {
              return <ActionMenu user={user} />
            },
            createdAt: (user: UserProps) => {
              return <div className="">{convertISODate(user.createdAt)}</div>
            },
            role: (user: UserProps) => {
              return (
                <div className="bg-chipColor px-3 py-2.5 w-fit text-center rounded-[32px] capitalize">
                  {user?.role?.toLowerCase()}
                </div>
              )
            },
            status: (user: UserProps) => {
              return (
                <div className="bg-chipColor px-4 py-2.5 w-fit text-center rounded-[28px] capitalize">
                  {user?.status?.toLowerCase()}
                </div>
              )
            },
            lastActive: (user: UserProps) => {
              return (
                <div
                  className={`${
                    user.lastActive === null ? 'text-center' : 'text-left'
                  }`}
                >
                  {user.lastActive === null
                    ? '-'
                    : convertISODate(user.lastActive)}
                </div>
              )
            },
          },
        }}
        headers={{
          id: 'S.no',
          entityName: 'Name',
          role: 'Role',
          email: 'Email ID',
          status: 'Status',
          lastActive: 'Last active',
          createdAt: 'Created date',
          action: 'Action',
        }}
        headersCSS={{
          id: 'w-[7%]',
          entityName: 'w-[33%]',
          role: 'w-[15%]',
          email: 'w-[25%]',
          status: 'w-[13%]',
          lastActive: 'w-[12%]',
          createdAt: 'w-[12%]',
          action: 'w-[4%]',
        }}
      />
      <Pagination />
      <PopupEncloser close={close} show={addPopup}>
        <AddUserPopup close={close} />
      </PopupEncloser>
      <PopupEncloser close={closeDeletePopup} show={confirmBanPopup}>
        <ConfirmationPopup
          close={closeDeletePopup}
          confirm={() => {
            banUser(`users/${user?.id}`, {
              status:
                user?.status === UserStatus.ACTIVE
                  ? UserStatus.INACTIVE
                  : UserStatus.ACTIVE,
            })
            setConfirmBanPopup(false)
          }}
          title="Confirmation required"
          content="Are you sure you want to proceed with this action?"
        />
      </PopupEncloser>
    </div>
  )
}

type ActionProps = {
  user: UserProps
}

const ActionMenu: React.FC<ActionProps> = (props) => {
  const { user } = props
  const { setUser, setConfirmBanPopup, setAddPopup } = useEmployeeContext()

  const open = () => setAddPopup(true)

  const openDeletePopup = () => setConfirmBanPopup(true)

  let [trigger, container] = usePopper({
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  })

  return (
    <div className="py-3 text-left text-14 relative group cursor-pointer">
      <span ref={trigger}>
        <Image src="/images/dots.svg" alt="" width={24} height={24} />
      </span>
      <ul
        ref={container}
        className="hidden bg-white absolute -left-10 -mt-1 space-y-2 group-hover:block p-2 rounded-lg shadow-lg shadow-grey-shade-0/10 group-hover:bg-grey-shade-14 z-50"
      >
        <li
          onClick={() => {
            open()
            setUser(user)
          }}
          className="px-4 py-2 hover:bg-chipColor rounded-md"
        >
          Edit
        </li>
        <li
          onClick={() => {
            openDeletePopup()
            setUser(user)
          }}
          className="px-4 py-2 hover:bg-chipColor rounded-md"
        >
          {user.status === UserStatus.ACTIVE ? 'Disable' : 'Enable'}
        </li>
      </ul>
    </div>
  )
}

export default EmployeeTable
