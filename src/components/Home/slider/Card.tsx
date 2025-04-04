import Image from 'next/image';
import { toPersianNumber } from '../../../convertNumberToPersion';
import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  front_image: string;
  author: string;
  province: string;
  sale_price: number;
  id: string
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  front_image,
  author,
  province,
  sale_price
}) => {
  return (
    <Link href={`/book/${id}`} className='relative'>
      <Image src={front_image} alt='' width={152} height={200} />
      <h4 className='absolute top-3 right-3 bg-gray-500 px-2 py-1 rounded-md text-xs font-medium text-white'>
        {'>'} {province}
      </h4>
    </Link>
  );
}

export default Card;    