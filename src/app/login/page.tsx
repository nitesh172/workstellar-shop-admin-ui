import TextField from '@/components/Input/TextField'
import LoginForm from '@/components/blocks/auth/LoginForm'
import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#F7F7F8]'>
        <LoginForm />
    </div>
  )
}

export default Login