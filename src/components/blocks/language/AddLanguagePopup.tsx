'use client'
import { usePaginationContext } from '@/context/PaginationContext'
import { useLanguageContext } from '@/context/LanguageContext'
import { HttpMethod, PopupProps } from '@/types'
import { useCaller } from '@/utils/API'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import Textfiled from '@/components/Input/TextField'
import Button from '@/components/Buttons/Button'
import { object, string } from 'yup'

const AddLanguagePopup: React.FC<PopupProps> = (props) => {
  const { close } = props
  const { getkeys, searchTerm } = useLanguageContext()

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
      code: string().required('Language code is required.'),
    }),
    onSubmit: (language) => {
      addLanguage('translation/language/new', language)
    },
  })

  const { limit, page } = usePaginationContext()

  const { execute: addLanguage } = useCaller({
    method: HttpMethod.POST,
    doneCb: (resp: any) => {
      if (!resp) return
      getkeys(
        `translation/keys?perPage=${limit}&currentPage=${page}&searchString=${searchTerm}`
      )
      setSubmitting(false)
      close()
      toast.success('Language added successfully.')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
      setSubmitting(false)
    },
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white flex flex-col gap-6 shadow-xl rounded-2xl w-full"
    >
      <div className="text-base font-semibold">Add Language</div>
      <Textfiled
        label="Language"
        placeholder="en-us"
        type="text"
        value={values}
        name="code"
        className="w-full md:w-[500px]"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors}
        touched={touched}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          text="Add"
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

export default AddLanguagePopup
