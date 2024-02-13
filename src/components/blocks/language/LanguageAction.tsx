'use client'
import React from 'react'
import SearchField from '@/components/Input/SearchFiled'
import { useLanguageContext } from '@/context/LanguageContext'
import { usePaginationContext } from '@/context/PaginationContext'
import Button from '@/components/Buttons/Button'

const LanguageAction = () => {
  const {
    searchTerm,
    setSearchTerm,
    setAddKeyPopup,
    getkeys,
    keys,
    saveValues,
    setLanguagePopup,
    setDeleteLanguagePopup,
  } = useLanguageContext()

  const openAddKeyPoup = () => setAddKeyPopup(true)
  const openDeleteLanguagePopup = () => setDeleteLanguagePopup(true)
  const openAddLanguagePopup = () => setLanguagePopup(true)

  const { limit, page } = usePaginationContext()

  const handleSave = () => {
    let listOfTranslationValue: { id: string; value: string }[] = []
    keys.map((key) =>
      key.translationValues.map((translationValue) => {
        listOfTranslationValue.push({
          id: translationValue.id,
          value: translationValue.value,
        })
      })
    )
    saveValues('translation/admin', {
      translationValues: listOfTranslationValue,
    })
  }

  return (
    <div className="flex flex-row items-center justify-between mb-8 md:mb-12">
      <div className="text-2xl text-black font-medium">Language</div>
      <div className="flex flex-row gap-4 flex-1 justify-end">
        <SearchField
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (e.key === 'Enter') {
                getkeys(
                  `translation/keys?perPage=${limit}&currentPage=${page}&searchString=${searchTerm}`
                )
              }
            }
          }}
          className="w-[25%]"
        />
        <Button
          text="+ Language"
          onClick={openAddLanguagePopup}
          dark
          className="rounded-lg p-4 text-white"
        />
        <Button
          text="+ Keys"
          onClick={openAddKeyPoup}
          dark
          className="rounded-lg p-4 text-white"
        />
        <Button
          text="Save"
          dark
          onClick={handleSave}
          className="rounded-lg p-4 bg-black text-white"
        />
        <Button
          text="Delete"
          onClick={openDeleteLanguagePopup}
          dark
          className="rounded-lg p-4 bg-black text-white"
        />
      </div>
    </div>
  )
}

export default LanguageAction
