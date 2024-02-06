import { TextFieldProps } from '@/types'
import React from 'react'

const TextFieldSmall: React.FC<TextFieldProps> = (props) => {
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
      className={`relative bg-white border outline-none text-base rounded-lg w-full p-1 ${
        className ? className : ''
      }`}
      autoComplete="none"
      placeholder={placeholder}
    />
  )
}

export default TextFieldSmall
