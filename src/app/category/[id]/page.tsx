import axios from 'axios'
import React from 'react'
import Infinite from './Infinite'
import config from '../../../config'

async function page ({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  return <Infinite categoryNumber={id} />
}

export default page
