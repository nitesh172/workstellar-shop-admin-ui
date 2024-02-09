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

const AddKeyPopup: React.FC<PopupProps> = (props) => {
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
    initialValues: { key: '' },
    validationSchema: object({
      key: string().required('Key is required.'),
    }),
    onSubmit: (key) => {
      addKey('translation/key/new', key)
    },
  })

  const { limit, page } = usePaginationContext()

  const { execute: addKey } = useCaller({
    method: HttpMethod.POST,
    doneCb: (resp: any) => {
      if (!resp) return
      getkeys(
        `translation/keys?perPage=${limit}&currentPage=${page}&searchString=${searchTerm}`
      )
      setSubmitting(false)
      close()
      toast.success('Key added successfully.')
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
      <div className="text-base font-semibold">Add Key</div>
      <Textfiled
        label="Key"
        placeholder="_KEY_NAME_"
        type="text"
        value={values}
        name="key"
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

export default AddKeyPopup
