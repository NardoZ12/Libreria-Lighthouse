import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { verifyPassword, createSessionToken, setSessionCookie } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const GENERIC_ERROR = 'Credenciales inválidas.'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!email || !password) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 })
    }

    const supabase = getSupabaseServerClient()
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, is_admin, password_hash')
      .eq('email', email)
      .maybeSingle()

    if (error) throw error
    if (!user) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 })
    }

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.is_admin,
    })
    await setSessionCookie(token)

    return NextResponse.json({
      user: { email: user.email, name: user.name, isAdmin: user.is_admin },
    })
  } catch (error) {
    console.error('POST /api/auth/login failed', error)
    return NextResponse.json({ error: 'No se pudo iniciar sesión.' }, { status: 500 })
  }
}
