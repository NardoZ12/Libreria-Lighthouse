export function formatPrice(price: number): string {
  return `RD$${Math.round(price).toLocaleString('es-DO')}`
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function calculateDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100)
}
