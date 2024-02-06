import Wrapper from '@/components/Wrapper'
import KeysTable from '@/components/blocks/language'
import LanguageAction from '@/components/blocks/language/LanguageAction'
import { LanguageProvider } from '@/context/LanguageContext'
import { PaginationProvider } from '@/context/PaginationContext'
import React from 'react'

const Language = () => {
  return (
    <Wrapper>
      <div className="flex flex-col">
        <PaginationProvider>
          <LanguageProvider>
            <LanguageAction />
            <KeysTable />
          </LanguageProvider>
        </PaginationProvider>
      </div>
    </Wrapper>
  )
}

export default Language
