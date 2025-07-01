import React from 'react'

function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      
      <h1 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mt-6">
        اتصال اینترنتی برقرار نیست
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-center max-w-md">
        متاسفانه نمی‌توانیم به سرور متصل شویم. لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش نمایید.
      </p>
    </div>
  )
}

export default Page
