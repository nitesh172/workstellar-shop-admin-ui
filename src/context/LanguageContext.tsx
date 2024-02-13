'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { usePaginationContext } from './PaginationContext'
import { useCaller } from '@/utils/API'
import { HttpMethod, keyProps, KeysResponseProps, LanguageProps, LanguagesResponseProps } from '@/types'
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
  setDeleteLanguagePopup: (value: boolean) => void
  deleteLanguagePopup: boolean
  setDeleteKeyPopup: (value: { id: string; popup: boolean }) => void
  deleteKeyPopup: { id: string; popup: boolean }
  setKeys: (keys: keyProps[]) => void
  loading: boolean
  fetchLanguages: Function
  deleteKey: Function
  languages: LanguageProps[]
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
  const [languages, setLanguages] = useState<LanguageProps[]>([])
  const [addKeyPopup, setAddKeyPopup] = useState<boolean>(false)
  const [deleteLanguagePopup, setDeleteLanguagePopup] = useState<boolean>(false)
  const [deleteKeyPopup, setDeleteKeyPopup] = useState<{
    popup: boolean
    id: string
  }>({ popup: false, id: '' })
  const [keys, setKeys] = useState<keyProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

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

  const { execute: fetchLanguages } = useCaller({
    method: HttpMethod.GET,
    doneCb: (resp: LanguagesResponseProps) => {
      if (!resp) return
      setLanguages(resp)
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  const { execute: deleteKey } = useCaller({
    method: HttpMethod.DELETE,
    doneCb: (resp: any) => {
      if (!resp) return
      getkeys(
        `translation/keys?perPage=${limit}&currentPage=${page}&searchString=${searchTerm}`
      )
      setDeleteKeyPopup({id: "", popup: false})
      toast.success('Key delete successfully.')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

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
      setLoading(false)
    },
    errorCb: (failed: any) => {
      toast.error(failed)
      setIsLoading(false)
      setLoading(false)
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
    loading,
    getkeys,
    keys,
    saveValues,
    setDeleteKeyPopup,
    deleteKeyPopup,
    setDeleteLanguagePopup,
    deleteLanguagePopup,
    setKeys,
    fetchLanguages,
    languages,
    deleteKey
  }

  return (
    <LanguageContext.Provider value={defaultContext}>
      {children}
    </LanguageContext.Provider>
  )
}
