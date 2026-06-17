// Pure TypeScript types shared between server data-fetching (lib/books.ts) and client
// components. Keeping these in their own module (no imports) guarantees they can be
// imported from client components without pulling in the Supabase server client.

export type CategorySlug =
  | 'biblias'
  | 'devocionales'
  | 'guerra-espiritual'
  | 'finanzas'
  | 'crecimiento-personal'
  | 'combos'
  | 'ofertas'

export type BibliaSubcategory = 'damas' | 'varones' | 'juveniles' | 'infantiles' | 'pastorales' | 'estudio'
export type DevocionalSubcategory = 'damas' | 'varones'
export type Subcategory = BibliaSubcategory | DevocionalSubcategory

export interface Book {
  id: string
  /** Internal DB uuid, not exposed for routing — used to resolve combo book_ids */
  dbId?: string
  title: string
  author: string
  price: number
  originalPrice?: number
  /** Human-readable category label, kept for breadcrumbs/badges */
  category: string
  /** Machine taxonomy slug used for filtering */
  categorySlug: CategorySlug
  /** Optional subcategory, used for Biblias and Devocionales subsections */
  subcategory?: Subcategory
  /** Bible translation/version, e.g. "Reina Valera 1960", "NVI", "NTV" */
  version?: string
  /** Optional real product photo URL/path. Falls back to BookCover gradient when absent. */
  image?: string
  rating: number
  reviewCount: number
  description: string
  longDescription: string
  coverColors: string[]
  stock: number
  isbn: string
  publisher: string
  year: number
  pages: number
  language: string
  featured?: boolean
  newArrival?: boolean
  bestseller?: boolean
  tags: string[]
}

export interface Combo {
  id: string
  title: string
  slug: string
  /** Ids (slugs) of the books included, used to compute savings/look up summaries */
  bookIds: string[]
  price: number
  originalPrice: number
  image?: string
  /** Fallback gradient colors when no image is provided */
  coverColors?: string[]
  description: string
}
