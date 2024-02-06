'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { setPassword, setPasswordSchema } from '@/utils/config'
import { useCaller } from '@/utils/API'
import { HttpMethod } from '@/types'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
const Button = dynamic(() => import('@/components/Buttons/Button'))
const TextField = dynamic(() => import('@/components/Input/TextField'))

const SetPasswordForm = () => {
  const router = useRouter()
  
  const { execute: forgot } = useCaller({
    method: HttpMethod.POST,
    doneCb: (resp: any) => {
      if (!resp) return
      setSubmitting(false)
      resetForm()
      toast.success(resp.message)
      router.replace('/login')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  const { token } = useParams()

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
    initialValues: setPassword,
    validationSchema: setPasswordSchema,
    onSubmit: (values) => forgot(`auth/set-password/${token}`, values),
  })
  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-2xl bg-white flex flex-col gap-8 w-full md:w-[600px]"
    >
      <div className="text-2xl md:text-4xl font-bold">Set password?</div>
      <div className="flex flex-col gap-6">
        <TextField
          label="New passoword"
          placeholder="Password"
          name="password"
          type="password"
          value={values}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors}
          touched={touched}
        />
        <TextField
          label="Confirm passoword"
          placeholder="Password"
          name="confirmPassword"
          type="password"
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

export default SetPasswordForm