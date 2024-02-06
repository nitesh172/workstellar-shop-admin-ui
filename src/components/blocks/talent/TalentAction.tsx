'use client'
import React from 'react'
import SearchField from '@/components/Input/SearchFiled'
import { useTalentContext } from '@/context/TalentContext'
import { usePaginationContext } from '@/context/PaginationContext'
import Button from '@/components/Buttons/Button'

const TalentAction = () => {
  const { searchTerm, setSearchTerm, getTalents, setAddPopup } = useTalentContext()

  const open = () => setAddPopup(true)

  const { limit, page } = usePaginationContext()

  return (
    <div className="flex flex-row items-center justify-between mb-8 md:mb-12">
      <div className="text-2xl text-black font-medium">Talents</div>
      <div className="flex flex-row gap-4 flex-1 justify-end">
        <SearchField
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (e.key === 'Enter') {
                getTalents(
                  `talents?perPage=${limit}&currentPage=${page}&searchString=${searchTerm}`
                )
              }
            }
          }}
          className="w-[25%]"
        />
        <Button
          text="+ Talent"
          onClick={open}
          dark
          className="rounded-lg bg-primary p-4 text-white"
        />
      </div>
    </div>
  )
}

export default TalentAction
