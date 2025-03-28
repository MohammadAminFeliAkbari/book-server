'use client'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import React, { useState } from 'react'
import { AppContext } from './AppContext'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [refresh, setRefresh] = useState<string>('')
  const [access, setAccess] = useState<string>('')

  return (
    <AppContext.Provider
      value={{ refresh, setRefresh, access, setAccess }}
    >
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </AppContext.Provider>
  )
}
