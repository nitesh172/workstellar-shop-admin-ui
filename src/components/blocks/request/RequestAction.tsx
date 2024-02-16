'use client'
import React from 'react'
import SearchField from '@/components/Input/SearchFiled'
import { useRequestContext } from '@/context/RequestContext'
import { usePaginationContext } from '@/context/PaginationContext'
import Button from '@/components/Buttons/Button'
import * as XLSX from 'xlsx';

const RequestAction = () => {
  const { searchTerm, setSearchTerm, getRequests, requests } = useRequestContext()

  const { limit, page } = usePaginationContext()

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(requests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  return (
    <div className="flex flex-row items-center justify-between mb-8 md:mb-12">
      <div className="text-2xl text-black font-medium">Contacted Users</div>
      <div className="flex flex-row gap-4 flex-1 justify-end">
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
        <Button
          text="Export"
          onClick={downloadExcel}
          dark
          className="rounded-lg p-4 text-white"
        />
      </div>
    </div>
  )
}

export default RequestAction
