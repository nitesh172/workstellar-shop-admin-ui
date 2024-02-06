import Wrapper from '@/components/Wrapper'
import TalentTable from '@/components/blocks/talent'
import TalentAction from '@/components/blocks/talent/TalentAction'
import { PaginationProvider } from '@/context/PaginationContext'
import { TalentProvider } from '@/context/TalentContext'
import React from 'react'

const page = () => {
  return (
    <Wrapper>
      <div className="flex flex-col">
        <PaginationProvider>
          <TalentProvider>
            <TalentAction />
            <TalentTable />
          </TalentProvider>
        </PaginationProvider>
      </div>
    </Wrapper>
  )
}

export default page
