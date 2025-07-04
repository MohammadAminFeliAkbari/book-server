import React from 'react'
import BookPage from './BookPage'

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  return (
    <BookPage id={id} />
  )
}