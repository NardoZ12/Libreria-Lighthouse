import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Librería Lighthouse – Tu librería online de confianza',
    template: '%s | Librería Lighthouse',
  },
  description:
    'Descubre más de 10.000 títulos en todos los géneros. Literatura, ciencia, historia, negocios y mucho más. Envío rápido y devoluciones fáciles.',
  keywords: 'librería online, comprar libros, libros en español, novelas, ciencia',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
