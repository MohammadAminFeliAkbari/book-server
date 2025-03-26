import React from 'react'
import useFetch from '../../../hooks/useFetch'
import Card from '../Card/Card'

export default function Cards () {
  // Call the useFetch hook directly in the component's body
  const { data, loading, error } = useFetch('')

  console.log(data)

  return (
    <section className='flex flex-col items-center mb-44'>
      <main
        className='flex flex-wrap justify-center max-w-[1200px] p-4'
        style={{
          gap: '16px'
        }}
      >
        {error ? <h1>error</h1> : loading ? (
          <h1>Loading...</h1>
        ) : (
          data.map(book => (
            <Card key={book.id} book={book} /> // Pass the book data to Card and set a unique key
          ))
        )}
      </main>
    </section>
  )
}
