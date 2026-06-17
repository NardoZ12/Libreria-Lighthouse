'use client'

import Link from 'next/link'
import { ShoppingCart, Sparkles } from 'lucide-react'
import type { Combo, Book } from '@/lib/books-types'
import { useCart } from '@/context/CartContext'
import BookCover from './BookCover'
import { formatPrice, calculateDiscount } from '@/lib/utils'

interface ComboCardProps {
  combo: Combo
  books: Book[]
}

export default function ComboCard({ combo, books }: ComboCardProps) {
  const { addItem } = useCart()
  const savings = combo.originalPrice - combo.price
  const discount = calculateDiscount(combo.originalPrice, combo.price)

  const handleAddToCart = () => {
    addItem({
      id: combo.id,
      title: combo.title,
      author: `Combo de ${books.length} libros`,
      price: combo.price,
      categorySlug: 'combos',
      category: 'Combos',
      coverColors: combo.coverColors ?? ['#0C1F3F', '#1e3a5f', '#F97316'],
      rating: 5,
      reviewCount: 0,
      description: combo.description,
      longDescription: combo.description,
      stock: 99,
      isbn: '',
      publisher: '',
      year: new Date().getFullYear(),
      pages: 0,
      language: 'Español',
      tags: [],
    })
  }

  return (
    <div
      data-carousel-item
      className="carousel-item flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gold-100 flex flex-col"
    >
      <div className="relative bg-gradient-to-br from-navy to-navy-800 p-5">
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-gold text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide z-10">
          <Sparkles size={11} />
          Combo
        </span>
        <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
          -{discount}%
        </span>
        <div className="flex justify-center gap-[-20px] mt-4">
          {books.slice(0, 3).map((book, i) => (
            <div
              key={book.id}
              className={i === 0 ? '-mr-4 rotate-[-6deg]' : i === 2 ? '-ml-4 rotate-[6deg] z-0' : 'z-10'}
              style={{ marginTop: i === 1 ? '-8px' : '6px' }}
            >
              <BookCover
                title={book.title}
                author={book.author}
                coverColors={book.coverColors}
                image={book.image}
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-navy text-base leading-snug mb-1">{combo.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3">{combo.description}</p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-navy">{formatPrice(combo.price)}</span>
            <span className="text-sm text-gray-400 line-through">{formatPrice(combo.originalPrice)}</span>
          </div>
          <p className="text-xs font-semibold text-green-600 mb-3">
            Ahorras {formatPrice(savings)}
          </p>
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <ShoppingCart size={15} />
            Agregar Combo al Carrito
          </button>
        </div>
      </div>
    </div>
  )
}
