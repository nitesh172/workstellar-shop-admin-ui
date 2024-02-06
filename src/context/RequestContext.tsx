'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { usePaginationContext } from './PaginationContext'
import { useCaller } from '@/utils/API'
import { HttpMethod, RequestProps, RequestResponseProps } from '@/types'
import toast from 'react-hot-toast'

export type RequestContextType = {
  searchTerm: string
  setSearchTerm: (value: string) => void
  getRequests: Function
  requests: RequestProps[]
}

const RequestContext: any = createContext<RequestContextType>(
  {} as RequestContextType
)

export type RequestProviderProps = {
  children?: ReactNode
}

export const useRequestContext = () => {
  return useContext<RequestContextType>(RequestContext)
}

export const RequestProvider = (props: RequestProviderProps) => {
  const { children } = props
  const [requests, setRequests] = useState<RequestProps[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { setTotalCount, setTotalPages, setPage, setLimit, setIsLoading } =
    usePaginationContext()

  const { execute: getRequests } = useCaller({
    method: HttpMethod.GET,
    doneCb: (resp: RequestResponseProps) => {
      if (!resp) return
      setRequests(resp.requests)
      setPage(resp.currentPage)
      setLimit(resp.perPage)
      setTotalPages(resp.totalPage)
      setTotalCount(resp.totalItems)
      setIsLoading(false)
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  const defaultContext: RequestContextType = {
    ...props,
    searchTerm,
    setSearchTerm,
    getRequests,
    requests,
  }

  return (
    <RequestContext.Provider value={defaultContext}>
      {children}
    </RequestContext.Provider>
  )
}
