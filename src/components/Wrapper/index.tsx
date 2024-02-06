'use client'
import React, { useState, useEffect } from 'react'
import Sidebar from '../SideBar'
import { useAuthContext } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutProps } from '@/types'
import { SidebarProvider } from '@/context/SidebarContext'

const Wrapper: React.FC<LayoutProps> = (props) => {
  const [currentRoute, setCurrentRoute] = useState('/employees')
  const { children, className } = props
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, setPath } = useAuthContext()
  const router = useRouter()

  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    const route = pathname.split('/')[1]
    setCurrentRoute(`/${route}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    const secure = async () => {
      if (isAuthenticated === null) {
        setLoading(true)
      } else if (!isAuthenticated) {
        setPath(pathname)
        router.replace('/login')
      } else {
        setLoading(false)
      }
    }
    secure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  if (loading) return <div></div>

  return (
    <SidebarProvider
      handleClick={(link) => {
        router.push(link)
      }}
      selectedNavItem={currentRoute}
    >
      <main
        className={`w-full h-screen min-h-screen relative flex overflow-hidden flex-row ${className}`}
      >
        <Sidebar />
        <div className="relative flex-1 h-full w-full py-7 px-14 overflow-y-scroll">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Wrapper
