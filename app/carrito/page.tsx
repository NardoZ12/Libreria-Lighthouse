'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import BookCover from '@/components/BookCover'
import { formatPrice } from '@/lib/utils'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  const shippingFree = totalPrice >= 1500
  const shipping = shippingFree ? 0 : 150
  const total = totalPrice + shipping

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0C1F3F] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-blue-300/60 mb-3">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Mi carrito</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-white">
            Mi carrito
            {totalItems > 0 && (
              <span className="text-lg font-normal text-blue-200/60 ml-3">
                ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})
              </span>
            )}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag size={64} className="text-gray-200 mb-5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              Parece que no has añadido ningún libro todavía. ¡Explora nuestro catálogo!
            </p>
            <Link
              href="/libros"
              className="inline-flex items-center gap-2 bg-[#F97316] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#C2570F] transition-colors"
            >
              Explorar catálogo
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr,360px] gap-8">
            {/* Items */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 p-5 ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
                  >
                    <Link href={`/libros/${item.id}`} className="flex-shrink-0">
                      <BookCover
                        title={item.title}
                        author={item.author}
                        coverColors={item.coverColors}
                        size="md"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <Link href={`/libros/${item.id}`}>
                          <h3 className="font-bold text-gray-900 hover:text-[#F97316] transition-colors leading-snug mb-1">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-sm">{item.author}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                        <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 py-2 font-bold text-gray-900 min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-[#0C1F3F]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            aria-label="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <Link
                  href="/libros"
                  className="text-sm text-[#F97316] font-medium hover:text-[#C2570F] flex items-center gap-1 transition-colors"
                >
                  ← Seguir comprando
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              {/* Coupon */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Tag size={16} className="text-[#F97316]" />
                  Código de descuento
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Introduce tu código"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#F97316]"
                  />
                  <button className="bg-[#0C1F3F] text-white px-4 rounded-lg text-sm font-medium hover:bg-[#1a3a6b] transition-colors">
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Resumen del pedido</h3>

                {!shippingFree && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 text-center">
                    Añade <strong>{formatPrice(1500 - totalPrice)}</strong> más para{' '}
                    <strong>envío gratis</strong>
                  </div>
                )}

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} artículos)</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className={`font-medium ${shippingFree ? 'text-green-600' : ''}`}>
                      {shippingFree ? 'GRATIS' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>IVA incluido</span>
                    <span className="font-medium text-gray-400">—</span>
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-3 mb-5">
                  <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Total</span>
                    <span className="text-[#0C1F3F]">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full bg-[#F97316] hover:bg-[#C2570F] text-white py-4 rounded-xl font-bold text-base transition-colors"
                >
                  Proceder al pago
                  <ArrowRight size={18} />
                </Link>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center text-[10px] text-gray-400">
                  <div>🔒 Pago seguro</div>
                  <div>🚚 Envío rápido</div>
                  <div>↩ Devolución 30d</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
