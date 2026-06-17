import { NextRequest, NextResponse } from 'next/server'
import {
  getAllBooks,
  getBooksByCategory,
  getBooksBySubcategory,
  searchBooks,
  type Book,
  type CategorySlug,
  type Subcategory,
} from '@/lib/books'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as CategorySlug | null
    const subcategory = searchParams.get('subcategory') as Subcategory | null
    const q = searchParams.get('q')

    let books: Book[]

    if (q) {
      books = await searchBooks(q)
    } else if (category && subcategory) {
      books = await getBooksBySubcategory(category, subcategory)
    } else if (category) {
      books = await getBooksByCategory(category)
    } else {
      books = await getAllBooks()
    }

    return NextResponse.json({ books })
  } catch (error) {
    console.error('GET /api/books failed', error)
    return NextResponse.json({ error: 'Failed to load books' }, { status: 500 })
  }
}
