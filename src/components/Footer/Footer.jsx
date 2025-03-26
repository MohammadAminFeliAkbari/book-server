import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='bg-white shadow dark:bg-gray-800 z-10'>
      <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2023
          <Link href='https://flowbite.com/' className='hover:underline'></Link>
          تمامی حقوق محفوظ است.
        </span>
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <li>
            <Link href='#' className='hover:underline me-4 md:me-6'>
              درباره
            </Link>
          </li>
          <li>
            <a
              href='https://github.com/'
              className='hover:underline me-4 md:me-6'
              target='_blank'
              rel='noopener noreferrer'
            >
              گیت هاب
            </a>
          </li>
          <li>
            <Link
              href='#'
              target='_blank'
              className='hover:underline me-4 md:me-6'
            >
              قوانین
            </Link>
          </li>
          <li>
            <Link href='#' className='hover:underline'>
              محتوا
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
