// 'use client'
// import { useState } from 'react'
// import './login.css'
// import Link from 'next/link'

// export default function LoginMenu () {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')


//   return (
//     <>
//       <div className='login flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
//         <div className='glassCss w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-700 bg-gray-200'>
//           <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
//             <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl '>
//               وارد حساب کاربری خود شوید
//             </h1>
//             <form className='space-y-4 md:space-y-6'>
//               <div>
//                 <label
//                   htmlFor='username'
//                   className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
//                 >
//                   نام کاربری
//                 </label>
//                 <input
//                   name='username'
//                   id='username'
//                   className='bg-gray-50 border dark:text-gray-600 outline-none text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                   placeholder='john...'
//                   required
//                   onChange={event => setUsername(event.target.value)}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor='password'
//                   className='block mb-2 text-sm font-medium outline-none border-none text-gray-900 dark:text-white'
//                 >
//                   روزعبور
//                 </label>
//                 <input
//                   type='password'
//                   name='password'
//                   id='password'
//                   placeholder='••••••••'
//                   className='bg-gray-50 border  outline-none text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                   required
//                   onChange={event => setPassword(event.target.value)}
//                 />
//               </div>
//               <div className='flex items-center justify-between'>
//                 <div className='flex items-start gap-2 justify-center'>
//                   <div className='flex items-center h-5'>
//                     <input
//                       id='remember'
//                       type='checkbox'
//                       className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
//                     />
//                   </div>
//                   <div className='ml-3 text-sm'>
//                     <label
//                       htmlFor='remember'
//                       className='text-gray-500 dark:text-gray-300'
//                     >
//                       به خاطر سپردن
//                     </label>
//                   </div>
//                 </div>
//                 <Link
//                   href={''}
//                   className='text-sm dark:text-gray-200 font-medium text-primary-600 hover:underline text-gray-600'
//                 >
//                   فراموشی رمز؟
//                 </Link>
//               </div>
//               <button
//                 type='submit'
//                 className='w-full bg-blue-700 hover:scale-105 transition hover:bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
//               >
//                 ورود
//               </button>
//               <p className='text-sm font-light text-gray-600 dark:text-gray-400 flex items-center gap-1'>
//                 حساب کاربری ندارید؟
//                 <Link
//                   href='/signup'
//                   className='font-medium text-primary-600 hover:underline dark:text-primary-500'
//                 >
//                   ثبت نام
//                 </Link>
//               </p>
//               {/* Display error message if it exists */}
//               {error && (
//                 <div className='font-thin text-sm text-center text-red-500'>
//                   {error}
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

import React from 'react'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login