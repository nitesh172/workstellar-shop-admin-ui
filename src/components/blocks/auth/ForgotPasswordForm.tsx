'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { forgotPassword, forgotPasswordSchema } from '@/utils/config'
import { useCaller } from '@/utils/API'
import { HttpMethod } from '@/types'
import toast from 'react-hot-toast'
const Button = dynamic(() => import('@/components/Buttons/Button'))
const TextField = dynamic(() => import('@/components/Input/TextField'))

const ForgotPasswordForm = () => {
  const { execute: forgot } = useCaller({
    method: HttpMethod.POST,
    doneCb: (resp: any) => {
      if (!resp) return
      setSubmitting(false)
      resetForm()
      toast.success(resp.message)
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    setSubmitting,
    touched,
    resetForm,
  } = useFormik({
    initialValues: forgotPassword,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => forgot('auth/forgot-password', values),
  })
  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-2xl bg-white flex flex-col gap-8 w-full md:w-[600px]"
    >
      <div className="text-2xl md:text-4xl font-bold">Forgot password?</div>
      <div className="flex flex-col gap-6">
        <TextField
          label="Enter your email ID"
          placeholder="Johncooper@gmail.com"
          name="email"
          type="email"
          value={values}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors}
          touched={touched}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Button text="Submit" dark type="submit" submitLoading={isSubmitting} />
      </div>
    </form>
  )
}

export default ForgotPasswordForm