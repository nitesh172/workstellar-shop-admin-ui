import { TextFieldProps } from '@/types'
import React from 'react'

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    label,
    placeholder,
    className,
    name,
    type,
    onChange,
    onBlur,
    style,
    value,
    error,
    touched,
    onkeyPressed,
    disabled = false,
  } = props

  return (
    <div className={`flex flex-col gap-2 ${className ? className : ''}`}>
      <div style={style} className="relative bg-white rounded-lg border">
        <label
          htmlFor=""
          className="absolute text-xs font-semibold z-10 left-3 -top-[22%] bg-white p-1"
        >
          {label}
        </label>
        <input
          name={name}
          type={type}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onkeyPressed && onkeyPressed()
            }
          }}
          value={
            name &&
            (!!value[name] ||
              (!!value[name.split('.')[0]] &&
                !!value[name.split('.')[0]][name.split('.')[1]]))
              ? name?.split('.').length > 1
                ? value[name.split('.')[0]][name.split('.')[1]]
                : value[name]
              : !name && value
              ? value
              : ''
          }
          onBlur={onBlur}
          onChange={(e) => onChange && onChange(e)}
          className="outline-none  text-base rounded-lg w-full p-5"
          autoComplete="none"
          placeholder={placeholder}
        />
      </div>
      {name &&
      (!!error[name] ||
        (!!error[name.split('.')[0]] &&
          !!error[name.split('.')[0]][name.split('.')[1]])) &&
      (!!touched[name] ||
        (!!touched[name.split('.')[0]] &&
          !!touched[name.split('.')[0]][name.split('.')[1]])) ? (
        name?.split('.').length > 1 ? (
          <span className="text-xs text-[#F04438] px-2 block">
            {touched[name.split('.')[0]][name.split('.')[1]] &&
              error[name.split('.')[0]][name.split('.')[1]]}
          </span>
        ) : (
          <span className="text-xs text-[#F04438] px-2 block">
            {touched[name] && error[name]}
          </span>
        )
      ) : !name && touched && error ? (
        <span className="text-xs text-[#F04438] px-2 block">
          {touched && error}
        </span>
      ) : null}
    </div>
  )
}

export default TextField
