'use client'

import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import BookCover from './BookCover'
import { formatPrice } from '@/lib/utils'

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart()
  const shippingFree = totalPrice >= 1500
  const shipping = shippingFree ? 0 : 150

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#F97316]" />
            <h2 className="font-bold text-gray-900 text-lg">
              Tu carrito
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">({totalItems} artículos)</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={48} className="text-gray-200 mb-4" />
              <p className="text-gray-500 font-medium mb-1">Tu carrito está vacío</p>
              <p className="text-gray-400 text-sm mb-6">Añade libros para comenzar</p>
              <Link
                href="/libros"
                onClick={closeCart}
                className="bg-[#F97316] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#C2570F] transition-colors"
              >
                Explorar catálogo
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 py-3 border-b border-gray-50 last:border-0">
                <BookCover
                  title={item.title}
                  author={item.author}
                  coverColors={item.coverColors}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/libros/${item.id}`}
                    onClick={closeCart}
                    className="text-sm font-semibold text-gray-900 hover:text-[#F97316] line-clamp-2 leading-snug block"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5 mb-2">{item.author}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-sm font-semibold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0C1F3F]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4 space-y-3 bg-gray-50">
            {!shippingFree && (
              <div className="text-xs text-center text-gray-500 bg-amber-50 border border-amber-100 rounded-lg p-2">
                Añade <strong>{formatPrice(1500 - totalPrice)}</strong> más para envío gratis
              </div>
            )}
            {shippingFree && (
              <div className="text-xs text-center text-green-700 bg-green-50 border border-green-100 rounded-lg p-2 font-medium">
                ¡Envío gratis en tu pedido!
              </div>
            )}

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className={shippingFree ? 'text-green-600 font-medium' : ''}>
                  {shippingFree ? 'Gratis' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{formatPrice(totalPrice + shipping)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full bg-[#F97316] hover:bg-[#C2570F] text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Proceder al pago
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/carrito"
              onClick={closeCart}
              className="flex items-center justify-center w-full border-2 border-[#0C1F3F] text-[#0C1F3F] hover:bg-[#0C1F3F] hover:text-white py-2.5 rounded-xl font-medium transition-colors text-sm"
            >
              Ver carrito completo
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
