'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, LogIn, LogOut, ShieldCheck, X } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

type Tab = 'login' | 'register'

export default function AuthMenu() {
  const { user, loading, login, register, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setName('')
    setError('')
  }

  const closeMenu = () => {
    setOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (tab === 'register' && password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setSubmitting(true)
    const result =
      tab === 'login' ? await login(email, password) : await register(email, password, name)
    setSubmitting(false)

    if (!result.ok) {
      setError(result.error ?? 'Ocurrió un error. Intenta de nuevo.')
      return
    }

    closeMenu()
    if (tab === 'login' && result.user?.isAdmin) {
      router.push('/admin')
    }
  }

  const handleLogout = async () => {
    await logout()
    setOpen(false)
  }

  if (loading) {
    return <div className="p-2 w-9 h-9" />
  }

  if (user) {
    return (
      <div className="relative" ref={containerRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gold hover:bg-orange-50 rounded-lg transition-colors"
        >
          <User size={20} />
          <span className="hidden sm:inline text-sm font-medium">{user.name || 'Mi cuenta'}</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name || user.email}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            {user.isAdmin && (
              <a
                href="/admin"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-gold transition-colors"
              >
                <ShieldCheck size={16} />
                Panel admin
              </a>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-gold transition-colors"
            >
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gold hover:bg-orange-50 rounded-lg transition-colors"
        aria-label="Iniciar sesión"
      >
        <LogIn size={20} />
        <span className="hidden sm:inline text-sm font-medium">Iniciar sesión</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-5 z-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setTab('login')
                  setError('')
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  tab === 'login' ? 'bg-[#0C1F3F] text-white' : 'text-gray-500'
                }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => {
                  setTab('register')
                  setError('')
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  tab === 'register' ? 'bg-[#0C1F3F] text-white' : 'text-gray-500'
                }`}
              >
                Registrarse
              </button>
            </div>
            <button onClick={closeMenu} className="text-gray-400 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === 'register' && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                required
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              minLength={tab === 'register' ? 8 : undefined}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
            />
            {tab === 'register' && (
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
                required
                minLength={8}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              />
            )}

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold hover:bg-gold-dark text-white py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60"
            >
              {submitting
                ? 'Procesando...'
                : tab === 'login'
                ? 'Iniciar sesión'
                : 'Crear cuenta'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
