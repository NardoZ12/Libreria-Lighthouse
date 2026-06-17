import { getSessionFromCookies } from '@/lib/auth'

/** Verifies the request's session cookie belongs to a valid admin. Defense in depth for API routes. */
export async function requireAdminSession() {
  const session = await getSessionFromCookies()
  if (!session || !session.isAdmin) {
    return null
  }
  return session
}
