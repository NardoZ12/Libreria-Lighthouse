import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { requireAdminSession } from '@/lib/admin-guard'

export const dynamic = 'force-dynamic'

// [id] here is the book's slug (the public-facing id used throughout the app).
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdminSession()
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const supabase = getSupabaseServerClient()

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (body.title !== undefined) updates.title = body.title
    if (body.author !== undefined) updates.author = body.author
    if (body.category !== undefined) updates.category = body.category
    if (body.subcategory !== undefined) updates.subcategory = body.subcategory || null
    if (body.version !== undefined) updates.version = body.version || null
    if (body.description !== undefined) updates.description = body.description
    if (body.price !== undefined) updates.price = Number(body.price)
    if (body.originalPrice !== undefined) {
      updates.original_price = body.originalPrice === null || body.originalPrice === '' ? null : Number(body.originalPrice)
    }
    if (body.stock !== undefined) updates.stock = Number(body.stock)
    if (body.image !== undefined) updates.image = body.image || null
    if (body.rating !== undefined) updates.rating = Number(body.rating)
    if (body.reviewCount !== undefined) updates.reviews_count = Number(body.reviewCount)
    if (body.pages !== undefined) updates.pages = Number(body.pages)
    if (body.language !== undefined) updates.language = body.language
    if (body.isbn !== undefined) updates.isbn = body.isbn
    if (body.publisher !== undefined) updates.publisher = body.publisher
    if (body.featured !== undefined) updates.featured = Boolean(body.featured)
    if (body.bestseller !== undefined) updates.bestseller = Boolean(body.bestseller)
    if (body.newArrival !== undefined) updates.new_arrival = Boolean(body.newArrival)

    const { data, error } = await supabase
      .from('books')
      .update(updates)
      .eq('slug', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ book: data })
  } catch (error) {
    console.error('PUT /api/admin/books/[id] failed', error)
    return NextResponse.json({ error: 'No se pudo actualizar el libro.' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdminSession()
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.from('books').delete().eq('slug', params.id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/admin/books/[id] failed', error)
    return NextResponse.json({ error: 'No se pudo eliminar el libro.' }, { status: 500 })
  }
}
