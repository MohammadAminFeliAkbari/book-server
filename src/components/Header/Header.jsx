'use client'
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import config from '../../config'
import { Button } from '@mui/material'
import Buttons_Main from './Buttons'

export default function Header () {
  const [username, setUsername] = useState('')
  const [hiddenName, setHiddenName] = useState(false)

  const { refresh, access, setAccess, setRefresh } = useContext(AppContext)

  useEffect(() => {
    setAccess(localStorage.getItem('access'))
    setRefresh(localStorage.getItem('refresh'))

    setInterval(() => {
      setHiddenName(false)
    }, 10000)
  }, [])

  useEffect(() => {
    if (refresh && access) {
      const urlAccountMe = `${config.BASE_URL}/account/me/`
      if (access)
        fetch(urlAccountMe, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access}`
          }
        }).then(data => {
          const fetchData = async () => {
            const res = await data.json()
            console.log(res)

            if (res.detail) {
              const urlRefresh = `${config.BASE_URL}/auth/refresh/`

              fetch(urlRefresh, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh })
              })
                .then(data => {
                  const getRefresh = async () => {
                    const tokens = await data.json()
                    setRefresh(tokens.refresh)
                    setAccess(tokens.access)
                    localStorage.setItem('refresh', tokens.refresh)
                    localStorage.setItem('access', tokens.access)
                  }
                  getRefresh()
                })
                .catch(err => console.log(err))
            } else {
              if (res.first_name && res.last_name) {
                setUsername(res.first_name + ' ' + res.last_name)
                setHiddenName(true)
              }
            }
          }
          fetchData()
        })
    }
  }, [refresh, access])

  return (
    <header className='relative flex gap-2 items-center w-full px-2 py-3 dark:bg-gray-800 bg-gray-200 dark:text-gray-400 '>
      <h2 className='hidden xl:block'>hello</h2>
      <Link
        href={'/'}
        className='text-center mx-auto text-blue-500 font-bold'
      >
        کتاب بان
      </Link>

      {username && hiddenName ? (
        <div className='absolute pr-4 flex gap-2 items-center justify-center top-1 right-1 p-3 bg-green-400 text-white rounded-4xl'>
          <button
            onClick={() => setHiddenName(false)}
            className='hover:text-red-400 transition-[200] p-2 cursor-pointer'
          >
            ×
          </button>
          <h1>{username} خوش آمدی!!</h1>
        </div>
      ) : null}

      {<Buttons_Main />}
    </header>
  )
}
