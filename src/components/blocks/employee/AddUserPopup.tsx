'use client'
import { usePaginationContext } from '@/context/PaginationContext'
import { useEmployeeContext } from '@/context/EmployeesContext'
import { HttpMethod, PopupProps } from '@/types'
import { useCaller } from '@/utils/API'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Textfiled from '@/components/Input/TextField'
import DropDown from '@/components/Dropdown/Dropdown'
import { City, Country, State } from 'country-state-city'
import Button from '@/components/Buttons/Button'
import { UserSchema, profileUser } from '@/utils/config'

const AddUserPopup: React.FC<PopupProps> = (props) => {
  const { close } = props
  const { getUsers, user } = useEmployeeContext()

  const [countryCode, setCountryCode] = useState<string>('')
  const [stateCode, setStateCode] = useState<string>('')

  let userID = user?.id || ''

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: profileUser,
    validationSchema: UserSchema,
    onSubmit: (userDetails) =>
      !userID
        ? createUser('users/new', userDetails)
        : updateUser(`users/${user?.id}`, userDetails),
  })

  const { limit, page } = usePaginationContext()

  const { execute: createUser } = useCaller({
    method: HttpMethod.POST,
    doneCb: (resp: any) => {
      if (!resp) return
      getUsers(`users?perPage=${limit}&currentPage=${page}`)
      setSubmitting(false)
      close()
      toast.success('User created successfully.')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  const { execute: fetchUser } = useCaller({
    method: HttpMethod.GET,
    doneCb: (resp: any) => {
      if (!resp) return
      setValues(resp)
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  const { execute: updateUser } = useCaller({
    method: HttpMethod.PATCH,
    doneCb: (resp: any) => {
      if (!resp) return
      getUsers(`users?perPage=${limit}&currentPage=${page}`)
      setSubmitting(false)
      close()
      toast.success('User updated successfully.')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  useEffect(() => {
    !!userID && fetchUser(`users/${userID}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID])

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white flex flex-col gap-6 shadow-xl rounded-2xl w-full"
    >
      <div className="text-base font-semibold">{userID ? 'Edit' : 'Add'} Employee</div>
      <Textfiled
        label="Full Name"
        placeholder="John wick"
        type="text"
        className="w-auto md:w-[500px] "
        value={values}
        name="entityName"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors}
        touched={touched}
      />
      <Textfiled
        label="Email ID"
        placeholder="john@gmail.com"
        type="text"
        className="w-auto md:w-[500px] "
        value={values}
        name="email"
        disabled={userID ? true : false}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors}
        touched={touched}
      />
      <DropDown
        availableOptionKey="name"
        primary
        label="Role"
        option={values.role ? { name: values.role } : null}
        availableOptions={[{ name: 'Member', value: 'MEMBER' }]}
        setOption={(e: any) => {
          handleChange({
            target: { name: e.target.name, value: e.target.value.value },
          })
        }}
        onBlur={handleBlur}
        error={errors}
        touched={touched}
        name="role"
      />
      <div className="text-black font-bold mt-2">Address</div>
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        <DropDown
          availableOptionKey="name"
          primary
          label="Country"
          option={values.country ? { name: values.country } : null}
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
          option={values.state ? { name: values.state } : null}
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
          option={values.city ? { name: values.city } : null}
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
        <Textfiled
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
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          text={userID ? 'Save' : 'Add'}
          dark
          submitLoading={isSubmitting}
          type="submit"
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

export default AddUserPopup
