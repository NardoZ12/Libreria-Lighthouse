import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { requireAdminSession } from '@/lib/admin-guard'
import { getAllBooks } from '@/lib/books'

export const dynamic = 'force-dynamic'

export async function GET() {
  const admin = await requireAdminSession()
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const books = await getAllBooks()
    return NextResponse.json({ books })
  } catch (error) {
    console.error('GET /api/admin/books failed', error)
    return NextResponse.json({ error: 'Error al cargar los libros.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminSession()
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const slug = typeof body.slug === 'string' && body.slug.trim()
      ? body.slug.trim()
      : String(body.title ?? '')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')

    if (!slug || !body.title || !body.author || !body.category) {
      return NextResponse.json(
        { error: 'Título, autor y categoría son obligatorios.' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from('books')
      .insert({
        slug,
        title: body.title,
        author: body.author,
        category: body.category,
        subcategory: body.subcategory || null,
        version: body.version || null,
        description: body.description || null,
        price: Number(body.price) || 0,
        original_price: body.originalPrice ? Number(body.originalPrice) : null,
        stock: Number(body.stock) || 0,
        image: body.image || null,
        rating: body.rating != null ? Number(body.rating) : 4.5,
        reviews_count: body.reviewCount != null ? Number(body.reviewCount) : 0,
        pages: body.pages != null ? Number(body.pages) : null,
        language: body.language || 'Español',
        isbn: body.isbn || null,
        publisher: body.publisher || null,
        featured: Boolean(body.featured),
        bestseller: Boolean(body.bestseller),
        new_arrival: Boolean(body.newArrival),
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ book: data })
  } catch (error) {
    console.error('POST /api/admin/books failed', error)
    return NextResponse.json({ error: 'No se pudo crear el libro.' }, { status: 500 })
  }
}
