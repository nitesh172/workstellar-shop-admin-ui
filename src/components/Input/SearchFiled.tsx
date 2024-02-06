'use client'
import { SearchFiledProps } from '@/types'
import Image from 'next/image'

const Textfiled = (props: SearchFiledProps) => {
  const { label, className, error, isDisabled, ...otherProps } = props

  return (
    <div
      className={`rounded-lg bg-white border border-border flex flex-col gap-1.5 ${className}`}
    >
      {label && <div className="text-base">{label}</div>}
      <div className=" w-full flex flex-row gap-1 items-center px-4">
        <input
          {...otherProps}
          disabled={isDisabled}
          className={`w-full bg-white text-base py-2.5 border-border outline-none ${
            isDisabled && 'text-gray-500'
          } focus-within:border-primary ${
            error && error !== '' && 'border-[#F04438]'
          }`}
          autoComplete="off"
        />
        <Image src={'/images/search.svg'} alt="" width={18} height={18} />
      </div>
      {error && error !== '' ? (
        <span className="text-xs text-[#F04438] block">{error}</span>
      ) : null}
    </div>
  )
}

export default Textfiled
