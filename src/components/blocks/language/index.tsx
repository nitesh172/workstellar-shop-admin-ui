'use client'
import DynamicTable from '@/components/DynamicTable'
import { Pagination } from '@/components/Pagination'
import PopupEncloser from '@/components/PopupEncloser/PopupEncloser'
import { useLanguageContext } from '@/context/LanguageContext'
import { usePaginationContext } from '@/context/PaginationContext'
import { keyProps } from '@/types'
import { convertISODate, useCaller } from '@/utils/API'
import React, { useEffect, useRef, useState } from 'react'
import TextFieldSmall from '@/components/Input/TextFieldSmall'
import AddLanguagePopup from './AddLanguagePopup'
import AddKeyPopup from './AddKeyPopup'
import DeleteKeyPopup from './DeleteKeyPopup'

const KeysTable = () => {
  const {
    setLanguagePopup,
    addKeyPopup,
    languagePopup,
    searchTerm,
    setAddKeyPopup,
    keys,
    getkeys,
    setKeys,
    deleteKeyPopup,
    setDeleteKeyPopup,
  } = useLanguageContext()

  const { page, limit } = usePaginationContext()

  const initialized = useRef(false)
  const [access, setAccess] = useState(false)

  const closekeyPopup = () => setAddKeyPopup(false)

  const closeLanguagePopup = () => setLanguagePopup(false)

  const closeDeleteKeyPopup = () => setDeleteKeyPopup(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      setAccess(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    !!access &&
      !searchTerm &&
      getkeys(`translation/keys?perPage=${limit}&currentPage=${page}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, access, searchTerm])

  return (
    <div className="flex flex-col gap-7">
      <DynamicTable
        data={keys}
        options={{
          fieldFunctions: {
            id: (key: keyProps, index: number) => {
              return page === 1 ? index + 1 : (page - 1) * limit + index + 1
            },
            key: (key: keyProps) => {
              return (
                <TextFieldSmall
                  label=""
                  disabled
                  placeholder=""
                  value={key.key}
                />
              )
            },
            language: (key: keyProps) => {
              return (
                <div className="flex flex-col gap-2">
                  {!!key &&
                    !!key.translationValues &&
                    !!key.translationValues.length &&
                    key.translationValues
                      .sort((a, b) => {
                        if (a.language < b.language) {
                          return -1
                        }
                        if (a.language > b.language) {
                          return 1
                        }
                        return 0
                      })
                      .map((translationValue) => {
                        return (
                          <TextFieldSmall
                            label=""
                            disabled
                            key={`key-langugae-${translationValue.id}`}
                            placeholder=""
                            className="uppercase"
                            value={translationValue.language}
                          />
                        )
                      })}
                </div>
              )
            },
            values: (key: keyProps, index: number) => {
              return (
                <div className="flex flex-col gap-2">
                  {!!key &&
                    !!key.translationValues &&
                    !!key.translationValues.length &&
                    key.translationValues
                      .sort((a, b) => {
                        if (a.language < b.language) {
                          return -1
                        }
                        if (a.language > b.language) {
                          return 1
                        }
                        return 0
                      })
                      .map((translationValue, inx) => {
                        return (
                          <TextFieldSmall
                            label=""
                            key={`key-value-${translationValue.id}`}
                            placeholder=""
                            onChange={(e) => {
                              let tempKeys = [...keys]
                              tempKeys[index].translationValues[inx].value =
                                e.target.value
                              setKeys(tempKeys)
                            }}
                            value={translationValue.value}
                          />
                        )
                      })}
                </div>
              )
            },
            createdAt: (key: keyProps) => {
              return (
                <div className="flex flex-col gap-6">
                  {!!key &&
                    !!key.translationValues &&
                    !!key.translationValues.length &&
                    key.translationValues.map((translationValue) => {
                      return (
                        <div
                          key={`key-date-${translationValue.id}`}
                          className=""
                        >
                          {convertISODate(translationValue.createdAt)}
                        </div>
                      )
                    })}
                </div>
              )
            },
          },
        }}
        headers={{
          id: 'S.no',
          key: 'Keys',
          language: 'Language',
          values: 'Translation value',
          createdAt: 'Created date',
        }}
        headersCSS={{
          id: 'w-[7%]',
          key: 'w-[20%]',
          language: 'w-[15%]',
          values: 'w-[48%]',
          createdAt: 'w-[10%]',
        }}
      />
      <Pagination />
      <PopupEncloser close={closekeyPopup} show={addKeyPopup}>
        <AddKeyPopup close={closekeyPopup} />
      </PopupEncloser>
      <PopupEncloser close={closeLanguagePopup} show={languagePopup}>
        <AddLanguagePopup close={closeLanguagePopup} />
      </PopupEncloser>
      <PopupEncloser close={closeDeleteKeyPopup} show={deleteKeyPopup}>
        <DeleteKeyPopup close={closeDeleteKeyPopup} />
      </PopupEncloser>
    </div>
  )
}

export default KeysTable
