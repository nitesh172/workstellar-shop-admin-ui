import React, {
  CSSProperties,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
} from 'react'

export type LayoutProps = {
  className?: string
  children: React.ReactNode
}

export type SideItemProps = {
  title: string
  link: string
  isDisabled: boolean
  icon: string
}

export enum Order {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface DynamicTableProps {
  data: any[]
  headers: any
  options?: { fieldFunctions?: any }
  headersCSS?: any
  CustomRow?: () => React.JSX.Element
  loading?: boolean
}

export type ButtonProps = {
  text: string
  onClick?: Function
  className?: string
  type?: 'button' | 'submit' | 'reset'
  submitLoading?: boolean
  isDisabled?: boolean
  dark?: boolean
  small?: boolean
}

export type VideoFrameProps = {
  id?: string
  className?: string
  autoplay?: boolean
}

export type TextFieldProps = {
  label: string
  placeholder: string
  className?: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  style?: CSSProperties
  value?: any
  type?: HTMLInputTypeAttribute
  error?: any
  touched?: any
  onkeyPressed?: () => void
  disabled?: boolean
}

export type DropDownProps = {
  option?: any
  availableOptions: any[]
  setOption: Function
  label?: string
  name?: string
  availableOptionKey: string
  onBlur?: FocusEventHandler<HTMLElement>
  error?: any
  isInvalid?: boolean
  onScrollEnd?: Function
  isDisabled?: boolean
  iconEnabled?: boolean
  primary?: boolean
  className?: string
  selectOptionKey?: string
  touched?: any
}

export type ContactDetailWithFormProps = {
  id: string
  children: React.ReactNode
  label?: string
}

export type CheckBoxProps = {
  id: string
  label?: string
  name?: string
  value?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type PopupEncloserProps = {
  show: boolean
  close: (Option: boolean) => void
  children: React.ReactNode
}

export type CarouselProps = {
  readonly data: any[]
  className?: string
  readonly renderItem: (
    item: any,
    index: number,
    isSnapPoint: boolean
  ) => React.ReactElement
}

export type AuthWrapperProps = {
  children: React.ReactNode
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export declare type ApiHookProps = {
  method?: HttpMethod
  baseURI: string
  doneCb?: (resp: any) => void
  errorCb?: (err: any) => void
}

export declare type PayloadType = Record<string, any>

export type UserProps = {
  id: number
  createdAt: string
  updatedAt: string
  email: string
  entityName: string
  role: string
  status: string
  country: string
  state: string
  city: string
  zipcode: string
  lastActive: string
}

export type TalentProps = {
  id: string
  createdAt: string
  updatedAt: string
  skills: { name: string; id: string }[]
  amount: {}
  paymentType: string
  headline: string
  experienceYear: number
  designation: string
  level: string
  avatar: string
  user: UserProps
}

export type TalentResponseProps = {
  talents: TalentProps[]
  totalItems: number
  perPage: number
  currentPage: number
  totalPage: number
}

export type EmployeePaginationProps = {
  users: UserProps[]
  totalItems: number
  perPage: number
  currentPage: number
  totalPage: number
}

export interface SearchFiledProps {
  isDisabled?: boolean
  type?: HTMLInputTypeAttribute
  className?: string
  id?: string
  label?: string
  name?: string
  onBlur?: FocusEventHandler<HTMLInputElement>
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  style?: CSSProperties
  value?: string
  autoComplete?: string
  error?: string
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type PopupProps = {
  close: () => void
}

export type ConfirmationPopupProps = {
  title: string
  content: string
  confirm: (value: boolean) => void
  close: (value: boolean) => void
}

export type RequestProps = {
  id: string
  phoneNumber: string
  email: string
  clientType: string
  fullName: string
  companyName: string
  skills: string
  commitment: string
  onboardPeriod: string
  projectPeriod: string
  status: string
  createdAt: string
  updatedAt: string
}

export type RequestResponseProps = {
  requests: RequestProps[]
  totalItems: number
  perPage: number
  currentPage: number
  totalPage: number
}

export type TranslationValueProps = {
  id: string
  value: string
  language: string
  translationKeyId: string
  createdAt: string
  updatedAt: string
}

export type keyProps = {
  id: string
  key: string
  createdAt: string
  updatedAt: string
  translationValues: TranslationValueProps[]
}

export type KeysResponseProps = {
  keys: keyProps[]
  totalItems: number
  perPage: number
  currentPage: number
  totalPage: number
}

export type MultiValueInputProps = {
  label?: string
  values: string[]
  singleValue: string
  setSingleValue: (value: string) => void
  handleRemove: (index: number) => void
  handleAdd: (value: any) => void
  placeholder?: string
}

export type LanguageProps = {
  id: string
  code: string
  createdAt: string
  updatedAt: string
}

export type LanguagesResponseProps = LanguageProps[]