'use client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Order } from '@/types'

export type PaginationContextType = {
  setLimit: (limit: number) => void
  setPage: (page: number) => void
  setIsLoading: (isLoading: boolean) => void
  setOrder: (order: Order) => void
  setTotalCount: (totalCount: number) => void
  setTotalPages: (totalPages: number) => void
  isLoading: boolean
  limit: number
  page: number
  totalCount: number
  totalPages: number
  order: Order
}

const PaginationContext: any = createContext<PaginationContextType>(
  {} as PaginationContextType
)
export type PaginationProviderProps = {
  children: ReactNode
}

export const usePaginationContext = () => {
  return useContext<PaginationContextType>(PaginationContext)
}

export const PaginationProvider = (props: PaginationProviderProps) => {
  const { children } = props
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>(Order.DESC)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {}, [page])

  const defaultContext: PaginationContextType = {
    ...props,
    setLimit,
    setPage: setPage,
    setIsLoading,
    setOrder,
    setTotalCount,
    setTotalPages,
    limit,
    page,
    totalCount,
    totalPages,
    isLoading,
    order,
  }

  return (
    <PaginationContext.Provider value={defaultContext}>
      {children}
    </PaginationContext.Provider>
  )
}
