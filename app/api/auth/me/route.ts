import { NextResponse } from 'next/server'
import { getSessionFromCookies } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getSessionFromCookies()
  if (!session) {
    return NextResponse.json({ user: null })
  }
  return NextResponse.json({
    user: { email: session.email, name: session.name, isAdmin: session.isAdmin },
  })
}
