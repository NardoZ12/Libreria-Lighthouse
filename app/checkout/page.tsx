'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CreditCard, Lock, CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import BookCover from '@/components/BookCover'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)

  const shippingFree = totalPrice >= 1500
  const shipping = shippingFree ? 0 : 150
  const total = totalPrice + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('success')
      clearCart()
    }, 1500)
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#0C1F3F] mb-3">
            ¡Pedido confirmado!
          </h1>
          <p className="text-gray-500 mb-2">
            Hemos recibido tu pedido y te enviaremos un correo de confirmación.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Número de pedido: <strong>#LH-{Math.floor(Math.random() * 90000) + 10000}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/libros"
              className="inline-flex items-center justify-center gap-2 bg-[#F97316] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#C2570F] transition-colors"
            >
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0C1F3F] text-[#0C1F3F] px-6 py-3 rounded-xl font-semibold hover:bg-[#0C1F3F] hover:text-white transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <ShoppingBag size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
          <Link href="/libros" className="text-[#F97316] font-medium hover:text-[#C2570F]">
            Explorar catálogo →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#0C1F3F] py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-blue-300/60 mb-3 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/carrito" className="hover:text-white">Carrito</Link>
            <ChevronRight size={14} />
            <span className="text-white">Pago</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-white flex items-center gap-3">
            <Lock size={22} className="text-[#F97316]" />
            Finalizar compra
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[1fr,360px] gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">Información de contacto</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                  <input type="text" required placeholder="Tu nombre" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Apellidos</label>
                  <input type="text" required placeholder="Tus apellidos" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" required placeholder="tu@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
                  <input type="tel" required placeholder="+34 612 345 678" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">Dirección de envío</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección</label>
                  <input type="text" required placeholder="Calle y número" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ciudad</label>
                  <input type="text" required placeholder="Ciudad" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Código postal</label>
                  <input type="text" required placeholder="28001" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Provincia / Comunidad</label>
                  <input type="text" required placeholder="Madrid" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <CreditCard size={18} className="text-[#F97316]" />
                Método de pago
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Número de tarjeta</label>
                  <input type="text" required placeholder="1234 5678 9012 3456" maxLength={19} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha de expiración</label>
                  <input type="text" required placeholder="MM/AA" maxLength={5} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                  <input type="text" required placeholder="123" maxLength={4} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20" />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                <Lock size={12} />
                Tus datos están protegidos con cifrado SSL de 256 bits
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/carrito"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#0C1F3F] transition-colors"
              >
                <ArrowLeft size={16} />
                Volver al carrito
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-[#F97316] hover:bg-[#C2570F] disabled:bg-gray-300 text-white px-8 py-3.5 rounded-xl font-bold text-base transition-colors"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    Confirmar pedido · {formatPrice(total)}
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Tu pedido ({totalItems})</h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <BookCover
                      title={item.title}
                      author={item.author}
                      coverColors={item.coverColors}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.author}</p>
                      <p className="text-sm font-bold text-[#0C1F3F] mt-1">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
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
                <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
