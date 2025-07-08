'use client'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import config from '../../../config'
import { AppContext } from '../../../../context/AppContext'

function Page() {
  const { access } = useContext(AppContext)
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${config.BASE_URL}/payment/buyer-invoices/`, {
        headers: {
          ...(access && { Authorization: `Bearer ${access}` })
        }
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
    fetchData()
  }, [])
  return (
    <h2>hello</h2>
  )
}

export default Page