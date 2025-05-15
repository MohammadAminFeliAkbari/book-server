import React from 'react'
import Infinite from './Infinite'

async function page ({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  return <Infinite categoryNumber={id} />
}

export default page
