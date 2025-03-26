'use client'
import React, { useState, useEffect } from 'react'

interface Book {
  title: string
  front_image: string
  sale_price: number // Adjust type based on actual API response
  author: string
  province: string
}

export default function get (url: string) {
  const [data, setData] = useState<Book[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Network response was not OK')
        const data: Book[] = await response.json() // Parse JSON with type assertion
        setData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  return data
}
