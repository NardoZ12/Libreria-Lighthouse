'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, BookMarked, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Book } from '@/lib/books-types'
import BookCover from '@/components/BookCover'

const AUTOPLAY_MS = 4000

export default function HomeHero({ featured }: { featured: Book[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const slides = featured
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [slides.length])

  const goTo = (next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/libros?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative bg-[#0C1F3F] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-800/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold-light text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              <BookMarked size={12} />
              Tu librería cristiana en República Dominicana
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Libros que{' '}
              <span className="text-gold">alimentan</span>{' '}
              el alma
            </h1>
            <p className="text-blue-100/70 text-lg leading-relaxed mb-4">
              Biblias, devocionales, guerra espiritual, finanzas bíblicas y crecimiento personal para cada etapa de tu camino de fe. Más de 5.000 títulos disponibles.
            </p>
            <p className="text-gold-light/80 text-sm italic mb-8">
              «Tu palabra es lámpara a mis pies; es luz en mi sendero.» — Salmo 119:105
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-md">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar Biblias, devocionales, autores..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="bg-gold hover:bg-gold-dark text-white px-5 rounded-xl font-medium transition-colors flex-shrink-0"
              >
                Buscar
              </button>
            </form>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#biblias"
                className="inline-flex items-center gap-2 bg-white text-[#0C1F3F] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Ver Biblias
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/libros"
                className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:border-white/50 hover:bg-white/5 transition-colors"
              >
                Catálogo completo
              </Link>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-10 border-t border-white/10">
              {[
                { value: '5.000+', label: 'Títulos' },
                { value: '20.000+', label: 'Familias servidas' },
                { value: '5 años', label: 'Sirviendo' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white font-serif">{stat.value}</div>
                  <div className="text-sm text-blue-200/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Book slider */}
          {slides.length > 0 && (
            <div className="relative h-[460px] lg:h-[520px] flex flex-col items-center group">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-gold/15 rounded-full blur-3xl" />
              </div>

              <div className="relative flex-1 w-full flex items-center justify-center">
                {slides.length > 1 && (
                  <button
                    onClick={() => goTo(index - 1)}
                    aria-label="Anterior"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}

                <Link
                  key={slides[index].id}
                  href={`/libros/${slides[index].id}`}
                  className="relative h-full w-full max-w-[300px] flex flex-col items-center justify-center text-center animate-fade-in"
                >
                  <div className="w-full flex-1 flex items-center justify-center min-h-0">
                    {slides[index].image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={slides[index].image}
                        alt={slides[index].title}
                        className="max-h-full max-w-full object-contain drop-shadow-2xl"
                      />
                    ) : (
                      <BookCover
                        title={slides[index].title}
                        author={slides[index].author}
                        coverColors={slides[index].coverColors}
                        category={slides[index].category}
                        size="xl"
                      />
                    )}
                  </div>
                  <p className="text-white font-semibold leading-snug mt-4 line-clamp-2 flex-shrink-0">
                    {slides[index].title}
                  </p>
                  <p className="text-blue-200/60 text-sm mt-1 flex-shrink-0">{slides[index].author}</p>
                </Link>

                {slides.length > 1 && (
                  <button
                    onClick={() => goTo(index + 1)}
                    aria-label="Siguiente"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>

              {slides.length > 1 && (
                <div className="flex gap-1.5 mt-5 flex-shrink-0">
                  {slides.map((book, i) => (
                    <button
                      key={book.id}
                      onClick={() => goTo(i)}
                      aria-label={`Ir a la diapositiva ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index ? 'w-6 bg-gold' : 'w-1.5 bg-white/25 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
