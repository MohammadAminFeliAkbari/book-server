import { toPersianNumber } from '../../../convertNumberToPersion'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface CardProps {
  title: string
  front_image: string
  author: string
  province: string
  sale_price: number
  id: number
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  front_image,
  province,
  sale_price
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="relative"
    >
      <Link
        href={`/book/${id}`}
        className='flex flex-col gap-1 p-3 rounded-lg h-[320px] bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700'
      >
        {/* Image Container */}
        <motion.div 
          className="relative w-full h-40 rounded-md overflow-hidden"
          variants={imageVariants}
        >
          <Image 
            src={front_image} 
            alt='عکس روی کتاب' 
            fill
            className='object-cover'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Province Badge */}
          <motion.div 
            className="absolute top-2 right-2 bg-gray-600/90 px-2 py-1 rounded-md text-xs font-medium text-white backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            {'>'} {province}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col flex-1 pt-2">
          {/* Title - with line clamp for 2 lines */}
          <h2 className='text-[15px] font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug'>
            {title}
          </h2>

          {/* Price */}
          <div className="mt-auto pt-3">
            <h3 className='text-lg font-bold text-amber-600 dark:text-amber-400'>
              {toPersianNumber(sale_price)}
              <span className='text-sm text-gray-500 dark:text-gray-400'> تومان</span>
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default Card