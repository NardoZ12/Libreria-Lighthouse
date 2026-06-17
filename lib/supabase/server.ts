import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the service role key.
 * Bypasses RLS — never import this into a client component or expose it to the browser bundle.
 * Use only in server components, route handlers, and server actions.
 */
let cachedClient: SupabaseClient | null = null

export function getSupabaseServerClient(): SupabaseClient {
  if (cachedClient) return cachedClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SECRET_KEY

  if (!url || !serviceKey) {
    throw new Error(
      'Missing Supabase server environment variables (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY).'
    )
  }

  cachedClient = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return cachedClient
}
