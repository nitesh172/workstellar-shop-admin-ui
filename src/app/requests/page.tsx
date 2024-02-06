import Wrapper from '@/components/Wrapper'
import RequestTable from '@/components/blocks/request'
import RequestAction from '@/components/blocks/request/RequestAction'
import { PaginationProvider } from '@/context/PaginationContext'
import { RequestProvider } from '@/context/RequestContext'
import React from 'react'

const page = () => {
  return (
    <Wrapper>
      <div className="flex flex-col">
        <PaginationProvider>
          <RequestProvider>
            <RequestAction />
            <RequestTable />
          </RequestProvider>
        </PaginationProvider>
      </div>
    </Wrapper>
  )
}

export default page
