import React from 'react'
import BookPage from './BookPage'

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  console.log('id is :')
  console.log(id)
  return (
    <BookPage id={id} />
  )
}