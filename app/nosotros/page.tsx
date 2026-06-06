import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Users, Award, Heart, Target, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia y el equipo detrás de Librería Lighthouse.',
}

const team = [
  { name: 'Elena Martínez', role: 'Fundadora y Directora', initials: 'EM', bio: 'Licenciada en Filología Hispánica con 15 años de experiencia en el mundo del libro.' },
  { name: 'Carlos Ruiz', role: 'Responsable de Compras', initials: 'CR', bio: 'Especialista en literatura latinoamericana y ciencia ficción. Lector empedernido.' },
  { name: 'Sofía Vega', role: 'Atención al Cliente', initials: 'SV', bio: 'Apasionada de la literatura infantil y juvenil. Siempre con una recomendación lista.' },
  { name: 'Pablo Ochoa', role: 'Gestión de Tienda Online', initials: 'PO', bio: 'Tecnólogo y amante de los libros de ciencia y tecnología.' },
]

const values = [
  { icon: BookOpen, title: 'Pasión por la lectura', description: 'Creemos que cada libro tiene el poder de cambiar una vida. Por eso seleccionamos cuidadosamente cada título.' },
  { icon: Users, title: 'Comunidad', description: 'Somos más que una librería: somos un punto de encuentro para lectores de todos los gustos y edades.' },
  { icon: Award, title: 'Calidad', description: 'Trabajamos con las mejores editoriales para garantizar que cada libro que recibes está en perfectas condiciones.' },
  { icon: Heart, title: 'Compromiso', description: 'Nuestro equipo de libreros está disponible para ayudarte a encontrar tu próxima lectura perfecta.' },
]

const milestones = [
  { year: '2019', title: 'Fundación', description: 'Abrimos nuestra primera tienda física en el centro de Madrid con 2.000 títulos.' },
  { year: '2020', title: 'Tienda online', description: 'Lanzamos nuestra web y llegamos a toda España durante la pandemia.' },
  { year: '2022', title: '10.000 títulos', description: 'Ampliamos nuestro catálogo y comenzamos a enviar a toda Europa.' },
  { year: '2024', title: '50.000 clientes', description: 'Alcanzamos los 50.000 clientes satisfechos y lanzamos el club de lectura.' },
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
            Somos Librería Lighthouse
          </h1>
          <p className="text-blue-200/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Desde 2019 somos tu librería de confianza en Madrid y online. Cinco años dedicados a conectar lectores con los libros que cambiarán sus vidas.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-[#C8923A] text-white py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10.000+', label: 'Títulos en catálogo' },
            { value: '50.000+', label: 'Clientes satisfechos' },
            { value: '5 años', label: 'De experiencia' },
            { value: '4.8★', label: 'Valoración media' },
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
        <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
          <h2 className="font-serif text-3xl font-bold text-[#0C1F3F] not-prose">Nuestra historia</h2>
          <p>
            Lighthouse nació en 2019 de la mano de Elena Martínez, una apasionada de la literatura que soñaba con crear un espacio donde los libros fueran los protagonistas. Con una pequeña selección de 2.000 títulos y un local en el centro de Madrid, comenzamos a construir algo especial.
          </p>
          <p>
            Como un faro en la oscuridad, queremos ser esa guía que ayuda a los lectores a encontrar el libro que necesitan. Ese que les hará reflexionar, soñar, aprender o simplemente desconectar del mundo por unas horas.
          </p>
          <p>
            En 2020, la pandemia nos impulsó a lanzar nuestra tienda online y llevar los libros a todos los rincones de España. Fue un reto que superamos gracias a una comunidad de lectores que nos apoyó desde el primer día. Hoy, con más de 50.000 clientes satisfechos, seguimos fieles a nuestra misión original: acercar los mejores libros a las manos correctas.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[#C8923A] text-sm font-semibold uppercase tracking-widest mb-2">Trayectoria</p>
            <h2 className="font-serif text-3xl font-bold text-[#0C1F3F]">Nuestro camino</h2>
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
            <h2 className="font-serif text-3xl font-bold text-[#0C1F3F]">Nuestro equipo</h2>
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
            ¿Listo para encontrar tu próximo libro?
          </h2>
          <p className="text-blue-200/60 mb-8">
            Explora más de 10.000 títulos en nuestro catálogo online.
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
