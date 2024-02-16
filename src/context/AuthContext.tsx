'use client'
import { HttpMethod, UserProps } from '@/types'
import { useCaller } from '@/utils/API'
import { hasCookie } from 'cookies-next'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'
declare var window: any

export type AuthContextType = {
  isAuthenticated: boolean | null
  setIsAuthenticated: (value: boolean) => void
  path: string
  setPath: (value: string) => void
  currentUser?: UserProps
  setCurrentUser: (value: UserProps) => void
  fetchUser: Function
}

const providerOptions = {}

const AuthContext: any = createContext<AuthContextType>({} as AuthContextType)

export type AuthProviderProps = {
  children?: ReactNode
}

export const useAuthContext = () => {
  return useContext<AuthContextType>(AuthContext)
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props
  const [path, setPath] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [currentUser, setCurrentUser] = useState<UserProps>()

  const { execute: fetchUser } = useCaller({
    method: HttpMethod.GET,
    doneCb: (resp: any) => {
      if (!resp) return
      setCurrentUser(resp)
    },
    errorCb: (failed: any) => {
      toast.error(failed)
    },
  })

  useEffect(() => {
    const userToken = hasCookie('workStellarToken')

    if (!userToken) {
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
      userToken && !!isAuthenticated && fetchUser('users/me')
    }
  }, [isAuthenticated])

  const defaultContext: AuthContextType = {
    ...props,
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setIsAuthenticated,
    path,
    fetchUser,
    setPath,
  }

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  )
}
