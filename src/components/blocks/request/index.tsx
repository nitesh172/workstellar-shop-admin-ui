'use client'
import DynamicTable from '@/components/DynamicTable'
import { Pagination } from '@/components/Pagination'
import { useRequestContext } from '@/context/RequestContext'
import { usePaginationContext } from '@/context/PaginationContext'
import { RequestProps } from '@/types'
import { convertISODate } from '@/utils/API'
import React, { useEffect, useRef, useState } from 'react'

const RequestTable = () => {
  const { requests, searchTerm, getRequests, loading } = useRequestContext()

  const { page, limit } = usePaginationContext()

  const initialized = useRef(false)
  const [access, setAccess] = useState(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      setAccess(true)
    }
  }, [])

  useEffect(() => {
    !!access &&
      !searchTerm &&
      getRequests(`requests?perPage=${limit}&currentPage=${page}`)
  }, [limit, page, access, searchTerm])

  return (
    <div className="flex flex-col gap-7">
      <DynamicTable
        data={requests}
        loading={loading}
        options={{
          fieldFunctions: {
            id: (request: RequestProps, index: number) => {
              return page === 1 ? index + 1 : (page - 1) * limit + index + 1
            },
            createdAt: (request: RequestProps) => {
              return <div>{convertISODate(request.createdAt)}</div>
            },
            companyName: (request: RequestProps) => {
              return (
                <div className="flex flex-col">
                  <div className="capitalize">{request?.fullName}</div>
                  <div className="text-grey capitalize">
                    {request.companyName}
                  </div>
                </div>
              )
            },
            clientType: (request: RequestProps) => {
              return (
                <div className="bg-chipColor px-3 py-2.5 text-center rounded-[32px] capitalize">
                  {request.clientType?.toLowerCase()}
                </div>
              )
            },
            email: (request: RequestProps) => {
              return (
                <div className="flex flex-col">
                  <div>{request?.email}</div>
                  <div className="text-grey">{request.phoneNumber}</div>
                </div>
              )
            },
            commitment: (request: RequestProps) => {
              return (
                <div>
                  {request.commitment === 'PARTTIME'
                    ? 'Part time'
                    : 'Full time'}
                </div>
              )
            },
            onboardPeriod: (request: RequestProps) => {
              return (
                <div>
                  {request.onboardPeriod === 'INWEEK'
                    ? 'Week'
                    : request.onboardPeriod === 'INMONTH'
                    ? 'Month'
                    : request.onboardPeriod}
                </div>
              )
            },
          },
        }}
        headers={{
          id: 'S.no',
          companyName: 'Company',
          clientType: 'Type',
          email: 'Contact Information',
          skills: 'Skills',
          commitment: 'Commitment',
          onboardPeriod: 'Work start',
          createdAt: 'Created date',
        }}
        headersCSS={{
          id: 'w-[7%]',
          companyName: 'w-[25%]',
          email: 'w-[20%]',
          clientType: 'w-[6%]',
          skills: 'w-[20%]',
          commitment: 'w-[6%]',
          onboardPeriod: 'w-[6%]',
          createdAt: 'w-[10%]',
        }}
      />
      <Pagination />
    </div>
  )
}

export default RequestTable
