import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Users, Award, Heart, Target, ChevronRight, BookMarked } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia y la misión de Librería Lighthouse, tu librería cristiana de confianza.',
}

const team = [
  { name: 'Elena Martínez', role: 'Fundadora y Directora', initials: 'EM', bio: 'Teóloga y amante de la Palabra. Fundó Lighthouse con la visión de poner libros que transforman en manos de cada familia.' },
  { name: 'Carlos Ruiz', role: 'Responsable de Compras', initials: 'CR', bio: 'Especialista en teología y literatura cristiana. Cuida cada título del catálogo con discernimiento y pasión.' },
  { name: 'Sofía Vega', role: 'Atención al Cliente', initials: 'SV', bio: 'Maestra de escuela dominical y experta en Biblias infantiles. Siempre con la recomendación perfecta para tu familia.' },
  { name: 'Pablo Ochoa', role: 'Tienda Online', initials: 'PO', bio: 'Apasionado de la apologética y la tecnología. Se encarga de que tu experiencia de compra sea fluida y segura.' },
]

const values = [
  { icon: BookMarked, title: 'La Palabra primero',    description: 'Toda nuestra selección está guiada por el deseo de que la Biblia y la literatura que la rodea llegue a más hogares.' },
  { icon: Users,      title: 'Comunidad',             description: 'Servimos a iglesias, pastores, familias y nuevos creyentes. Somos un puente entre los libros y las personas que los necesitan.' },
  { icon: Award,      title: 'Excelencia',            description: 'Trabajamos con las mejores editoriales evangélicas para garantizar calidad doctrinal y editorial en cada título.' },
  { icon: Heart,      title: 'Vocación de Servicio',  description: 'Más que un negocio, esto es un ministerio. Cada pedido es una oportunidad de servir al cuerpo de Cristo.' },
]

const milestones = [
  { year: '2019', title: 'Nuestros comienzos', description: 'Abrimos con 1.000 títulos desde la sala de nuestra casa en Madrid, con la visión de poner la Palabra al alcance de todos.' },
  { year: '2020', title: 'Tienda online',       description: 'Lanzamos nuestra web durante la pandemia y pudimos servir a iglesias y familias en toda España sin poder salir de casa.' },
  { year: '2022', title: '5.000 títulos',       description: 'Ampliamos el catálogo y comenzamos a enviar a toda Europa, sirviendo a la comunidad hispana en el extranjero.' },
  { year: '2024', title: '20.000 familias',     description: 'Alcanzamos a más de 20.000 familias y lanzamos el Club de Lectura Bíblica con guías mensuales para iglesias.' },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#0C1F3F] py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} className="w-full h-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-block bg-[#C8923A]/20 text-[#E8AC3A] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            Nuestra historia
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-5">
            Llevamos la Palabra a tu hogar
          </h1>
          <p className="text-blue-200/70 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Somos una librería cristiana nacida del amor por la Escritura y el deseo de servir al cuerpo de Cristo en España y el mundo hispano.
          </p>
          <p className="text-[#E8AC3A]/80 text-sm italic">
            «No solo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios.» — Mateo 4:4
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-[#C8923A] text-white py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '5.000+',  label: 'Títulos en catálogo' },
            { value: '20.000+', label: 'Familias servidas' },
            { value: '5 años',  label: 'De ministerio' },
            { value: '4.9★',    label: 'Valoración media' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold font-serif">{stat.value}</div>
              <div className="text-amber-100/80 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <h2 className="font-serif text-3xl font-bold text-[#0C1F3F]">Nuestra historia</h2>
          <p>
            Librería Lighthouse nació en 2019 de la convicción de que la Palabra de Dios transforma vidas — pero primero tiene que llegar a ellas. Elena Martínez, teóloga y madre de familia, comenzó seleccionando títulos desde casa con una simple pregunta: ¿qué libro necesita esta persona para crecer en su fe?
          </p>
          <p>
            Como un faro en la oscuridad, queremos ser esa guía que ayuda a cada creyente a encontrar el recurso que necesita: la Biblia de estudio perfecta para su iglesia, el devocional que leerá junto a sus hijos, la obra de teología que responderá sus preguntas más profundas. Somos más que una tienda — somos un ministerio.
          </p>
          <p>
            En 2020, la pandemia nos impulsó a lanzar nuestra tienda online y servir a familias que no podían salir de casa pero necesitaban la Palabra. Fue un tiempo difícil que Dios usó para multiplicar nuestro impacto. Hoy, con más de 20.000 familias servidas y envíos a toda Europa, seguimos fieles a nuestra visión original: que ninguna persona quede sin acceso a la Palabra de Dios por falta de recursos.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[#C8923A] text-sm font-semibold uppercase tracking-widest mb-2">Trayectoria</p>
            <h2 className="font-serif text-3xl font-bold text-[#0C1F3F]">Nuestra obra hasta hoy</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex gap-6 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-0`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-[#FAF7F2] rounded-2xl p-5 inline-block w-full">
                      <span className="text-[#C8923A] font-bold text-lg">{m.year}</span>
                      <h3 className="font-bold text-gray-900 text-lg mt-1">{m.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{m.description}</p>
                    </div>
                  </div>
                  <div className="relative flex-shrink-0 hidden md:flex items-start justify-center w-12">
                    <div className="w-4 h-4 rounded-full bg-[#C8923A] border-4 border-white shadow-md mt-5 z-10" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-[#C8923A] text-sm font-semibold uppercase tracking-widest mb-2">Lo que nos mueve</p>
          <h2 className="font-serif text-3xl font-bold text-[#0C1F3F]">Nuestros valores</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <v.icon size={22} className="text-[#C8923A]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[#C8923A] text-sm font-semibold uppercase tracking-widest mb-2">Personas</p>
            <h2 className="font-serif text-3xl font-bold text-[#0C1F3F]">El equipo</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#0C1F3F] flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-[#C8923A] text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0C1F3F] text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            ¿Buscas un libro para crecer en tu fe?
          </h2>
          <p className="text-blue-200/60 mb-8">
            Explora más de 5.000 títulos seleccionados con cuidado para tu vida espiritual.
          </p>
          <Link
            href="/libros"
            className="inline-flex items-center gap-2 bg-[#C8923A] hover:bg-[#E8AC3A] text-white px-8 py-4 rounded-xl font-bold text-base transition-colors"
          >
            Explorar catálogo
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
