'use client'

import { useState, useRef } from 'react'
import { X, Upload, Loader2 } from 'lucide-react'
import type { Book, CategorySlug } from '@/lib/books-types'
import { categories } from '@/lib/categories'

const SUBCATEGORY_OPTIONS: Record<string, string[]> = {
  biblias: ['damas', 'varones', 'juveniles', 'infantiles', 'pastorales', 'estudio'],
  devocionales: ['damas', 'varones'],
}

export interface BookFormValues {
  title: string
  author: string
  category: CategorySlug | ''
  subcategory: string
  version: string
  description: string
  price: string
  originalPrice: string
  stock: string
  image: string
  isbn: string
  publisher: string
  pages: string
  language: string
  featured: boolean
  bestseller: boolean
  newArrival: boolean
}

const emptyForm: BookFormValues = {
  title: '',
  author: '',
  category: '',
  subcategory: '',
  version: '',
  description: '',
  price: '',
  originalPrice: '',
  stock: '',
  image: '',
  isbn: '',
  publisher: '',
  pages: '',
  language: 'Español',
  featured: false,
  bestseller: false,
  newArrival: false,
}

function bookToForm(book: Book): BookFormValues {
  return {
    title: book.title,
    author: book.author,
    category: book.categorySlug,
    subcategory: book.subcategory ?? '',
    version: book.version ?? '',
    description: book.description,
    price: String(book.price),
    originalPrice: book.originalPrice != null ? String(book.originalPrice) : '',
    stock: String(book.stock),
    image: book.image ?? '',
    isbn: book.isbn,
    publisher: book.publisher,
    pages: String(book.pages),
    language: book.language,
    featured: Boolean(book.featured),
    bestseller: Boolean(book.bestseller),
    newArrival: Boolean(book.newArrival),
  }
}

interface AdminBookFormProps {
  book?: Book
  onClose: () => void
  onSaved: () => void
}

export default function AdminBookForm({ book, onClose, onSaved }: AdminBookFormProps) {
  const [values, setValues] = useState<BookFormValues>(book ? bookToForm(book) : emptyForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const showSubcategory = values.category === 'biblias' || values.category === 'devocionales'

  const update = <K extends keyof BookFormValues>(key: K, value: BookFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error ?? 'No se pudo subir la imagen.')
        return
      }

      update('image', data.url)
    } catch {
      setError('No se pudo subir la imagen. Intenta de nuevo.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!values.title || !values.author || !values.category) {
      setError('Título, autor y categoría son obligatorios.')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        title: values.title,
        author: values.author,
        category: values.category,
        subcategory: showSubcategory ? values.subcategory || null : null,
        version: values.version || null,
        description: values.description,
        price: values.price,
        originalPrice: values.originalPrice || null,
        stock: values.stock,
        image: values.image || null,
        isbn: values.isbn,
        publisher: values.publisher,
        pages: values.pages,
        language: values.language,
        featured: values.featured,
        bestseller: values.bestseller,
        newArrival: values.newArrival,
      }

      const res = await fetch(book ? `/api/admin/books/${book.id}` : '/api/admin/books', {
        method: book ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'No se pudo guardar el libro.')
        setSubmitting(false)
        return
      }

      onSaved()
    } catch {
      setError('No se pudo guardar el libro. Intenta de nuevo.')
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="font-serif text-xl font-bold text-[#0C1F3F]">
            {book ? 'Editar libro' : 'Agregar libro'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500">Título *</label>
              <input
                value={values.title}
                onChange={(e) => update('title', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Autor *</label>
              <input
                value={values.author}
                onChange={(e) => update('author', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Categoría *</label>
              <select
                value={values.category}
                onChange={(e) => update('category', e.target.value as CategorySlug)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              >
                <option value="">Selecciona...</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {showSubcategory && (
              <div>
                <label className="text-xs font-semibold text-gray-500">Subcategoría</label>
                <select
                  value={values.subcategory}
                  onChange={(e) => update('subcategory', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
                >
                  <option value="">Ninguna</option>
                  {(SUBCATEGORY_OPTIONS[values.category] ?? []).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-500">Versión</label>
              <input
                value={values.version}
                onChange={(e) => update('version', e.target.value)}
                placeholder="RVR1960, NVI, NTV..."
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500">Foto del libro</label>
              <div className="flex items-start gap-3 mt-1">
                {values.image && (
                  <img
                    src={values.image}
                    alt="Vista previa"
                    className="w-16 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                  />
                )}
                <div className="flex-1 space-y-2">
                  <input
                    value={values.image}
                    onChange={(e) => update('image', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileChange}
                    className="hidden"
                    id="book-photo-upload"
                  />
                  <label
                    htmlFor="book-photo-upload"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploading ? 'Subiendo...' : 'Subir foto desde mi dispositivo'}
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500">Descripción</label>
              <textarea
                value={values.description}
                onChange={(e) => update('description', e.target.value)}
                rows={3}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Precio (RD$) *</label>
              <input
                type="number"
                step="0.01"
                value={values.price}
                onChange={(e) => update('price', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Precio original (RD$)</label>
              <input
                type="number"
                step="0.01"
                value={values.originalPrice}
                onChange={(e) => update('originalPrice', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Stock</label>
              <input
                type="number"
                value={values.stock}
                onChange={(e) => update('stock', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Páginas</label>
              <input
                type="number"
                value={values.pages}
                onChange={(e) => update('pages', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Idioma</label>
              <input
                value={values.language}
                onChange={(e) => update('language', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">ISBN</label>
              <input
                value={values.isbn}
                onChange={(e) => update('isbn', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Editorial</label>
              <input
                value={values.publisher}
                onChange={(e) => update('publisher', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="flex gap-5 pt-2">
            {[
              { key: 'featured' as const, label: 'Destacado' },
              { key: 'bestseller' as const, label: 'Bestseller' },
              { key: 'newArrival' as const, label: 'Novedad' },
            ].map((opt) => (
              <label key={opt.key} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={values[opt.key]}
                  onChange={(e) => update(opt.key, e.target.checked)}
                  className="accent-gold"
                />
                {opt.label}
              </label>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="px-5 py-2.5 bg-[#F97316] hover:bg-[#C2570F] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60"
            >
              {submitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
