'use client'
import { ButtonProps } from '@/types'
import React, { useState } from 'react'

const Button: React.FC<ButtonProps> = (props) => {
  const { text, className, isDisabled = false, onClick, type, dark = false, submitLoading, small = false} = props

  const [_loading, setLoading] = useState<boolean>(false)

  const handleOnClick = async () => {
    setLoading(true)
    onClick && (await onClick())
    setLoading(false)
  }

  return (
    <button
      type={type}
      disabled={isDisabled || submitLoading}
      className={`border border-primary w-fit ${small ? "rounded px-3 py-1.5" : "rounded-[40px] p-4 py-2.5"} ${dark ? 'text-white bg-primary' : 'text-black bg-transparent hover:bg-primary hover:text-white duration-300'} ${!!className ? className : ''}`}
      onClick={handleOnClick}
    >
      {text}
    </button>
  )
}

export default Button
