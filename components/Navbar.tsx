'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Menu, X, BookOpen, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/libros', label: 'Catálogo' },
  { href: '/libros?filter=novedades', label: 'Novedades' },
  { href: '/libros?filter=ofertas', label: 'Ofertas' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { totalItems, openCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/libros?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
      setMobileOpen(false)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-[#0C1F3F] rounded-lg flex items-center justify-center">
                <BookOpen size={18} className="text-[#C8923A]" />
              </div>
              <div className="leading-tight">
                <span className="font-serif font-bold text-[#0C1F3F] text-lg leading-none">
                  Light<span className="text-[#C8923A]">house</span>
                </span>
                <span className="block text-[10px] text-gray-400 tracking-widest uppercase -mt-0.5">
                  Librería
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#C8923A] hover:bg-amber-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar libros, autores..."
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-56 focus:outline-none focus:border-[#C8923A] focus:ring-1 focus:ring-[#C8923A]/20"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-1 p-2 text-gray-500 hover:text-gray-900"
                  >
                    <X size={18} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-[#C8923A] hover:bg-amber-50 rounded-lg transition-colors"
                  aria-label="Buscar"
                >
                  <Search size={20} />
                </button>
              )}

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 text-gray-600 hover:text-[#C8923A] hover:bg-amber-50 rounded-lg transition-colors"
                aria-label="Carrito"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C8923A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-[#0C1F3F] rounded-lg transition-colors ml-1"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1 shadow-lg">
            <form onSubmit={handleSearch} className="flex gap-2 mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar libros, autores..."
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C8923A]"
              />
              <button
                type="submit"
                className="bg-[#C8923A] text-white px-4 rounded-lg"
              >
                <Search size={16} />
              </button>
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#C8923A] hover:bg-amber-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16 lg:h-18" />
    </>
  )
}
