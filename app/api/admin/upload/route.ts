import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { requireAdminSession } from '@/lib/admin-guard'

export const dynamic = 'force-dynamic'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_BYTES = 5 * 1024 * 1024 // 5 MB

export async function POST(request: NextRequest) {
  const admin = await requireAdminSession()
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No se recibió ningún archivo.' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Formato no permitido. Usa JPG, PNG, WEBP o GIF.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'La imagen no debe superar 5 MB.' }, { status: 400 })
    }

    const extension = file.type.split('/')[1] ?? 'jpg'
    const path = `${crypto.randomUUID()}.${extension}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const supabase = getSupabaseServerClient()
    const { error: uploadError } = await supabase.storage
      .from('book-images')
      .upload(path, buffer, { contentType: file.type, upsert: false })

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from('book-images').getPublicUrl(path)

    return NextResponse.json({ url: data.publicUrl })
  } catch (error) {
    console.error('POST /api/admin/upload failed', error)
    return NextResponse.json({ error: 'No se pudo subir la imagen.' }, { status: 500 })
  }
}
