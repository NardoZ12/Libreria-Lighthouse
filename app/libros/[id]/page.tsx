import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Heart, Share2, Truck, RotateCcw, Shield,
  BookOpen, Calendar, Hash, Globe, ChevronRight,
} from 'lucide-react'
import { getBookById, getRelatedBooks } from '@/lib/books'
import BookCover from '@/components/BookCover'
import BookCard from '@/components/BookCard'
import StarRating from '@/components/StarRating'
import AddToCartBox from '@/components/AddToCartBox'
import { formatPrice, calculateDiscount } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const fakeReviews = [
  { name: 'Carmen López', avatar: 'CL', rating: 5, date: 'Hace 2 semanas', text: 'Una obra absolutamente imprescindible. Lo recomiendo a todo el mundo, llegó perfectamente embalado y en tiempo récord.' },
  { name: 'Miguel Santos', avatar: 'MS', rating: 5, date: 'Hace 1 mes', text: 'Ya lo había leído antes pero compré esta edición por la calidad del papel y la presentación. Excelente.' },
  { name: 'Laura Fernández', avatar: 'LF', rating: 4, date: 'Hace 2 meses', text: 'Muy buena selección y el envío fue rapidísimo. El libro en perfectas condiciones.' },
]

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id)
  if (!book) notFound()

  const related = await getRelatedBooks(book, 4)

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#0C1F3F]/5 border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#F97316] transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/libros" className="hover:text-[#F97316] transition-colors">Catálogo</Link>
            <ChevronRight size={14} />
            <Link
              href={`/libros?category=${book.categorySlug}`}
              className="hover:text-[#F97316] transition-colors"
            >
              {book.category}
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{book.title}</span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-16">
          {/* Cover */}
          <div className="flex flex-col items-center gap-4">
            <BookCover
              title={book.title}
              author={book.author}
              coverColors={book.coverColors}
              category={book.category}
              image={book.image}
              size="xl"
              className="shadow-2xl"
            />
            {book.version && (
              <span className="text-xs font-semibold text-gold-dark bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                {book.version}
              </span>
            )}
            <div className="flex gap-2 text-sm text-gray-500">
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors">
                <Heart size={15} />
                Favoritos
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <Share2 size={15} />
                Compartir
              </button>
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Category & badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Link
                href={`/libros?category=${book.categorySlug}`}
                className="text-xs font-semibold text-[#F97316] bg-amber-50 px-3 py-1 rounded-full border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                {book.category}
              </Link>
              {book.bestseller && (
                <span className="text-xs font-semibold text-white bg-[#F97316] px-3 py-1 rounded-full">
                  Bestseller
                </span>
              )}
              {book.newArrival && (
                <span className="text-xs font-semibold text-white bg-[#0C1F3F] px-3 py-1 rounded-full">
                  Novedad
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-[#0C1F3F] leading-tight mb-2">
              {book.title}
            </h1>
            <p className="text-lg text-gray-500 mb-4">{book.author}</p>

            <div className="mb-5">
              <StarRating rating={book.rating} reviewCount={book.reviewCount} size="md" />
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{book.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-[#0C1F3F]">{formatPrice(book.price)}</span>
              {book.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">{formatPrice(book.originalPrice)}</span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">
                    -{calculateDiscount(book.originalPrice, book.price)}%
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-5">
              <div className={`w-2 h-2 rounded-full ${book.stock > 5 ? 'bg-green-500' : book.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${book.stock > 5 ? 'text-green-700' : book.stock > 0 ? 'text-amber-700' : 'text-red-700'}`}>
                {book.stock > 5 ? 'En stock' : book.stock > 0 ? `Solo quedan ${book.stock} unidades` : 'Agotado'}
              </span>
            </div>

            {/* Quantity + Add */}
            <AddToCartBox book={book} />

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl mb-6">
              {[
                { icon: Truck, text: 'Envío en 24-48h', sub: 'Gratis desde RD$1,500' },
                { icon: RotateCcw, text: 'Devolución', sub: '30 días gratis' },
                { icon: Shield, text: 'Pago seguro', sub: 'SSL encriptado' },
              ].map((g) => (
                <div key={g.text} className="flex flex-col items-center text-center gap-1">
                  <g.icon size={18} className="text-[#F97316]" />
                  <span className="text-xs font-semibold text-gray-700">{g.text}</span>
                  <span className="text-[10px] text-gray-500">{g.sub}</span>
                </div>
              ))}
            </div>

            {/* Book details */}
            <div className="border-t border-gray-100 pt-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                Detalles del libro
              </h3>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {[
                  { icon: BookOpen, label: 'Editorial', value: book.publisher },
                  { icon: Calendar, label: 'Año', value: book.year > 0 ? book.year.toString() : `${Math.abs(book.year)} a.C.` },
                  { icon: Hash, label: 'Páginas', value: book.pages.toString() },
                  { icon: Globe, label: 'Idioma', value: book.language },
                  { label: 'ISBN', value: book.isbn },
                ].map((d) => (
                  <div key={d.label} className="flex flex-col">
                    <dt className="text-gray-400 text-xs">{d.label}</dt>
                    <dd className="text-gray-900 font-medium">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Long description */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6 lg:p-8">
          <h2 className="font-serif text-2xl font-bold text-[#0C1F3F] mb-4">Descripción</h2>
          <p className="text-gray-600 leading-relaxed text-base">{book.longDescription}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {book.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl font-bold text-[#0C1F3F]">
              Opiniones de clientes
            </h2>
            <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm px-4 py-2">
              <span className="text-2xl font-bold text-[#0C1F3F]">{book.rating}</span>
              <div>
                <StarRating rating={book.rating} showCount={false} />
                <p className="text-xs text-gray-400">{book.reviewCount.toLocaleString()} valoraciones</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {fakeReviews.map((review) => (
              <div key={review.name} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#0C1F3F] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} showCount={false} />
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-2xl font-bold text-[#0C1F3F]">
                También te puede gustar
              </h2>
              <Link
                href={`/libros?category=${book.categorySlug}`}
                className="text-sm text-[#F97316] font-medium hover:text-[#C2570F] flex items-center gap-1 transition-colors"
              >
                Ver más <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
