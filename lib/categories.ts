// Static category metadata (UI-only, not DB-backed). Lives in its own module so client
// components can import it without pulling in the Supabase server client from lib/books.ts.
import type { CategorySlug } from '@/lib/books-types'

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  color: string
  lightColor: string
  count: number
}

export const categories: Category[] = [
  { slug: 'biblias', name: 'Biblias', description: 'Todas las versiones y ediciones', color: '#dc2626', lightColor: '#fee2e2', count: 0 },
  { slug: 'devocionales', name: 'Devocionales', description: 'Reflexiones diarias para tu fe', color: '#f97316', lightColor: '#ffedd5', count: 0 },
  { slug: 'guerra-espiritual', name: 'Guerra Espiritual', description: 'Armas espirituales para la batalla diaria', color: '#7c3aed', lightColor: '#ede9fe', count: 0 },
  { slug: 'finanzas', name: 'Finanzas', description: 'Sabiduría bíblica para tus finanzas', color: '#059669', lightColor: '#dcfce7', count: 0 },
  { slug: 'crecimiento-personal', name: 'Crecimiento Personal', description: 'Transforma tu vida con la Palabra', color: '#0891b2', lightColor: '#e0f2fe', count: 0 },
  { slug: 'combos', name: 'Combos', description: 'Paquetes especiales con grandes ahorros', color: '#0C1F3F', lightColor: '#e8edf5', count: 0 },
  { slug: 'ofertas', name: 'Ofertas', description: 'Descuentos por tiempo limitado', color: '#ea580c', lightColor: '#ffedd5', count: 0 },
]
