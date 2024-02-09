'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { usePaginationContext } from './PaginationContext'
import { useCaller } from '@/utils/API'
import { HttpMethod, EmployeePaginationProps, UserProps } from '@/types'
import toast from 'react-hot-toast'

export type EmployeeContextType = {
  user: UserProps | null
  setUser: (user: UserProps | null) => void
  confirmBanPopup: boolean
  setConfirmBanPopup: (value: boolean) => void
  addPopup: boolean
  loading: boolean
  setAddPopup: (value: boolean) => void
  searchTerm: string
  setSearchTerm: (value: string) => void
  getUsers: Function
  users: UserProps[]
}

const EmployeeContext: any = createContext<EmployeeContextType>(
  {} as EmployeeContextType
)

export type EmployeeProviderProps = {
  children?: ReactNode
}

export const useEmployeeContext = () => {
  return useContext<EmployeeContextType>(EmployeeContext)
}

export const EmployeeProvider = (props: EmployeeProviderProps) => {
  const { children } = props
  const [confirmBanPopup, setConfirmBanPopup] = useState<boolean>(false)
  const [addPopup, setAddPopup] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<UserProps[]>([])
  const [user, setUser] = useState<UserProps | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { setTotalCount, setTotalPages, setPage, setLimit, setIsLoading } =
    usePaginationContext()

  const { execute: getUsers } = useCaller({
    method: HttpMethod.GET,
    doneCb: (resp: EmployeePaginationProps) => {
      if (!resp) return
      setUsers(resp.users)
      setPage(resp.currentPage)
      setLimit(resp.perPage)
      setTotalPages(resp.totalPage)
      setTotalCount(resp.totalItems)
      setIsLoading(false)
      setLoading(false)
    },
    errorCb: (failed: any) => {
      toast.error(failed)
      setLoading(false)
    },
  })

  const defaultContext: EmployeeContextType = {
    ...props,
    user,
    setUser,
    confirmBanPopup,
    setConfirmBanPopup,
    addPopup,
    loading,
    setAddPopup,
    searchTerm,
    setSearchTerm,
    getUsers,
    users,
  }

  return (
    <EmployeeContext.Provider value={defaultContext}>
      {children}
    </EmployeeContext.Provider>
  )
}
