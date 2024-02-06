'use client'
import { CheckBoxProps } from '@/types'
import React, { useState } from 'react'

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const { id, label, name, onChange, value = false } = props
  const [checked, setChecked] = useState<boolean>(value)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.checked
    setChecked(value)
    onChange && onChange(e)
  }

  return (
    <div>
      <label htmlFor={id} className="flex flex-row items-center gap-2">
        {!checked ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
              fill="#E9E9E9"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
              fill="#1E1F22"
            />
          </svg>
        )}
        <input
          type="checkbox"
          onChange={handleOnChange}
          name={name}
          id={id}
          checked={checked}
          className="hidden peer"
        />
        <span className="text-grey">{label}</span>
      </label>
    </div>
  )
}

export default CheckBox
