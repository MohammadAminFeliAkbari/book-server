import axios from 'axios'
import config from '../../config'
import Card from './Card'

export type Root = Item[]

export interface Item {
  id: number
  title: string
  author: string
  category: string
  sale_price: number
  province: string
  front_image: string
  back_image: string
  description: string
  created_at: string
}

const Page = async () => {
  const response = await axios.get(`${config.BASE_URL}/bookcase/books`)
  const books: Root = response.data
  console.log(books)

  return (
    <ol className='flex flex-wrap flex-col justify-center gap-10 m-10  max-w-[1000px] mr-auto ml-auto'>
      {books.map((book, index) => (
      <li key={index} className='mx-10'>   
          <Card
          id = {book.id}
          author={book.author}
          front_image={book.front_image}
          province={book.province}
          sale_price={book.sale_price}
          title={book.title}
          />
        </li>
      ))}
    </ol>
  )
}

export default Page
