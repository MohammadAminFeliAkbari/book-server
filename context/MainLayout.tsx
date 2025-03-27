'use client'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import React, { useState } from 'react'
import { AppContext } from './AppContext'

export default function MainLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <AppContext.Provider
      value={{ username, setUsername, password, setPassword }}
    >
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </AppContext.Provider>
  )
}
