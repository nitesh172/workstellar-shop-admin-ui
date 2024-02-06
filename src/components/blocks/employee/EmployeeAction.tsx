'use client'
import React from 'react'
import SearchField from '@/components/Input/SearchFiled'
import { useEmployeeContext } from '@/context/EmployeesContext'
import { usePaginationContext } from '@/context/PaginationContext'
import Button from '@/components/Buttons/Button'

const EmployeeAction = () => {
  const { searchTerm, setSearchTerm, getUsers, setAddPopup } = useEmployeeContext()

  const open = () => setAddPopup(true)

  const { limit, page } = usePaginationContext()

  return (
    <div className="flex flex-row items-center justify-between mb-8 md:mb-12">
      <div className="text-2xl text-black font-medium">Employees</div>
      <div className="flex flex-row gap-4 flex-1 justify-end">
        <SearchField
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (e.key === 'Enter') {
                getUsers(
                  `users?perPage=${limit}&currentPage=${page}&searchString=${searchTerm}`
                )
              }
            }
          }}
          className="w-[25%]"
        />
        <Button
          text="+ Employee"
          onClick={open}
          dark
          className="rounded-lg bg-primary p-4 text-white"
        />
      </div>
    </div>
  )
}

export default EmployeeAction
