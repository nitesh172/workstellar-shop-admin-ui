'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { usePaginationContext } from './PaginationContext'
import { useCaller } from '@/utils/API'
import { HttpMethod, keyProps, KeysResponseProps } from '@/types'
import toast from 'react-hot-toast'

export type LanguageContextType = {
  languagePopup: boolean
  setLanguagePopup: (value: boolean) => void
  addKeyPopup: boolean
  setAddKeyPopup: (value: boolean) => void
  searchTerm: string
  setSearchTerm: (value: string) => void
  getkeys: Function
  saveValues: Function
  keys: keyProps[]
  setDeleteKeyPopup: (value: boolean) => void
  deleteKeyPopup: boolean,
  setKeys: (keys: keyProps[]) => void
}

const LanguageContext: any = createContext<LanguageContextType>(
  {} as LanguageContextType
)

export type LanguageProviderProps = {
  children?: ReactNode
}

export const useLanguageContext = () => {
  return useContext<LanguageContextType>(LanguageContext)
}

export const LanguageProvider = (props: LanguageProviderProps) => {
  const { children } = props
  const [languagePopup, setLanguagePopup] = useState<boolean>(false)
  const [addKeyPopup, setAddKeyPopup] = useState<boolean>(false)
  const [deleteKeyPopup, setDeleteKeyPopup] = useState<boolean>(false)
  const [keys, setKeys] = useState<keyProps[]>([])

  const [searchTerm, setSearchTerm] = useState<string>('')

  const {
    setTotalCount,
    setTotalPages,
    setPage,
    setLimit,
    setIsLoading,
    limit,
    page,
  } = usePaginationContext()

  const { execute: getkeys } = useCaller({
    method: HttpMethod.GET,
    doneCb: (resp: KeysResponseProps) => {
      if (!resp) return
      setKeys(resp.keys)
      setPage(resp.currentPage)
      setLimit(resp.perPage)
      setTotalPages(resp.totalPage)
      setTotalCount(resp.totalItems)
      setIsLoading(false)
    },
    errorCb: (failed: any) => {
      toast.error(failed)
      setIsLoading(false)
    },
  })

  const { execute: saveValues } = useCaller({
    method: HttpMethod.PATCH,
    doneCb: (resp: KeysResponseProps) => {
      if (!resp) return
      getkeys(
        `translation/keys?perPage=${limit}&currentPage=${page}&searchString=${searchTerm}`
      )
      toast.success('Translation value updated.')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  const defaultContext: LanguageContextType = {
    ...props,
    languagePopup,
    setLanguagePopup,
    addKeyPopup,
    setAddKeyPopup,
    searchTerm,
    setSearchTerm,
    getkeys,
    keys,
    saveValues,
    setDeleteKeyPopup,
    deleteKeyPopup,
    setKeys
  }

  return (
    <LanguageContext.Provider value={defaultContext}>
      {children}
    </LanguageContext.Provider>
  )
}
