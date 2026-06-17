'use client'

import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { Book } from '@/lib/books'
import { useCart } from '@/context/CartContext'
import BookCover from './BookCover'
import StarRating from './StarRating'
import { formatPrice, calculateDiscount } from '@/lib/utils'

interface BookCardProps {
  book: Book
  variant?: 'grid' | 'list'
}

export default function BookCard({ book, variant = 'grid' }: BookCardProps) {
  const { addItem } = useCart()

  if (variant === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex gap-5">
        <Link href={`/libros/${book.id}`} className="flex-shrink-0">
          <BookCover
            title={book.title}
            author={book.author}
            coverColors={book.coverColors}
            category={book.category}
            image={book.image}
            size="sm"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/libros/${book.id}`}>
                <h3 className="font-semibold text-gray-900 hover:text-gold transition-colors line-clamp-2 leading-snug">
                  {book.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mt-0.5">{book.author}</p>
              {book.version && (
                <span className="inline-block mt-1 text-[10px] font-semibold text-gold-dark bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200">
                  {book.version}
                </span>
              )}
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
              <Heart size={18} />
            </button>
          </div>
          <StarRating rating={book.rating} reviewCount={book.reviewCount} />
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{book.description}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-navy">{formatPrice(book.price)}</span>
              {book.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(book.originalPrice)}</span>
              )}
            </div>
            <button
              onClick={() => addItem(book)}
              className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <ShoppingCart size={15} />
              Añadir
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group flex flex-col">
      <div className="relative p-4 pb-3 flex justify-center bg-gray-50">
        {book.bestseller && (
          <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide z-10">
            Bestseller
          </span>
        )}
        {book.newArrival && !book.bestseller && (
          <span className="absolute top-2 left-2 bg-navy text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide z-10">
            Nuevo
          </span>
        )}
        {book.originalPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
            -{calculateDiscount(book.originalPrice, book.price)}%
          </span>
        )}
        <button className="absolute bottom-2 right-2 text-gray-300 hover:text-red-500 transition-colors z-10 opacity-0 group-hover:opacity-100">
          <Heart size={18} />
        </button>
        <Link href={`/libros/${book.id}`} className="block">
          <BookCover
            title={book.title}
            author={book.author}
            coverColors={book.coverColors}
            category={book.category}
            image={book.image}
            size="md"
            className="group-hover:scale-[1.03] transition-transform duration-200"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {book.version && (
          <span className="inline-block self-start mb-1 text-[9px] font-semibold text-gold-dark bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200 uppercase tracking-wide">
            {book.version}
          </span>
        )}
        <StarRating rating={book.rating} reviewCount={book.reviewCount} />
        <Link href={`/libros/${book.id}`} className="mt-1">
          <h3 className="font-semibold text-gray-900 hover:text-gold transition-colors text-sm leading-snug line-clamp-2">
            {book.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs mt-0.5 mb-3">{book.author}</p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-navy">{formatPrice(book.price)}</span>
            {book.originalPrice && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(book.originalPrice)}</span>
            )}
          </div>
          <button
            onClick={() => addItem(book)}
            className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <ShoppingCart size={15} />
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  )
}
