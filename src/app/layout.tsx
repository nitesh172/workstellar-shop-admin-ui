import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'

const open_Sans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WorkStellar Admin',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={open_Sans.className}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          containerStyle={{ fontSize: 14 }}
          toastOptions={{ duration: 3000 }}
        />
      </body>
    </html>
  )
}
