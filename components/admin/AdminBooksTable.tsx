'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import type { Book } from '@/lib/books-types'
import { formatPrice } from '@/lib/utils'
import AdminBookForm from '@/components/admin/AdminBookForm'

interface AdminBooksTableProps {
  initialBooks: Book[]
}

export default function AdminBooksTable({ initialBooks }: AdminBooksTableProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [formOpen, setFormOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const refreshBooks = async () => {
    try {
      const res = await fetch('/api/admin/books', { cache: 'no-store' })
      if (!res.ok) return
      const data = await res.json()
      setBooks(data.books ?? [])
    } catch {
      // ignore refresh errors, keep existing list
    }
  }

  const openCreate = () => {
    setEditingBook(undefined)
    setFormOpen(true)
  }

  const openEdit = (book: Book) => {
    setEditingBook(book)
    setFormOpen(true)
  }

  const handleSaved = async () => {
    setFormOpen(false)
    setEditingBook(undefined)
    await refreshBooks()
  }

  const handleDelete = async (book: Book) => {
    if (!confirm(`¿Eliminar "${book.title}"? Esta acción no se puede deshacer.`)) return
    setError('')
    setDeletingId(book.id)
    try {
      const res = await fetch(`/api/admin/books/${book.id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'No se pudo eliminar el libro.')
        return
      }
      setBooks((prev) => prev.filter((b) => b.id !== book.id))
    } catch {
      setError('No se pudo eliminar el libro. Intenta de nuevo.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#F97316] hover:bg-[#C2570F] text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar libro
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Autor</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900 max-w-[260px] truncate">{book.title}</td>
                <td className="px-4 py-3 text-gray-600">{book.author}</td>
                <td className="px-4 py-3 text-gray-600">{book.category}</td>
                <td className="px-4 py-3 text-gray-900">{formatPrice(book.price)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      book.stock > 5
                        ? 'text-green-700'
                        : book.stock > 0
                          ? 'text-amber-700'
                          : 'text-red-700'
                    }
                  >
                    {book.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(book)}
                      className="p-2 text-gray-500 hover:text-[#0C1F3F] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(book)}
                      disabled={deletingId === book.id}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Eliminar"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No hay libros en el catálogo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <AdminBookForm
          book={editingBook}
          onClose={() => {
            setFormOpen(false)
            setEditingBook(undefined)
          }}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}
