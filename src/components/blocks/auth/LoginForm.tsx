'use client'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { HttpMethod } from '@/types'
import { useCaller } from '@/utils/API'
import toast from 'react-hot-toast'
import { loginUser, loginSchema } from '@/utils/config'
import { setCookie } from 'cookies-next'
import { useAuthContext } from '@/context/AuthContext'
const Button = dynamic(() => import('@/components/Buttons/Button'))
const CheckBox = dynamic(() => import('@/components/Input/CheckBox'))
const TextField = dynamic(() => import('@/components/Input/TextField'))

const LoginForm = () => {
  const router = useRouter()
  const { isAuthenticated, path, setIsAuthenticated } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      if (path) {
        router.push(path)
      } else {
        router.replace('/')
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const navigateToForgotPassword = () => router.push('/forgot-password')

  const { execute: singInUser } = useCaller({
    method: HttpMethod.POST,
    doneCb: (resp: { token: string; expires: number }) => {
      if (!resp) return
      setSubmitting(false)

      setCookie('workStellarToken', resp.token, {
        expires: new Date(resp.expires),
      })
      setIsAuthenticated(true)

      resetForm()
    },
    errorCb: (failed: any) => {
      if (failed.message === 'User not found.') {
        return setFieldError('emailAddress', 'User is not registered.')
      }
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
    setFieldError,
    resetForm,
  } = useFormik({
    initialValues: loginUser,
    validationSchema: loginSchema,
    onSubmit: (values) => singInUser('auth/signin', values),
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-2xl bg-white flex flex-col gap-8 w-full md:w-[600px]"
    >
      <div className="text-2xl md:text-4xl font-bold">Login</div>
      <div className="flex flex-col gap-6">
        <TextField
          label="Email ID"
          placeholder="Johncooper@gmail.com"
          value={values}
          error={errors}
          onChange={handleChange}
          name="email"
          touched={touched}
          type="email"
          onBlur={handleBlur}
        />
        <TextField
          label="Password"
          placeholder="Password"
          value={values}
          error={errors}
          onChange={handleChange}
          name="password"
          touched={touched}
          type="password"
          onBlur={handleBlur}
        />
        <div className="flex flex-col gap-8 md:flex-row justify-between">
          <CheckBox id="remeberme" label="Remember password" />
          <div
            onClick={navigateToForgotPassword}
            className="text-[#1030EF] cursor-pointer"
          >
            Forgot password?
          </div>
        </div>
      </div>
      <div className="flex flex-col min-[425px]:flex-row gap-4">
        <Button
          text="Login"
          type="submit"
          submitLoading={isSubmitting}
          dark
          className="w-full min-[425px]:w-auto"
        />
      </div>
    </form>
  )
}

export default LoginForm
