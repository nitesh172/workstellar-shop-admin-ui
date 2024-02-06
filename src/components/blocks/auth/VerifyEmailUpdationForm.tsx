'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { useCaller } from '@/utils/API'
import { HttpMethod } from '@/types'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
const Button = dynamic(() => import('@/components/Buttons/Button'))

const VerifyEmailUpdationForm = () => {
  const { fetchUser } = useAuthContext()
  const router = useRouter()
  const params = useSearchParams().toString()

  const queryObj = params
    .split('&')
    .reduce<Map<string, string>>((prev, curr) => {
      const [key, value] = curr.split('=')
      prev.set(key, decodeURIComponent(value))
      return prev
    }, new Map())

  const token = queryObj.get('token')
  const newEmail = queryObj.get('newEmail')

  const { execute: update } = useCaller({
    method: HttpMethod.POST,
    doneCb: (resp: any) => {
      if (!resp) return
      fetchUser('users/me')
      toast.success(resp.message)
      router.push('/settings')
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })
  return (
    <div className="p-8 rounded-2xl bg-white flex flex-col gap-8 w-full md:w-[600px]">
      <div className="text-2xl md:text-4xl font-bold">
        Email update verification
      </div>
      <div className="text-grey">
        Are you sure you want to update your email address to
        <div className="text-black font-medium">{newEmail}.</div>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          text="Submit"
          dark
          type="button"
          onClick={() => update(`auth/update-email/${token}/${newEmail}`)}
        />
      </div>
    </div>
  )
}

export default VerifyEmailUpdationForm
