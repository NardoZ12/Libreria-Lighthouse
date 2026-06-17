import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, ArrowLeft } from 'lucide-react'
import { getSessionFromCookies } from '@/lib/auth'
import AdminLogoutButton from '@/components/AdminLogoutButton'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromCookies()

  if (!session || !session.isAdmin) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <header className="bg-[#0C1F3F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <BookOpen size={18} className="text-gold" />
            </div>
            <span className="font-serif font-bold">
              Librería Lighthouse <span className="text-gold">— Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-blue-100/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={15} />
              Volver a la tienda
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  )
}
