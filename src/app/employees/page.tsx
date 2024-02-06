import Wrapper from '@/components/Wrapper'
import EmployeeTable from '@/components/blocks/employee'
import EmployeeAction from '@/components/blocks/employee/EmployeeAction'
import { EmployeeProvider } from '@/context/EmployeesContext'
import { PaginationProvider } from '@/context/PaginationContext'
import React from 'react'

const Employees = () => {
  return (
    <Wrapper>
      <div className="flex flex-col">
        <PaginationProvider>
          <EmployeeProvider>
            <EmployeeAction />
            <EmployeeTable />
          </EmployeeProvider>
        </PaginationProvider>
      </div>
    </Wrapper>
  )
}

export default Employees
