import Link from 'next/link'
import { BookOpen, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center py-20">
      <div className="w-20 h-20 bg-[#0C1F3F] rounded-2xl flex items-center justify-center mx-auto mb-6">
        <BookOpen size={36} className="text-[#C8923A]" />
      </div>
      <h1 className="font-serif text-6xl font-bold text-[#0C1F3F] mb-3">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Página no encontrada</h2>
      <p className="text-gray-500 max-w-sm mb-8">
        Parece que este libro no está en nuestro catálogo... o quizás lo movimos de estantería.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#0C1F3F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a3a6b] transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
        <Link
          href="/libros"
          className="inline-flex items-center gap-2 border-2 border-[#C8923A] text-[#C8923A] px-6 py-3 rounded-xl font-semibold hover:bg-[#C8923A] hover:text-white transition-colors"
        >
          Explorar catálogo
        </Link>
      </div>
    </div>
  )
}
