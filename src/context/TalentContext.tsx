'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { usePaginationContext } from './PaginationContext'
import { useCaller } from '@/utils/API'
import { HttpMethod, UserProps, TalentProps, TalentResponseProps } from '@/types'
import toast from 'react-hot-toast'

export type TalentContextType = {
  talent: TalentProps | null
  setTalent: (talent: TalentProps | null) => void
  confirmBanPopup: boolean
  setConfirmBanPopup: (value: boolean) => void
  addPopup: boolean
  setAddPopup: (value: boolean) => void
  searchTerm: string
  setSearchTerm: (value: string) => void
  getTalents: Function
  talents: TalentProps[]
}

const TalentContext: any = createContext<TalentContextType>(
  {} as TalentContextType
)

export type TalentProviderProps = {
  children?: ReactNode
}

export const useTalentContext = () => {
  return useContext<TalentContextType>(TalentContext)
}

export const TalentProvider = (props: TalentProviderProps) => {
  const { children } = props
  const [confirmBanPopup, setConfirmBanPopup] = useState<boolean>(false)
  const [addPopup, setAddPopup] = useState<boolean>(false)
  const [talents, setTalents] = useState<TalentProps[]>([])
  const [talent, setTalent] = useState<TalentProps | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { setTotalCount, setTotalPages, setPage, setLimit, setIsLoading } =
    usePaginationContext()

  const { execute: getTalents } = useCaller({
    method: HttpMethod.GET,
    doneCb: (resp: TalentResponseProps) => {
      if (!resp) return
      setTalents(resp.talents)
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

  const defaultContext: TalentContextType = {
    ...props,
    talent,
    setTalent,
    confirmBanPopup,
    setConfirmBanPopup,
    addPopup,
    setAddPopup,
    searchTerm,
    setSearchTerm,
    getTalents,
    talents,
  }

  return (
    <TalentContext.Provider value={defaultContext}>
      {children}
    </TalentContext.Provider>
  )
}
