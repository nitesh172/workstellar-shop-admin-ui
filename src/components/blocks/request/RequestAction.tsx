'use client'
import React from 'react'
import SearchField from '@/components/Input/SearchFiled'
import { useRequestContext } from '@/context/RequestContext'
import { usePaginationContext } from '@/context/PaginationContext'

const RequestAction = () => {
  const { searchTerm, setSearchTerm, getRequests } = useRequestContext()

  const { limit, page } = usePaginationContext()

  return (
    <div className="flex flex-row items-center justify-between mb-8 md:mb-12">
      <div className="text-2xl text-black font-medium">Contacted Users</div>
      <SearchField
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (e.key === 'Enter') {
              getRequests(
                `requests?perPage=${limit}&currentPage=${page}&searchString=${searchTerm}`
              )
            }
          }
        }}
        className="w-[25%]"
      />
    </div>
  )
}

export default RequestAction
