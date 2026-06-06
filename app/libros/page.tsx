'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, SlidersHorizontal, X, Grid3X3, List, ChevronDown } from 'lucide-react'
import { getAllBooks, categories, type Book } from '@/lib/books'
import BookCard from '@/components/BookCard'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'rating', label: 'Mejor valorados' },
  { value: 'newest', label: 'Más recientes' },
]

function applySort(books: Book[], sort: string): Book[] {
  const sorted = [...books]
  if (sort === 'price-asc') return sorted.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') return sorted.sort((a, b) => b.price - a.price)
  if (sort === 'rating') return sorted.sort((a, b) => b.rating - a.rating)
  if (sort === 'newest') return sorted.sort((a, b) => b.year - a.year)
  return sorted
}

function CatalogoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialQ = searchParams.get('q') ?? ''
  const initialCat = searchParams.get('category') ?? ''
  const initialFilter = searchParams.get('filter') ?? ''

  const [search, setSearch] = useState(initialQ)
  const [selectedCategory, setSelectedCategory] = useState(initialCat)
  const [sort, setSort] = useState('relevance')
  const [priceMax, setPriceMax] = useState(50)
  const [minRating, setMinRating] = useState(0)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filterOpen, setFilterOpen] = useState(false)

  const allBooks = getAllBooks()

  const filteredBooks = applySort(
    allBooks.filter((book) => {
      if (initialFilter === 'bestsellers' && !book.bestseller) return false
      if (initialFilter === 'novedades' && !book.newArrival) return false
      if (initialFilter === 'ofertas' && !book.originalPrice) return false
      if (selectedCategory && book.categorySlug !== selectedCategory) return false
      if (book.price > priceMax) return false
      if (book.rating < minRating) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.tags.some((t) => t.toLowerCase().includes(q))
        )
      }
      return true
    }),
    sort
  )

  const pageTitle = initialFilter === 'bestsellers'
    ? 'Más Vendidos'
    : initialFilter === 'novedades'
    ? 'Novedades'
    : initialFilter === 'ofertas'
    ? 'Ofertas'
    : selectedCategory
    ? categories.find((c) => c.slug === selectedCategory)?.name ?? 'Catálogo'
    : initialQ
    ? `Resultados para "${initialQ}"`
    : 'Catálogo Completo'

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (selectedCategory) params.set('category', selectedCategory)
    router.push(`/libros?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setPriceMax(50)
    setMinRating(0)
    router.push('/libros')
  }

  const hasActiveFilters = selectedCategory || priceMax < 50 || minRating > 0

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-[#0C1F3F] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-blue-300/60 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{pageTitle}</span>
          </nav>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white">{pageTitle}</h1>
          <p className="text-blue-200/60 mt-2">{filteredBooks.length} títulos encontrados</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Sidebar Filters ── */}
          <aside className={`lg:w-64 flex-shrink-0 ${filterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Filtros</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#C8923A] hover:text-[#A97626] font-medium flex items-center gap-1"
                  >
                    <X size={12} />
                    Limpiar
                  </button>
                )}
              </div>

              {/* Category */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Categoría
                </h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedCategory
                        ? 'bg-[#0C1F3F] text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      style={
                        selectedCategory === cat.slug
                          ? { backgroundColor: cat.color }
                          : undefined
                      }
                    >
                      <span>{cat.name}</span>
                      <span className={`text-xs ${selectedCategory === cat.slug ? 'text-white/60' : 'text-gray-400'}`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Precio máximo: <span className="text-gray-900">€{priceMax}</span>
                </h4>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#C8923A]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>€5</span>
                  <span>€50</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Valoración mínima
                </h4>
                <div className="space-y-1.5">
                  {[0, 4, 4.5, 4.7].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        minRating === r
                          ? 'bg-amber-50 text-amber-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {r === 0 ? (
                        'Todas'
                      ) : (
                        <>
                          <span className="text-amber-400">{'★'.repeat(Math.floor(r))}</span>
                          <span>{r}+</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[200px] relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar en el catálogo..."
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8923A] bg-white"
                />
              </form>

              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:border-gray-300"
              >
                <SlidersHorizontal size={15} />
                Filtros
                {hasActiveFilters && (
                  <span className="w-4 h-4 bg-[#C8923A] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    !
                  </span>
                )}
              </button>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:border-[#C8923A] cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-1.5 rounded ${view === 'grid' ? 'bg-[#0C1F3F] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid3X3 size={15} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-1.5 rounded ${view === 'list' ? 'bg-[#0C1F3F] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            {/* Active filters chips */}
            {(selectedCategory || search) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {search && (
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs px-3 py-1.5 rounded-full font-medium border border-amber-200">
                    Búsqueda: {search}
                    <button onClick={() => setSearch('')}><X size={12} /></button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium border border-blue-200">
                    {categories.find((c) => c.slug === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('')}><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Results */}
            {filteredBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Search size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-500 font-medium mb-1">No se encontraron libros</p>
                <p className="text-gray-400 text-sm mb-5">Prueba con otros filtros o términos de búsqueda</p>
                <button
                  onClick={clearFilters}
                  className="bg-[#C8923A] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#A97626] transition-colors"
                >
                  Ver todos los libros
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} variant="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LibrosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-400 text-sm">Cargando catálogo...</div>
        </div>
      }
    >
      <CatalogoContent />
    </Suspense>
  )
}
