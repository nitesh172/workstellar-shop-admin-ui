import React from 'react'
import Textfiled from '@/components/Input/TextField'
import { forgotPasswordSchema } from '@/utils/config'
import { useFormik } from 'formik'
import Button from '@/components/Buttons/Button'
import { useCaller } from '@/utils/API'
import { HttpMethod, PopupProps } from '@/types'
import toast from 'react-hot-toast'

const UpdateEmail: React.FC<PopupProps> = (props) => {
  const { close } = props

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
    initialValues: { email: '' },
    validationSchema: forgotPasswordSchema,
    onSubmit: (userDetails) =>
      sentMail('auth/send-email-updation-link', userDetails),
  })

  const { execute: sentMail } = useCaller({
    method: HttpMethod.POST,
    doneCb: (resp: any) => {
      if (!resp) return
      setSubmitting(false)
      close()
      toast.success('Mail sent successfully.')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white flex flex-col gap-6 shadow-xl rounded-2xl w-full"
    >
      <div className="text-base font-semibold">Update email</div>
      <Textfiled
        label="New Email ID"
        placeholder="john@gmail.com"
        type="text"
        className="w-auto md:w-[500px] "
        value={values}
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors}
        touched={touched}
      />
      <Button
        text={'Sent'}
        dark
        submitLoading={isSubmitting}
        type="submit"
        className="bg-primary text-white w-full md:w-fit"
      />
    </form>
  )
}

export default UpdateEmail
