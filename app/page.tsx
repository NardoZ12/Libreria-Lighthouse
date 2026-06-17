import {
  Truck, RotateCcw, Shield, Headphones,
  Star, Sparkles, Tag,
} from 'lucide-react'
import {
  getFeaturedBooks,
  getBooksBySubcategory,
  getBooksByCategory,
  getCombos,
  getOfertas,
  getComboBooks,
  type Book,
} from '@/lib/books'
import BookCard from '@/components/BookCard'
import ComboCard from '@/components/ComboCard'
import Carousel from '@/components/Carousel'
import HomeHero from '@/components/HomeHero'
import Newsletter from '@/components/Newsletter'

export const dynamic = 'force-dynamic'

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

function BookCarouselItem({ book }: { book: Book }) {
  return (
    <div data-carousel-item className="carousel-item flex-shrink-0 w-[170px] sm:w-[200px]">
      <BookCard book={book} />
    </div>
  )
}

export default async function HomePage() {
  const featured = await getFeaturedBooks()
  const combos = await getCombos()
  const ofertas = await getOfertas()
  const comboBooksMap = new Map(
    await Promise.all(combos.map(async (combo) => [combo.id, await getComboBooks(combo)] as const))
  )

  const bibliasDamas = await getBooksBySubcategory('biblias', 'damas')
  const bibliasVarones = await getBooksBySubcategory('biblias', 'varones')
  const bibliasJuveniles = await getBooksBySubcategory('biblias', 'juveniles')
  const bibliasInfantiles = await getBooksBySubcategory('biblias', 'infantiles')
  const bibliasPastorales = await getBooksBySubcategory('biblias', 'pastorales')
  const bibliasEstudio = await getBooksBySubcategory('biblias', 'estudio')

  const devocionalesDamas = await getBooksBySubcategory('devocionales', 'damas')
  const devocionalesVarones = await getBooksBySubcategory('devocionales', 'varones')

  const guerraEspiritual = await getBooksByCategory('guerra-espiritual')
  const finanzas = await getBooksByCategory('finanzas')
  const crecimientoPersonal = await getBooksByCategory('crecimiento-personal')

  return (
    <>
      <HomeHero featured={featured} />

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
              <ComboCard key={combo.id} combo={combo} books={comboBooksMap.get(combo.id) ?? []} />
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

      <Newsletter />
    </>
  )
}
