import './globals.css'
import type { Metadata } from 'next'
import { auth } from '@/auth'
import { AuthProvider } from '@/components/AuthProvider'

import { Open_Sans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const open_sans = Open_Sans({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Gestor de apuestas',
  description: 'Gestor de apuestas',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="es">
      <body className={`${open_sans.className}`}>
        <AuthProvider session={session}>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
