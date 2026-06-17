import { getAllBooks } from '@/lib/books'
import AdminBooksTable from '@/components/admin/AdminBooksTable'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const books = await getAllBooks()

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-[#0C1F3F]">Catálogo de libros</h1>
        <p className="text-gray-500 text-sm mt-1">{books.length} libros en el catálogo</p>
      </div>
      <AdminBooksTable initialBooks={books} />
    </div>
  )
}
