import { object, ref, string } from 'yup'

export const loginSchema = object().shape({
  email: string()
    .email('Please enter valid email.')
    .required("Please enter email can't be empty."),
  password: string().required("Please enter password can't be empty."),
})

export const forgotPasswordSchema = object().shape({
  email: string()
    .email('Please enter valid email.')
    .required("Please enter email can't be empty."),
})

export const UserSchema = object().shape({
  email: string()
    .email('Please enter valid email.')
    .required("Please enter email can't be empty."),
  entityName: string()
    .required("Please enter entity name can't be empty.")
    .max(40, 'Exceeding maximum character limit')
    .matches(/^[a-zA-Z0-9 .ÆØÅæøå&]{1,40}$/, 'Invalid characters used'),
  role: string().required("Please select user type can't be empty."),
  country: string().required("Please select country can't be empty."),
  zipcode: string()
    .required("Please select zipcode can't be empty.")
    .matches(/^[a-zA-Z0-9 .-ÆØÅæøå]{1,40}$/, 'Invalid characters used')
    .matches(/(^\d{6}$)|(^\d{4}$)/, 'Invalid pincode'),
})

export const talentSchema = object().shape({
  paymentType: string().required("Please select frequency can't be empty."),
  amount: string().required("Please enter amount can't be empty."),
  headline: string().required("Please write headline can't be empty."),
  level: string().required("Please select level can't be empty."),
  designation: string().required("Please enter designation can't be empty."),
  avatar: string().required("Please select avatar is required."),
  user: object().shape({
    email: string()
      .email('Please enter valid email.')
      .required("Please enter email can't be empty."),
    entityName: string()
      .required("Please enter entity name can't be empty.")
      .max(40, 'Exceeding maximum character limit')
      .matches(/^[a-zA-Z0-9 .ÆØÅæøå&]{1,40}$/, 'Invalid characters used'),
    country: string().required("Please select country can't be empty."),
    zipcode: string()
      .required("Please select zipcode can't be empty.")
      .matches(/^[a-zA-Z0-9 .-ÆØÅæøå]{1,40}$/, 'Invalid characters used')
      .matches(/(^\d{6}$)|(^\d{4}$)/, 'Invalid pincode'),
  }),
  experienceYear: string().required(
    "Please enter year of experience can't be empty."
  ),
})

export const setPasswordSchema = object().shape({
  password: string().min(8).required("Please enter password can't be empty."),
  confirmPassword: string()
    .required("Please enter confirm password can't be empty.")
    .oneOf([ref('password')], 'Password must matched.'),
})
