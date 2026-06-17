'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search, ArrowRight, Truck, RotateCcw, Shield, Headphones,
  BookMarked, Star, Sparkles, Tag,
} from 'lucide-react'
import {
  getFeaturedBooks,
  getBooksBySubcategory,
  getBooksByCategory,
  getCombos,
  getOfertas,
} from '@/lib/books'
import BookCard from '@/components/BookCard'
import ComboCard from '@/components/ComboCard'
import BookCover from '@/components/BookCover'
import Carousel from '@/components/Carousel'

const testimonials = [
  {
    name: 'María García',
    location: 'Santo Domingo',
    text: 'Encontré la Biblia de estudio perfecta para mi grupo de célula. El envío fue rapidísimo y el embalaje excelente. Una bendición haber encontrado esta librería.',
    rating: 5,
    avatar: 'MG',
  },
  {
    name: 'Pastor Juan Pérez',
    location: 'Santiago de los Caballeros',
    text: 'La mejor selección de literatura cristiana en español que he visto online. Compro aquí todos los libros para el ministerio. Precios muy competitivos.',
    rating: 5,
    avatar: 'JP',
  },
  {
    name: 'Ana Rodríguez',
    location: 'Punta Cana',
    text: '"Jesús Llama" llegó al día siguiente. Un regalo precioso para mi hija. Que el Señor bendiga este ministerio de poner Su Palabra en manos de todos.',
    rating: 5,
    avatar: 'AR',
  },
]

function BookCarouselItem({ book }: { book: ReturnType<typeof getFeaturedBooks>[number] }) {
  return (
    <div data-carousel-item className="carousel-item flex-shrink-0 w-[170px] sm:w-[200px]">
      <BookCard book={book} />
    </div>
  )
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const router = useRouter()

  const featured = getFeaturedBooks()
  const combos = getCombos()
  const ofertas = getOfertas()

  const bibliasDamas = getBooksBySubcategory('biblias', 'damas')
  const bibliasVarones = getBooksBySubcategory('biblias', 'varones')
  const bibliasJuveniles = getBooksBySubcategory('biblias', 'juveniles')
  const bibliasInfantiles = getBooksBySubcategory('biblias', 'infantiles')
  const bibliasPastorales = getBooksBySubcategory('biblias', 'pastorales')
  const bibliasEstudio = getBooksBySubcategory('biblias', 'estudio')

  const devocionalesDamas = getBooksBySubcategory('devocionales', 'damas')
  const devocionalesVarones = getBooksBySubcategory('devocionales', 'varones')

  const guerraEspiritual = getBooksByCategory('guerra-espiritual')
  const finanzas = getBooksByCategory('finanzas')
  const crecimientoPersonal = getBooksByCategory('crecimiento-personal')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/libros?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#0C1F3F] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-800/20 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 bg-gold/20 text-gold-light text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                <BookMarked size={12} />
                Tu librería cristiana en República Dominicana
              </span>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                Libros que{' '}
                <span className="text-gold">alimentan</span>{' '}
                el alma
              </h1>
              <p className="text-blue-100/70 text-lg leading-relaxed mb-4">
                Biblias, devocionales, guerra espiritual, finanzas bíblicas y crecimiento personal para cada etapa de tu camino de fe. Más de 5.000 títulos disponibles.
              </p>
              <p className="text-gold-light/80 text-sm italic mb-8">
                «Tu palabra es lámpara a mis pies; es luz en mi sendero.» — Salmo 119:105
              </p>

              <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-md">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar Biblias, devocionales, autores..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold-dark text-white px-5 rounded-xl font-medium transition-colors flex-shrink-0"
                >
                  Buscar
                </button>
              </form>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#biblias"
                  className="inline-flex items-center gap-2 bg-white text-[#0C1F3F] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Ver Biblias
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/libros"
                  className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:border-white/50 hover:bg-white/5 transition-colors"
                >
                  Catálogo completo
                </Link>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-10 border-t border-white/10">
                {[
                  { value: '5.000+', label: 'Títulos' },
                  { value: '20.000+', label: 'Familias servidas' },
                  { value: '5 años', label: 'Sirviendo' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white font-serif">{stat.value}</div>
                    <div className="text-sm text-blue-200/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Book showcase */}
            <div className="hidden lg:flex justify-center items-center relative h-[420px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 bg-gold/15 rounded-full blur-3xl" />
              </div>
              {featured.slice(0, 3).map((book, i) => {
                const transforms = [
                  'rotate-[-8deg] translate-x-[-50px] translate-y-[20px] scale-[0.88] opacity-80',
                  'rotate-[4deg] translate-x-[30px] translate-y-[-10px] scale-[0.94] opacity-90',
                  'rotate-[-2deg] translate-x-[-10px] translate-y-[0px] scale-[1]',
                ]
                const zIndexes = ['z-10', 'z-20', 'z-30']
                return (
                  <div
                    key={book.id}
                    className={`absolute transform ${transforms[i]} ${zIndexes[i]} transition-all duration-300`}
                  >
                    <BookCover
                      title={book.title}
                      author={book.author}
                      coverColors={book.coverColors}
                      category={book.category}
                      image={book.image}
                      size="xl"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMO STRIP ── */}
      <div className="bg-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-center">
            <span className="flex items-center gap-2"><Truck size={15} />Envío gratis en pedidos +RD$1,500</span>
            <span className="hidden sm:block text-amber-200">•</span>
            <span className="flex items-center gap-2"><RotateCcw size={15} />Devolución gratuita 30 días</span>
            <span className="hidden sm:block text-amber-200">•</span>
            <span className="flex items-center gap-2"><Shield size={15} />Pago 100% seguro</span>
            <span className="hidden sm:block text-amber-200">•</span>
            <span className="flex items-center gap-2"><Headphones size={15} />Asesoramiento personalizado</span>
          </div>
        </div>
      </div>

      {/* ── BIBLIAS ── */}
      <section id="biblias" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-1">Explora</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#0C1F3F]">Biblias</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Encuentra la Biblia perfecta para cada miembro de tu familia y tu ministerio.
          </p>
        </div>

        <div className="space-y-10">
          <Carousel title="Damas">
            {bibliasDamas.map((book) => <BookCarouselItem key={book.id} book={book} />)}
          </Carousel>
          <Carousel title="Varones">
            {bibliasVarones.map((book) => <BookCarouselItem key={book.id} book={book} />)}
          </Carousel>
          <Carousel title="Juveniles">
            {bibliasJuveniles.map((book) => <BookCarouselItem key={book.id} book={book} />)}
          </Carousel>
          <Carousel title="Infantiles">
            {bibliasInfantiles.map((book) => <BookCarouselItem key={book.id} book={book} />)}
          </Carousel>
          <Carousel title="Pastorales">
            {bibliasPastorales.map((book) => <BookCarouselItem key={book.id} book={book} />)}
          </Carousel>
          <Carousel title="De Estudio">
            {bibliasEstudio.map((book) => <BookCarouselItem key={book.id} book={book} />)}
          </Carousel>
        </div>
      </section>

      {/* ── DEVOCIONALES ── */}
      <section id="devocionales" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-1">Reflexiones diarias</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#0C1F3F]">Devocionales</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Acompaña tu tiempo a solas con Dios con devocionales escritos para ti.
            </p>
          </div>

          <div className="space-y-10">
            <Carousel title="Damas">
              {devocionalesDamas.map((book) => <BookCarouselItem key={book.id} book={book} />)}
            </Carousel>
            <Carousel title="Varones">
              {devocionalesVarones.map((book) => <BookCarouselItem key={book.id} book={book} />)}
            </Carousel>
          </div>
        </div>
      </section>

      {/* ── GUERRA ESPIRITUAL ── */}
      <section id="guerra-espiritual" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <Carousel
          title="Guerra Espiritual"
          subtitle="Armas espirituales para la batalla diaria"
        >
          {guerraEspiritual.map((book) => <BookCarouselItem key={book.id} book={book} />)}
        </Carousel>
      </section>

      {/* ── FINANZAS ── */}
      <section id="finanzas" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Carousel
            title="Finanzas"
            subtitle="Sabiduría bíblica para administrar tus recursos"
          >
            {finanzas.map((book) => <BookCarouselItem key={book.id} book={book} />)}
          </Carousel>
        </div>
      </section>

      {/* ── CRECIMIENTO PERSONAL ── */}
      <section id="crecimiento-personal" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <Carousel
          title="Crecimiento Personal"
          subtitle="Transforma tu vida con la Palabra"
        >
          {crecimientoPersonal.map((book) => <BookCarouselItem key={book.id} book={book} />)}
        </Carousel>
      </section>

      {/* ── COMBOS ── */}
      <section id="combos" className="py-16 bg-gradient-to-br from-[#0C1F3F] to-[#16315c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold-light text-xs font-semibold px-3 py-1.5 rounded-full mb-3 uppercase tracking-widest">
              <Sparkles size={12} />
              Paquetes especiales
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">Combos</h2>
            <p className="text-blue-200/60 mt-2 max-w-2xl mx-auto">
              Ahorra más comprando paquetes pensados para tu familia y tu ministerio.
            </p>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide justify-center flex-wrap">
            {combos.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
          </div>
        </div>
      </section>

      {/* ── OFERTAS ── */}
      <section id="ofertas" className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-widest">
              <Tag size={12} />
              Descuentos por tiempo limitado
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#0C1F3F]">Ofertas</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Aprovecha estos precios especiales antes de que se agoten.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {ofertas.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">¿Por qué elegirnos?</p>
            <h2 className="font-serif text-3xl font-bold text-[#0C1F3F]">Sirviendo a tu fe con excelencia</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck,       title: 'Envío rápido',     description: 'Entrega en 24-48 h. Envío gratuito en pedidos superiores a RD$1,500. Ideal para iglesias y grupos.',  color: '#0C1F3F' },
              { icon: Shield,      title: 'Pago seguro',      description: 'Transacciones cifradas. Tarjetas de crédito y débito. Tu compra siempre protegida.',           color: '#059669' },
              { icon: RotateCcw,  title: 'Devolución fácil', description: 'Tienes 30 días para devolver cualquier libro sin preguntas. Tu satisfacción es nuestra prioridad.', color: '#F97316' },
              { icon: Headphones, title: 'Asesoramiento',     description: 'Nuestro equipo te ayuda a encontrar la Biblia o el libro que necesitas para ti, tu familia o iglesia.', color: '#7c3aed' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${feature.color}15` }}>
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">Testimonios</p>
            <h2 className="font-serif text-3xl font-bold text-[#0C1F3F]">Lo que dice nuestra comunidad</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#FAF7F2] rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0C1F3F] flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
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
    </>
  )
}
