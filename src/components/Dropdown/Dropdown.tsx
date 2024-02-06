'use client'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '@/hooks/useOutsideClick'
import { DropDownProps } from '@/types'
import Image from 'next/image'

const DropDown: React.FC<DropDownProps> = (props) => {
  const {
    option,
    availableOptions,
    setOption,
    label,
    availableOptionKey,
    isInvalid = false,
    error,
    onBlur,
    onScrollEnd,
    isDisabled,
    name,
    className,
    primary,
    selectOptionKey,
    touched
  } = props

  const [showDropDownOptions, setShowDropDownOptions] = useState(false)

  const classes = () => {
    if (!isInvalid) return `placeholder:text-[#5E605E] text-[#5E605E]`
    return ` placeholder:text-[#FF0000] text-[#FF0000]`
  }

  const ref = useRef<any>()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = () => {
    setShowDropDownOptions(false)
  }

  const [newOption, setNewOption] = useState<any | null>()

  useEffect(() => {
    option && Object.keys(option) ? setNewOption(option) : setNewOption(null)
  }, [option])

  useOnClickOutside(ref, handleClickOutside)

  return (
    <div
      className={`flex flex-col gap-1.5 w-full ${className ? className : ''}`}
    >
      <div
        ref={ref}
        onBlur={onBlur}
        className={`rounded-2xl bg-white ${
          isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
        } relative flex justify-between items-center p-5 ${
          Number(label?.length) > 27 ? 'mt-2' : ''
        } ${
          showDropDownOptions
            ? 'rounded-bl-none rounded-br-none'
            : 'rounded-br-2xl rounded-bl-2xl'
        } ${
          primary ? `border rounded-lg rounded-br-lg rounded-bl-lg` : ''
        } ${classes()}`}
        onClick={() => {
          !isDisabled && setShowDropDownOptions(!showDropDownOptions)
        }}
      >
        <div className="truncate text-base flex flex-col gap-1">
          <div
            className={
              primary
                ? `absolute text-xs font-semibold text-black z-10 left-3 bg-white ${
                    Number(label?.length) > 27
                      ? 'p-0 min-[425px]:p-1 -top-[30%] min-[425px]:-top-[22%] whitespace-break-spaces min-[425px]:whitespace-normal w-[85%] min-[425px]:w-auto'
                      : 'p-1 -top-[22%]'
                  }`
                : 'text-sm font-bold'
            }
          >
            {label}
          </div>
          <div className="text-sm capitalize text-black">
            {newOption && availableOptionKey && Object.keys(newOption)
              ? (newOption[availableOptionKey])?.toString().toLowerCase()
              : newOption || 'Select'}
          </div>
        </div>
        <Image
          src="/images/arrow-down.svg"
          alt="d"
          className={showDropDownOptions ? `rotate-180` : `rotate-0`}
          width={16}
          height={16}
        />
        {showDropDownOptions && (
          <div
            ref={scrollRef}
            onScroll={() => {
              const bottom =
                Math.abs(
                  Number(scrollRef?.current?.scrollTop) +
                    Number(scrollRef?.current?.clientHeight) -
                    Number(scrollRef?.current?.scrollHeight)
                ) <= 1

              if (bottom) {
                onScrollEnd && onScrollEnd()
              }
            }}
            className={`flex shadow-2xl flex-col absolute z-20 overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] top-full overflow-y-scroll max-h-52 rounded-bl-2xl rounded-br-2xl ${
              availableOptions ? `h-fit` : `h-16`
            } ${primary ? 'border border-t-0' : 'border-none'} w-full right-0`}
          >
            {!!availableOptions?.length ? (
              availableOptions.map((availableOption: any, index) => (
                <div
                  key={`available-option-${index}`}
                  onClick={() => {
                    setNewOption(availableOption)
                    setOption({target: {name: name, value: selectOptionKey ? availableOption[selectOptionKey] : availableOption}})
                  }}
                  className={`py-3 p-5 hover:bg-[#e7e7e8] bg-white w-full flex flex-row gap-3 items-center`}
                >
                  <div className="truncate">
                    {availableOptionKey && Object.keys(availableOption)
                      ? availableOption[availableOptionKey]
                      : availableOption}
                  </div>
                </div>
              ))
            ) : (
              <div
                key={`available-option-none`}
                className={`py-4 px-4 bg-white hover:bg-[#DEDEEE]`}
              >
                No data found
              </div>
            )}
          </div>
        )}
      </div>
      {!!name && !!error && touched && error[name] && (
        <span className={`w-full text-[#FF0000] text-[12px] px-2 py-1`}>
          {!!touched[name] && error[name]}
        </span>
      )}
    </div>
  )
}

export default DropDown