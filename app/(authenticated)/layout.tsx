import React from 'react'

type AuthenticatedLayoutProps = {
  children: React.ReactNode
}
const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return <>{children}</>
}

export default AuthenticatedLayout
