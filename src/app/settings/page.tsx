import Wrapper from '@/components/Wrapper'
import ProfileForm from '@/components/blocks/setting/ProfileForm'
import React from 'react'

const Settings = () => {
  return (
    <Wrapper>
      <div className="text-2xl text-black font-medium mb-10">Settings</div>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <ProfileForm />
      </div>
    </Wrapper>
  )
}

export default Settings
