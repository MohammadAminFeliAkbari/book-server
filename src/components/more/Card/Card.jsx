import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Card = ({ book }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg cursor-pointer m-3 dark:bg-">
      <Link to={`/book/${book.id}`}>
        <Image
          className="rounded-t-lg w-full"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4gXyBKJHZXNIU6JciljVqnAozb2YnDOKtYQ&s"
          }
          alt={book.title}
        />
      </Link>
      <div className="p-5">
        <Link to={`/book/${book.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {book.title}
          </h5>
        </Link>
        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {book.province}
        </div>
        <div className="extend-btn cursor-pointer group flex items-center justify-center hover:w-20 h-10 w-10 text-gray-800 bg-green-600 rounded-full transition-all duration-300">
          <FontAwesomeIcon icon={faShoppingCart} className="text-gray-200" />
          <span className="hidden group-hover:inline ml-2 text-gray-200">
            علاقه
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
