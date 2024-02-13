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
import DeleteLanguagePopup from './DeleteLanguagePopup'
import { usePopper } from '@/hooks/use-popper'
import Image from 'next/image'
import ConfirmationPopup from '@/components/ConfirmationPopup'

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
    deleteLanguagePopup,
    setDeleteLanguagePopup,
    deleteKey,
    loading,
  } = useLanguageContext()

  const { page, limit } = usePaginationContext()

  const initialized = useRef(false)
  const [access, setAccess] = useState(false)

  const closekeyPopup = () => setAddKeyPopup(false)

  const closeLanguagePopup = () => setLanguagePopup(false)

  const closeDeleteLanguagePopup = () => setDeleteLanguagePopup(false)

  const closeDeleteKeyPopup = () => setDeleteKeyPopup({ id: '', popup: false })

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
        loading={loading}
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
            action: (key: keyProps) => {
              return <ActionMenu keyItem={key} />
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
          action: 'Action',
        }}
        headersCSS={{
          id: 'w-[7%]',
          key: 'w-[20%]',
          language: 'w-[15%]',
          values: 'w-[41%]',
          createdAt: 'w-[10%]',
          action: 'w-[7%]',
        }}
      />
      <Pagination />
      <PopupEncloser close={closekeyPopup} show={addKeyPopup}>
        <AddKeyPopup close={closekeyPopup} />
      </PopupEncloser>
      <PopupEncloser close={closeLanguagePopup} show={languagePopup}>
        <AddLanguagePopup close={closeLanguagePopup} />
      </PopupEncloser>
      <PopupEncloser close={closeDeleteKeyPopup} show={deleteKeyPopup.popup}>
        <ConfirmationPopup
          close={closeDeleteKeyPopup}
          confirm={() => deleteKey(`translation/key/${deleteKeyPopup.id}`)}
          title="Confirmation required"
          content="Are you sure you want to proceed with this action?"
        />
      </PopupEncloser>
      <PopupEncloser
        close={closeDeleteLanguagePopup}
        show={deleteLanguagePopup}
      >
        <DeleteLanguagePopup close={closeDeleteLanguagePopup} />
      </PopupEncloser>
    </div>
  )
}

type ActionProps = {
  keyItem: keyProps
}

const ActionMenu: React.FC<ActionProps> = (props) => {
  const { keyItem } = props
  const { setDeleteKeyPopup } = useLanguageContext()

  const open = () => setDeleteKeyPopup({ id: keyItem.key, popup: true })

  let [trigger, container] = usePopper({
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  })

  return (
    <div className="py-3 text-left text-14 relative group cursor-pointer">
      <span ref={trigger}>
        <Image src="/images/dots.svg" alt="" width={24} height={24} />
      </span>
      <ul
        ref={container}
        className="hidden bg-white absolute -left-10 -mt-1 space-y-2 group-hover:block p-2 rounded-lg shadow-lg shadow-grey-shade-0/10 group-hover:bg-grey-shade-14 z-50"
      >
        <li
          onClick={() => open()}
          className="px-4 py-2 hover:bg-chipColor rounded-md"
        >
          Delete
        </li>
      </ul>
    </div>
  )
}

export default KeysTable
