import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Book, Combo, CategorySlug, Subcategory } from '@/lib/books-types'

export type {
  CategorySlug,
  BibliaSubcategory,
  DevocionalSubcategory,
  Subcategory,
  Book,
  Combo,
} from '@/lib/books-types'
export type { Category } from '@/lib/categories'
export { categories } from '@/lib/categories'

const CATEGORY_LABELS: Record<string, string> = {
  biblias: 'Biblias',
  devocionales: 'Devocionales',
  'guerra-espiritual': 'Guerra Espiritual',
  finanzas: 'Finanzas',
  'crecimiento-personal': 'Crecimiento Personal',
  combos: 'Combos',
  ofertas: 'Ofertas',
}

const COLOR_PALETTES: string[][] = [
  ['#0C1F3F', '#1e3a5f', '#3b82f6'],
  ['#7f1d1d', '#b91c1c', '#fca5a5'],
  ['#581c87', '#7e22ce', '#c084fc'],
  ['#14532d', '#15803d', '#4ade80'],
  ['#78350f', '#b45309', '#fbbf24'],
  ['#1e1b4b', '#312e81', '#818cf8'],
  ['#831843', '#be185d', '#f472b6'],
  ['#042f2e', '#0f766e', '#2dd4bf'],
]

/** Deterministically derive a gradient palette from a slug so cards without an image still look distinct. */
function colorsForSlug(slug: string): string[] {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  }
  return COLOR_PALETTES[hash % COLOR_PALETTES.length]
}

// Raw DB row shapes (snake_case)
interface BookRow {
  id: string
  slug: string
  title: string
  author: string
  category: string
  subcategory: string | null
  version: string | null
  description: string | null
  price: number
  original_price: number | null
  stock: number
  image: string | null
  rating: number | null
  reviews_count: number | null
  pages: number | null
  language: string | null
  isbn: string | null
  publisher: string | null
  featured: boolean | null
  bestseller: boolean | null
  new_arrival: boolean | null
  created_at?: string
  updated_at?: string
}

interface ComboRow {
  id: string
  slug: string
  title: string
  description: string | null
  price: number
  original_price: number | null
  image: string | null
  book_ids: string[]
  created_at?: string
  updated_at?: string
}

function mapBookRow(row: BookRow): Book {
  const categorySlug = row.category as CategorySlug
  return {
    id: row.slug,
    dbId: row.id,
    title: row.title,
    author: row.author,
    price: Number(row.price),
    originalPrice: row.original_price != null ? Number(row.original_price) : undefined,
    category: CATEGORY_LABELS[categorySlug] ?? row.category,
    categorySlug,
    subcategory: (row.subcategory as Subcategory) ?? undefined,
    version: row.version ?? undefined,
    image: row.image ?? undefined,
    rating: row.rating != null ? Number(row.rating) : 4.5,
    reviewCount: row.reviews_count ?? 0,
    description: row.description ?? '',
    longDescription: row.description ?? '',
    coverColors: colorsForSlug(row.slug),
    stock: row.stock ?? 0,
    isbn: row.isbn ?? '',
    publisher: row.publisher ?? '',
    year: row.created_at ? new Date(row.created_at).getFullYear() : new Date().getFullYear(),
    pages: row.pages ?? 0,
    language: row.language ?? 'Español',
    featured: row.featured ?? false,
    bestseller: row.bestseller ?? false,
    newArrival: row.new_arrival ?? false,
    tags: [row.category, row.subcategory, row.version].filter((t): t is string => Boolean(t)),
  }
}

function mapComboRow(row: ComboRow): Combo {
  return {
    id: row.slug,
    title: row.title,
    slug: row.slug,
    bookIds: row.book_ids ?? [],
    price: Number(row.price),
    originalPrice: row.original_price != null ? Number(row.original_price) : Number(row.price),
    image: row.image ?? undefined,
    coverColors: colorsForSlug(row.slug),
    description: row.description ?? '',
  }
}

const BOOK_COLUMNS =
  'id, slug, title, author, category, subcategory, version, description, price, original_price, stock, image, rating, reviews_count, pages, language, isbn, publisher, featured, bestseller, new_arrival, created_at, updated_at'

export async function getAllBooks(): Promise<Book[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('books').select(BOOK_COLUMNS)
  if (error) throw error
  return (data as BookRow[]).map(mapBookRow)
}

export async function getAllCombos(): Promise<Combo[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('combos').select('*')
  if (error) throw error
  return (data as ComboRow[]).map(mapComboRow)
}

export async function getCombos(): Promise<Combo[]> {
  return getAllCombos()
}

export async function getComboBooks(combo: Combo): Promise<Book[]> {
  if (!combo.bookIds.length) return []
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('books').select(BOOK_COLUMNS).in('id', combo.bookIds)
  if (error) throw error
  return (data as BookRow[]).map(mapBookRow)
}

export async function getBookById(id: string): Promise<Book | undefined> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('books').select(BOOK_COLUMNS).eq('slug', id).maybeSingle()
  if (error) throw error
  return data ? mapBookRow(data as BookRow) : undefined
}

export async function getFeaturedBooks(): Promise<Book[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('books').select(BOOK_COLUMNS).eq('featured', true)
  if (error) throw error
  return (data as BookRow[]).map(mapBookRow)
}

export async function getBestsellers(): Promise<Book[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('books').select(BOOK_COLUMNS).eq('bestseller', true)
  if (error) throw error
  return (data as BookRow[]).map(mapBookRow)
}

export async function getNewArrivals(): Promise<Book[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('books').select(BOOK_COLUMNS).eq('new_arrival', true)
  if (error) throw error
  return (data as BookRow[]).map(mapBookRow)
}

export async function getBooksByCategory(slug: CategorySlug): Promise<Book[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('books').select(BOOK_COLUMNS).eq('category', slug)
  if (error) throw error
  return (data as BookRow[]).map(mapBookRow)
}

export async function getBooksBySubcategory(slug: CategorySlug, subcategory: Subcategory): Promise<Book[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('books')
    .select(BOOK_COLUMNS)
    .eq('category', slug)
    .eq('subcategory', subcategory)
  if (error) throw error
  return (data as BookRow[]).map(mapBookRow)
}

export async function getOfertas(): Promise<Book[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('books').select(BOOK_COLUMNS).not('original_price', 'is', null)
  if (error) throw error
  return (data as BookRow[])
    .filter((row) => row.original_price != null && Number(row.original_price) > Number(row.price))
    .map(mapBookRow)
}

export async function getRelatedBooks(book: Book, count = 4): Promise<Book[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('books')
    .select(BOOK_COLUMNS)
    .eq('category', book.categorySlug)
    .neq('slug', book.id)
    .limit(count)
  if (error) throw error
  return (data as BookRow[]).map(mapBookRow)
}

export async function searchBooks(query: string): Promise<Book[]> {
  const supabase = getSupabaseServerClient()
  const q = `%${query}%`
  const { data, error } = await supabase
    .from('books')
    .select(BOOK_COLUMNS)
    .or(`title.ilike.${q},author.ilike.${q},category.ilike.${q}`)
  if (error) throw error
  return (data as BookRow[]).map(mapBookRow)
}
