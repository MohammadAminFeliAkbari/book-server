'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ErrorPage() {
  const router = useRouter()

  useEffect(() => {
    // Only redirect after the component mounts
    const timer = setTimeout(() => {
      router.replace('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        مشکلی پیش امده !!
      </h2>
      <p>درحال انتقال به صفحه اصلی هستید...</p>
    </div>
  )
}