import React, { useContext, useState } from 'react'

import {
  Drawer as MUIDrawer,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import Link from 'next/link'

const MyDrawer = ({ open, setOpen, username }) => {
  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setOpen(open)
  }

  const list = () => (
    <div
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className='dark:bg-gray-500 h-full p-4 w-[200px]'
    >
      <list>
        {username ? (
          <div className='flex flex-col justify-center items-center p-3 gap-3'>
            <div className='text-white bg-gray-600 rounded-full p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
                fill='currentColor'
              >
                <path d='M12 12c2.64 0 8 1.34 8 4v1h-16v-1c0-2.66 5.36-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' />
              </svg>
            </div>

            <h2>{username}</h2>
          </div>
        ) : (
          <div className='h-full flex flex-col relative'>
            <h1 className='text-center p-3 text-gray-800 dark:text-gray-200'>
              کتاب بان {username}
            </h1>
            <div className='border-b-1 text-gray-400 w-full'></div>
          <Link href={'/signup'} className='bg-green-500 w-full px-4 absolute bottom-0 mx-auto rounded-3xl flex cursor-pointer py-2 dark:text-gray-300 gap-1 items-center justify-center text-[15px] '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-3 text-gray-600 pb-1'
              >
                <path d='M15 3h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4' />
                <polyline points='10 17 15 12 10 7' />
                <line x1='15' y1='12' x2='3' y2='12' />
              </svg>
              <span className='text-gray-600'>ورود یا عضویت</span>
            </Link>
          </div>
        )}
      </list>
    </div>
  )

  return (
    <div>
      <MUIDrawer
        anchor='right'
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ width: 250 }} // Set your desired width here
        variant='temporary' // or "permanent" based on your need
      >
        {list()}
      </MUIDrawer>
    </div>
  )
}

export default MyDrawer
