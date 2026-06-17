'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <section className="py-16 bg-[#0C1F3F]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Únete a nuestra comunidad</p>
        <h2 className="font-serif text-3xl font-bold text-white mb-3">Suscríbete al boletín</h2>
        <p className="text-blue-200/60 mb-8">
          Recibe novedades literarias, reflexiones bíblicas, ofertas exclusivas y recomendaciones de lectura cada semana.
        </p>
        {subscribed ? (
          <div className="bg-green-500/20 border border-green-400/30 text-green-300 rounded-xl px-6 py-4 font-medium">
            ¡Gracias por suscribirte! Que Dios bendiga tu lectura.
          </div>
        ) : (
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-gold text-sm"
            />
            <button type="submit" className="bg-gold hover:bg-gold-dark text-white px-6 py-3.5 rounded-xl font-semibold transition-colors whitespace-nowrap">
              Suscribirme
            </button>
          </form>
        )}
        <p className="text-blue-200/40 text-xs mt-4">Sin spam. Cancela cuando quieras.</p>
      </div>
    </section>
  )
}
