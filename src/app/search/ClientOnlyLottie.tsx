'use client'
import React from 'react'
import Lottie from 'lottie-react'
import Empty from './empty.json'

const ClientOnlyLottie = () => {
  return <Lottie animationData={Empty} loop={true} style={{ width: 300 }} />
}

export default ClientOnlyLottie
