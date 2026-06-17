'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import type { Book } from '@/lib/books-types'
import { useCart } from '@/context/CartContext'

export default function AddToCartBox({ book }: { book: Book }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(book)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-3 hover:bg-gray-50 transition-colors font-medium"
        >
          <Minus size={16} />
        </button>
        <span className="px-5 py-3 font-bold text-gray-900 min-w-[3rem] text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
          className="px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={book.stock === 0}
        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-base transition-all ${
          added
            ? 'bg-green-500 text-white'
            : book.stock === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-[#F97316] hover:bg-[#C2570F] text-white active:scale-95'
        }`}
      >
        <ShoppingCart size={18} />
        {added ? '¡Añadido!' : 'Añadir al carrito'}
      </button>
    </div>
  )
}
