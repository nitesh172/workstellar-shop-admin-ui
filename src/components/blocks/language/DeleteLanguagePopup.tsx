'use client'
import { usePaginationContext } from '@/context/PaginationContext'
import { useLanguageContext } from '@/context/LanguageContext'
import { HttpMethod, PopupProps } from '@/types'
import { useCaller } from '@/utils/API'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import Textfiled from '@/components/Input/TextField'
import Button from '@/components/Buttons/Button'
import { object, string } from 'yup'
import DropDown from '@/components/Dropdown/Dropdown'

const DeleteLanguagePopup: React.FC<PopupProps> = (props) => {
  const { close } = props
  const { getkeys, searchTerm, languages, fetchLanguages } = useLanguageContext()

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: { code: '' },
    validationSchema: object({
      code: string().required('Language is required.'),
    }),
    onSubmit: (language) => {
      deleteLanguage(`translation/language/${language.code}`)
    },
  })

  const { limit, page } = usePaginationContext()

  const { execute: deleteLanguage } = useCaller({
    method: HttpMethod.DELETE,
    doneCb: (resp: any) => {
      if (!resp) return
      getkeys(
        `translation/keys?perPage=${limit}&currentPage=${page}&searchString=${searchTerm}`
      )
      fetchLanguages('translation/languages/all')
      setSubmitting(false)
      close()
      toast.success('Key delete successfully.')
    },
    errorCb: (failed: any) => {
      setSubmitting(false)
      toast.error(failed)
    },
  })

  useEffect(() => {
    if(!languages.length) {
      fetchLanguages('translation/languages/all')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white flex flex-col gap-6 shadow-xl rounded-2xl w-full"
    >
      <div className="text-base font-semibold">Delete Language</div>
      <DropDown
        availableOptionKey="code"
        primary
        label="Language"
        className="w-full md:w-[500px]"
        option={values.code ? { code: values.code } : null}
        availableOptions={languages}
        setOption={(e: any) => {
          handleChange({
            target: { name: e.target.name, value: e.target.value.code },
          })
        }}
        onBlur={handleBlur}
        error={errors}
        touched={touched}
        name="code"
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          text="Delete"
          dark
          type="submit"
          submitLoading={isSubmitting}
          className="bg-primary text-white w-full md:w-fit"
        />
        <Button
          text="Cancel"
          type="button"
          onClick={close}
          className="text-darkShade w-full md:w-fit"
        />
      </div>
    </form>
  )
}

export default DeleteLanguagePopup
