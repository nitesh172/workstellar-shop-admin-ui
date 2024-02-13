'use client'
import { useAuthContext } from '@/context/AuthContext'
import { profileUser } from '@/utils/config'
import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Country, State, City } from 'country-state-city'
import PopupEncloser from '@/components/PopupEncloser/PopupEncloser'
import UpdateEmail from './UpdateEmail'
import { useCaller } from '@/utils/API'
import { HttpMethod } from '@/types'
import toast from 'react-hot-toast'
const Button = dynamic(() => import('@/components/Buttons/Button'))
const DropDown = dynamic(() => import('@/components/Dropdown/Dropdown'))
const TextField = dynamic(() => import('@/components/Input/TextField'))

const ProfileForm = () => {
  const { currentUser, isAuthenticated, setPath, fetchUser } = useAuthContext()

  const router = useRouter()

  const [countryCode, setCountryCode] = useState<string>('')
  const [stateCode, setStateCode] = useState<string>('')
  const [popup, setPopup] = useState<boolean>(false)

  const close = () => setPopup(false)
  const open = () => setPopup(true)

  const { execute: updateUser } = useCaller({
    method: HttpMethod.PATCH,
    doneCb: (resp: any) => {
      if (!resp) return
      fetchUser('users/me')
      setSubmitting(false)
      close()
      toast.success('User updated successfully.')
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
    setValues,
  } = useFormik({
    initialValues: profileUser,
    onSubmit: (userDetails) =>
      updateUser(`users/${currentUser?.id}`, userDetails),
  })

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      setValues({
        city: currentUser.city,
        country: currentUser.country,
        email: currentUser.email,
        entityName: currentUser.entityName,
        role: currentUser.role,
        state: currentUser.state,
        zipcode: currentUser.zipcode,
      })
      let countryCode =
        Country.getAllCountries().find(
          (country) => country.name === currentUser.country
        )?.isoCode || ''
      setCountryCode(countryCode)
      let stateCode =
        State.getStatesOfCountry(countryCode).find(
          (state) => state.name === currentUser.state
        )?.isoCode || ''
      setStateCode(stateCode)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useEffect(() => {
    if (isAuthenticated !== null && !isAuthenticated) {
      router.push('/login')
      setPath('/settings')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-5 md:p-10 w-full md:w-[600px] flex flex-col gap-10"
      >
        <div className="text-2xl font-bold">Profile</div>
        <div className="flex flex-col gap-6">
          <TextField
            label="Full name"
            value={values}
            name="entityName"
            placeholder="John wick"
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors}
            touched={touched}
          />
          <TextField
            label="Enter your email ID"
            placeholder="Johncooper@gmail.com"
            name="email"
            disabled={true}
            value={values}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors}
            touched={touched}
          />
          <Button
            text="Update email ID"
            dark
            type="button"
            onClick={open}
            className="w-full min-[425px]:w-fit"
          />
          <div className="text-black font-bold mt-2">Address</div>
          <div className="flex flex-col xl:flex-row gap-6 w-full">
            <DropDown
              availableOptionKey="name"
              primary
              label="Country"
              option={{ name: values.country }}
              availableOptions={Country.getAllCountries()}
              setOption={(e: any) => {
                setCountryCode(e.target.value.isoCode)
                handleChange({
                  target: { name: e.target.name, value: e.target.value.name },
                })
              }}
              onBlur={handleBlur}
              error={errors}
              touched={touched}
              name="country"
            />
            <DropDown
              availableOptionKey="name"
              primary
              label="State"
              name="state"
              option={{ name: values.state }}
              availableOptions={State.getStatesOfCountry(countryCode)}
              setOption={(e: any) => {
                setStateCode(e.target.value.isoCode)
                handleChange({
                  target: { name: e.target.name, value: e.target.value.name },
                })
              }}
              onBlur={handleBlur}
              error={errors}
              touched={touched}
            />
          </div>
          <div className="flex flex-col xl:flex-row gap-6 w-full">
            <DropDown
              availableOptionKey="name"
              primary
              className="flex-1"
              option={{ name: values.city }}
              label="City"
              name="city"
              availableOptions={City.getCitiesOfState(countryCode, stateCode)}
              setOption={(e: any) => {
                handleChange({
                  target: { name: e.target.name, value: e.target.value.name },
                })
              }}
              onBlur={handleBlur}
              error={errors}
              touched={touched}
            />
            <TextField
              label="Zipcode"
              value={values}
              placeholder="10001"
              name="zipcode"
              className="flex-1"
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors}
              touched={touched}
            />
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <Button
            text="Save"
            type="submit"
            submitLoading={isSubmitting}
            dark
            className="w-full md:w-fit lg:w-full xl:w-fit"
          />
        </div>
      </form>
      <PopupEncloser close={close} show={popup}>
        <UpdateEmail close={close} />
      </PopupEncloser>
    </div>
  )
}

export default ProfileForm
