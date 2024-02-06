'use client'
import DynamicTable from '@/components/DynamicTable'
import { Pagination } from '@/components/Pagination'
import PopupEncloser from '@/components/PopupEncloser/PopupEncloser'
import { useTalentContext } from '@/context/TalentContext'
import { usePaginationContext } from '@/context/PaginationContext'
import { usePopper } from '@/hooks/use-popper'
import { HttpMethod, TalentProps, UserProps, UserStatus } from '@/types'
import { convertISODate, useCaller } from '@/utils/API'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import AddUserPopup from './AddTalentPopup'
import ConfirmationPopup from '@/components/ConfirmationPopup'

const TalentTable = () => {
  const {
    setConfirmBanPopup,
    setTalent,
    addPopup,
    confirmBanPopup,
    talents,
    searchTerm,
    getTalents,
    talent,
    setAddPopup,
  } = useTalentContext()

  const { page, limit } = usePaginationContext()

  const initialized = useRef(false)
  const [access, setAccess] = useState(false)

  const close = () => {
    setAddPopup(false)
    setTalent(null)
  }

  const closeDeletePopup = () => {
    setConfirmBanPopup(false)
    setTalent(null)
  }

  const { execute: banUser } = useCaller({
    method: HttpMethod.PATCH,
    doneCb: (resp: any) => {
      if (!resp) return
      getTalents(`talents?perPage=${limit}&currentPage=${page}`)
      toast.success(
        `User ${
          talent?.user?.status === UserStatus.INACTIVE ? 'enabled' : 'disabled'
        }.`
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    !!access &&
      !searchTerm &&
      getTalents(`talents?perPage=${limit}&currentPage=${page}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, access, searchTerm])

  return (
    <div className="flex flex-col gap-7">
      <DynamicTable
        data={talents}
        options={{
          fieldFunctions: {
            id: (talent: TalentProps, index: number) => {
              return page === 1 ? index + 1 : (page - 1) * limit + index + 1
            },
            entityName: (talent: TalentProps) => {
              return (
                <div className="flex flex-col">
                  <div>{talent?.user?.entityName}</div>
                  <div className="text-grey">
                    {talent?.user?.country}, {talent?.user?.city}
                  </div>
                </div>
              )
            },
            action: (talent: TalentProps) => {
              return <ActionMenu talent={talent} />
            },
            createdAt: (talent: TalentProps) => {
              return <div className="">{convertISODate(talent.createdAt)}</div>
            },
            designation: (talent: TalentProps) => {
              return (
                <div className="bg-chipColor px-3 py-2.5 text-center w-fit rounded-[32px] capitalize">
                  {talent.designation}
                </div>
              )
            },
            level: (talent: TalentProps) => {
              return (
                <div className="bg-chipColor px-3 py-2.5 text-center w-fit rounded-[32px] capitalize">
                  {talent?.level?.toLowerCase()}
                </div>
              )
            },
            paymentType: (talent: TalentProps) => {
              return (
                <div className="flex flex-col gap-0">
                  <div className="text-black">$ {talent.amount.toString()}</div>
                  <div className="text-grey capitalize">
                    {talent.paymentType?.toLowerCase()}
                  </div>
                </div>
              )
            },
            skills: (talent: TalentProps) => {
              return (
                <div className="flex flex-row flex-wrap gap-2">
                  {!!talent.skills &&
                    talent.skills.length &&
                    talent.skills.map((skill, index) => {
                      return (
                        <div key={skill.id}>
                          {skill.name}
                          {talent.skills.length - 1 === index ? '' : ','}
                        </div>
                      )
                    })}
                </div>
              )
            },
          },
        }}
        headers={{
          id: 'S.no',
          entityName: 'Name',
          designation: 'Designation',
          level: 'Level',
          paymentType: 'Payment',
          experienceYear: 'Years of Exp',
          skills: 'Skillsets',
          action: 'Action',
        }}
        headersCSS={{
          id: 'w-[7%]',
          entityName: 'w-[20%]',
          designation: 'w-[15%]',
          level: 'w-[15%]',
          paymentType: 'w-[10%]',
          experienceYear: 'w-[7%]',
          skills: 'w-[33%]',
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
            banUser(`users/${talent?.user?.id}`, {
              status:
                talent?.user.status === UserStatus.ACTIVE
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
  talent: TalentProps
}

const ActionMenu: React.FC<ActionProps> = (props) => {
  const { talent } = props
  const { setTalent, setConfirmBanPopup, setAddPopup } = useTalentContext()

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
            setTalent(talent)
          }}
          className="px-4 py-2 hover:bg-chipColor rounded-md"
        >
          Edit
        </li>
        <li
          onClick={() => {
            openDeletePopup()
            setTalent(talent)
          }}
          className="px-4 py-2 hover:bg-chipColor rounded-md"
        >
          {talent.user.status === UserStatus.ACTIVE ? 'Disable' : 'Enable'}
        </li>
      </ul>
    </div>
  )
}

export default TalentTable
