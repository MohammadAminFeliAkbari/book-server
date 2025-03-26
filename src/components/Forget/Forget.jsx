import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Forget () {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isUserName, setIsUserName] = useState(false)
  const reff = useRef()
  const [errorLogin, setErrorLogin] = useState(null)

  let errorLengthPassword

  if (password.length < 8 && password.length !== 0)
    errorLengthPassword = (
      <p className='text-red-600 text-right my-1'>
        رمز عبور حداقل باید 8 کاراکتر باشد
      </p>
    )
  else errorLengthPassword = null

  return (
    <div className='app flex items-center justify-center py-4 bg-gradient-to-r'>
      <form className='flex flex-col items-center p-6 bg-white rounded-lg shadow-md w-full max-w-sm justify-center rtl m-3 hover:shadow-xl transition-all'>
        <h2 className='text-lg font-semibold mb-4'>فراموشی رمز عبور</h2>
        <input
          ref={reff}
          type='text'
          onChange={e => setUsername(e.target.value)}
          placeholder='یوزرنیم قبلی'
          className={`${
            errorLogin ? '' : 'mb-4'
          } w-full p-2  border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errorLogin}
        {isUserName ? null : (
          <button
            className={`w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 hover:scale-105`}
          >
            چک کردن نام کاربری
          </button>
        )}
        {isUserName ? (
          <>
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='رمزعبور جدید خود را وارد کنید'
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errorLengthPassword}
            <button
              type='submit'
              className={`${
                errorLengthPassword ? '' : 'mt-3'
              } w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 hover:scale-105`}
            >
              تغییر رمز عبور
            </button>
          </>
        ) : null}
      </form>
    </div>
  )
}
