'use client'
import { usePaginationContext } from '@/context/PaginationContext'
import { useTalentContext } from '@/context/TalentContext'
import { HttpMethod, PopupProps, TalentProps } from '@/types'
import { useCaller } from '@/utils/API'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Textfiled from '@/components/Input/TextField'
import DropDown from '@/components/Dropdown/Dropdown'
import { City, Country, State } from 'country-state-city'
import Button from '@/components/Buttons/Button'
import { levels, talentSchema, talentUser, workType } from '@/utils/config'
import { MultiValueInput } from '@/components/Input/MultiValueInput'

const AddUserPopup: React.FC<PopupProps> = (props) => {
  const { close } = props
  const { getTalents, talent } = useTalentContext()

  const [countryCode, setCountryCode] = useState<string>('')
  const [stateCode, setStateCode] = useState<string>('')
  const [singleValue, setSingleValue] = useState<string>('')
  const [skills, setSkills] = useState<{ id: string; name: string }[]>([])

  let talentID = talent?.id || ''

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
    initialValues: talentUser,
    validationSchema: talentSchema,
    onSubmit: (talentDetails) => {
      !talentID
        ? createUser('talents/new', {
            ...talentDetails,
            skills: skills,
            experienceYear: Number(talentDetails.experienceYear),
          })
        : updateUser(`talents/${talentID}`, {
            ...talentDetails,
            skills: skills,
            experienceYear: Number(talentDetails.experienceYear),
          })
    },
  })

  const { limit, page } = usePaginationContext()

  const { execute: createUser } = useCaller({
    method: HttpMethod.POST,
    doneCb: (resp: any) => {
      if (!resp) return
      getTalents(`talents?perPage=${limit}&currentPage=${page}`)
      setSubmitting(false)
      close()
      toast.success('Talent created successfully.')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  const { execute: fetchUser } = useCaller({
    method: HttpMethod.GET,
    doneCb: (talent: TalentProps) => {
      if (!talent) return
      setValues({
        amount: talent.amount.toString(),
        designation: talent.designation,
        experienceYear: talent.experienceYear.toString(),
        headline: talent.headline,
        level: talent.level,
        paymentType: talent.paymentType,
        user: talent.user,
        avatar: talent.avatar,
      })
      setSkills(talent.skills)
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  const { execute: updateUser } = useCaller({
    method: HttpMethod.PATCH,
    doneCb: (resp: any) => {
      if (!resp) return
      getTalents(`talents?perPage=${limit}&currentPage=${page}`)
      setSubmitting(false)
      close()
      toast.success('Talent updated successfully.')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  useEffect(() => {
    !!talentID && fetchUser(`talents/${talentID}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [talentID])

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white flex flex-col gap-6 shadow-xl rounded-2xl w-full"
    >
      <div className="text-base font-semibold">Add Employee</div>
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        <Textfiled
          label="Full Name"
          placeholder="John wick"
          type="text"
          value={values}
          name="user.entityName"
          className="flex-1"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors}
          touched={touched}
        />
        <Textfiled
          label="Email ID"
          placeholder="john@gmail.com"
          type="text"
          value={values}
          name="user.email"
          className="flex-1"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors}
          touched={touched}
        />
      </div>
      <Textfiled
        label="Headline"
        placeholder="Write"
        type="text"
        value={values}
        name="headline"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors}
        touched={touched}
      />
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        <Textfiled
          label="Designation"
          placeholder="Write"
          type="text"
          value={values}
          name="designation"
          className="flex-1"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors}
          touched={touched}
        />
        <DropDown
          availableOptionKey="name"
          primary
          label="Level"
          option={values.level ? { name: values.level } : null}
          availableOptions={levels}
          setOption={(e: any) => {
            handleChange({
              target: { name: e.target.name, value: e.target.value.value },
            })
          }}
          className="flex-1"
          onBlur={handleBlur}
          error={errors}
          touched={touched}
          name="level"
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        <Textfiled
          label="Years of experience"
          placeholder="Write"
          type="text"
          value={values}
          name="experienceYear"
          className="flex-1"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors}
          touched={touched}
        />
        <Textfiled
          label="Avatar"
          placeholder="person_1"
          type="text"
          value={values}
          className="flex-1"
          name="avatar"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors}
          touched={touched}
        />
      </div>
      <div className="text-black font-bold mt-2">Location</div>
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        <DropDown
          availableOptionKey="name"
          primary
          label="Country"
          option={values.user.country ? { name: values.user.country } : null}
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
          name="user.country"
        />
        <DropDown
          availableOptionKey="name"
          primary
          label="State"
          name="user.state"
          option={values.user.state ? { name: values.user.state } : null}
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
          option={values.user.city ? { name: values.user.city } : null}
          label="City"
          name="user.city"
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
          name="user.zipcode"
          className="flex-1"
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors}
          touched={touched}
        />
      </div>
      <div className="text-black font-bold mt-2">Payment preference</div>
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        <DropDown
          availableOptionKey="name"
          primary
          label="Select frequency"
          option={values.paymentType ? { name: values.paymentType } : null}
          availableOptions={workType}
          setOption={(e: any) => {
            handleChange({
              target: { name: e.target.name, value: e.target.value.value },
            })
          }}
          className="flex-1"
          onBlur={handleBlur}
          error={errors}
          touched={touched}
          name="paymentType"
        />
        <Textfiled
          label="Amount"
          placeholder="0.00"
          type="text"
          value={values}
          name="amount"
          className="flex-1"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors}
          touched={touched}
        />
      </div>
      <div className="text-black font-bold mt-2">Skills</div>
      <MultiValueInput
        handleAdd={() => {
          let tempSkills = [...skills]
          tempSkills.push({ name: singleValue, id: '' })
          setSkills(tempSkills)
          setSingleValue('')
        }}
        handleRemove={(position) => {
          const tempSkills = [...skills]
          tempSkills.splice(position, 1)
          setSkills(tempSkills)
        }}
        setSingleValue={(e) => setSingleValue(e)}
        singleValue={singleValue}
        placeholder="React"
        values={skills.map((skill) => skill.name)}
        label="Enter skills"
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          text={talentID ? 'Save' : 'Add'}
          dark
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
