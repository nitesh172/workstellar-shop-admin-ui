'use client'
import { useState } from 'react'
import { ApiHookProps, HttpMethod, PayloadType } from '@/types'
import { getCookie } from 'cookies-next'
import { baseURI } from './config'

export const useAPI = ({
  baseURI,
  doneCb = (_) => {},
  errorCb = (_) => {},
  method = HttpMethod.GET as any,
}: ApiHookProps) => {
  const token = getCookie('workStellarToken')
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const executeGet = async (path: string) => {
    let resp, parsed, isError
    try {
      resp = await fetch(baseURI + path, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '404'
        },
      })
      isError = resp.status > 300
      parsed = await resp.json()
      if (isError) {
        const err = parsed.message || parsed.error || 'Something went wrong'

        setError(err)
        errorCb(err)
        return
      }
      setData(parsed)
      doneCb(parsed)
      return parsed
    } catch (e: any) {
      const err = e.message || parsed.error || 'Something went wrong'
      setError(err)
      errorCb(err)
    }
  }

  const executePost = async (path: string, payload: PayloadType = {}) => {
    let resp, parsed, isError
    try {
      resp = await fetch(baseURI + path, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '404'
        },
        body: JSON.stringify(payload),
      })
      isError = resp.status > 300
      parsed = await resp.json()
      if (isError) {
        const err = parsed.message || parsed.error || 'Something went wrong'

        setError(err)
        errorCb(err)
        return
      }
      setData(parsed)
      doneCb(parsed)
      return parsed
    } catch (e: any) {
      const err = e.message || parsed.error || 'Something went wrong'
      setError(err)
      errorCb(err)
    }
  }

  const executePut = async (path: string, payload: PayloadType = {}) => {
    let resp, parsed, isError
    try {
      resp = await fetch(baseURI + path, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '404'
        },
        body: JSON.stringify(payload),
      })
      isError = resp.status > 300
      parsed = await resp.json()
      if (isError) {
        const err = parsed.message || parsed.error || 'Something went wrong'

        setError(err)
        errorCb(err)
        return
      }
      setData(parsed)
      doneCb(parsed)
    } catch (e: any) {
      const err = e?.message || parsed?.error || 'Something went wrong'
      setError(err)
      errorCb(err)
    }
  }

  const executePatch = async (path: string, payload: PayloadType = {}) => {
    let resp, parsed, isError
    try {
      resp = await fetch(baseURI + path, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '404'
        },
        body: JSON.stringify(payload),
      })
      isError = resp.status > 300
      parsed = await resp.json()
      if (isError) {
        const err = parsed.message || parsed.error || 'Something went wrong'

        setError(err)
        errorCb(err)
        return
      }
      setData(parsed)
      doneCb(parsed)
    } catch (e: any) {
      const err = e.message || parsed.error || 'Something went wrong'
      setError(err)
      errorCb(err)
    }
  }

  const executeDelete = async (path: string, payload: PayloadType = {}) => {
    let resp, parsed, isError
    try {
      resp = await fetch(baseURI + path, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '404'
        },
        body: JSON.stringify(payload),
      })
      isError = resp.status > 300
      parsed = await resp.json()
      if (isError) {
        const err = parsed.message || parsed.error || 'Something went wrong'

        setError(err)
        errorCb(err)
        return
      }
      setData(parsed)
      doneCb(parsed)
    } catch (e: any) {
      const err = e.message || parsed.error || 'Something went wrong'
      setError(err)
      errorCb(err)
    }
  }

  return {
    execute:
      method == HttpMethod.GET
        ? executeGet
        : method == HttpMethod.POST
        ? executePost
        : method == HttpMethod.DELETE
        ? executeDelete
        : method === HttpMethod.PUT
        ? executePut
        : executePatch,
    data,
    error,
  }
}

export const useCaller = (...props: any) => {
  let payload, method, doneCb, errorCb
  if (typeof props[0] == 'object') {
    ;({ payload, method, doneCb, errorCb } = props[0])
  } else {
    ;[payload, method, doneCb, errorCb] = props
  }
  return useAPI({
    baseURI,
    method,
    doneCb,
    errorCb,
  })
}

export const convertISODate = (isoDate: string = '') => {
  // Create an array of month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // Create a new Date object from the ISO date string
  const date = new Date(isoDate)

  // Extract the day, month, and year from the date object
  const day = String(date.getDate()).padStart(2, '0')
  const month = monthNames[date.getMonth()] // Get the month name from the array
  const year = date.getFullYear()
  // Return the formatted date string
  return `${day} ${month} ${year}`
}

export const convertToNormalCase = (value: string) => {
  var convertedString = value.replace(/([A-Z])/g, ' $1').trim()
  convertedString =
    convertedString.charAt(0).toUpperCase() +
    convertedString.slice(1).toLowerCase()
  return convertedString
}

export const getItemIndex = (
  index: number,
  currentPage: number,
  limit: number
) => (currentPage - 1) * limit + index + 1
