import { MultiValueInputProps } from '@/types'
import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/hooks/useOutsideClick'
import Image from 'next/image'

export const MultiValueInput = ({
  label,
  values,
  singleValue,
  setSingleValue,
  handleAdd,
  handleRemove,
  placeholder,
}: MultiValueInputProps) => {
  const ref = useRef(null)
  const [style, setStyle] = useState('')
  const [open, setOpen] = useState(false)
  const handleClickOutside = () => {
    setOpen(true)
    !!values.length && setStyle('hidden')
  }

  useOnClickOutside(ref, handleClickOutside)
  return (
    <div className={`flex flex-col gap-2 relative`}>
      {label && (
        <span
          className={`absolute text-xs font-semibold z-10 left-3 -top-[16px] bg-white p-1`}
        >
          {label}
        </span>
      )}
      <div
        ref={ref}
        className="flex gap-1 w-full min-h-[44px] rounded-lg p-1 border border-[#DEDEEE]"
        onClick={() => setStyle('block')}
      >
        <div className={`flex flex-col gap-2 m-2`}>
          {Boolean(values.length) && (
            <div className="flex gap-1.5 flex-wrap w-fit pr-5">
              {values.map((value, index) => (
                <div
                  key={`value-${index}`}
                  className="flex items-center justify-center gap-1 rounded-lg bg-[#E4E4E4] px-2 py-2"
                >
                  <span className="text-sm text-[#2A2A2E]">{value}</span>
                  <Image
                    src="/images/close.svg"
                    alt="d"
                    width="20"
                    height="20"
                    className="cursor-pointer rounded-lg"
                    onClick={() => handleRemove(index)}
                  />
                </div>
              ))}
            </div>
          )}
          <div className={`flex flex-row m-1 ${style}`}>
            <input
              type="text"
              onChange={(e) => {
                setSingleValue(e.target.value)
              }}
              value={singleValue}
              placeholder={placeholder}
              onKeyDown={(e) => {
                if(e.key === "Enter") {
                    e.preventDefault()
                    if (singleValue) {
                      handleAdd(e)
                    }
                }
                
              }}
              className={`text-sm p-2 flex-1 w-full h-8 min-w-[40%] placeholder:text-gray-600 outline-none `}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
