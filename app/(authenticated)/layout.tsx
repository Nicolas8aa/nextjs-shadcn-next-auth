import React from 'react'

type AuthenticatedLayoutProps = {
  children: React.ReactNode
}
const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <div>
      yesss
      {children}
    </div>
  )
}

export default AuthenticatedLayout
