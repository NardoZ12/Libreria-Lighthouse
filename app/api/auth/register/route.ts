import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { hashPassword, createSessionToken, setSessionCookie } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    const name = typeof body.name === 'string' ? body.name.trim() : ''

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Correo electrónico no válido.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres.' }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()

    const { data: existing, error: lookupError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (lookupError) throw lookupError
    if (existing) {
      return NextResponse.json({ error: 'Este correo ya está registrado.' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)

    const { data: created, error: insertError } = await supabase
      .from('users')
      .insert({ email, password_hash: passwordHash, name, is_admin: false })
      .select('id, email, name, is_admin')
      .single()

    if (insertError) throw insertError

    const token = await createSessionToken({
      sub: created.id,
      email: created.email,
      name: created.name,
      isAdmin: created.is_admin,
    })
    await setSessionCookie(token)

    return NextResponse.json({
      user: { email: created.email, name: created.name, isAdmin: created.is_admin },
    })
  } catch (error) {
    console.error('POST /api/auth/register failed', error)
    return NextResponse.json({ error: 'No se pudo completar el registro.' }, { status: 500 })
  }
}
