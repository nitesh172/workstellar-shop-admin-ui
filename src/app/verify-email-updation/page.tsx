import VerifyEmailUpdationForm from '@/components/blocks/auth/VerifyEmailUpdationForm'
import React, { Suspense } from 'react'

const VerifyEmailUpdation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F7F7F8]">
      <Suspense>
        <VerifyEmailUpdationForm />
      </Suspense>
    </div>
  )
}

export default VerifyEmailUpdation
