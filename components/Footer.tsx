import Link from 'next/link'
import { BookOpen, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0C1F3F] text-white">
      {/* Bible verse */}
      <div className="border-b border-white/10 py-4 text-center">
        <p className="text-[#E8AC3A] text-sm italic font-medium px-4">
          «Tu palabra es lámpara a mis pies; es luz en mi sendero.» — Salmo 119:105
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#C8923A] rounded-lg flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white">
                  Light<span className="text-[#C8923A]">house</span>
                </span>
                <span className="block text-[10px] text-gray-400 tracking-widest uppercase -mt-0.5">
                  Librería Cristiana
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Tu librería cristiana de confianza desde 2019. Biblias, devocionales, teología y literatura cristiana para toda la familia.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook,  href: '#', label: 'Facebook' },
                { icon: Youtube,   href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C8923A] flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/',                    label: 'Inicio' },
                { href: '/libros',              label: 'Catálogo' },
                { href: '/libros?filter=novedades', label: 'Novedades' },
                { href: '/libros?filter=ofertas',   label: 'Ofertas' },
                { href: '/nosotros',            label: 'Nosotros' },
                { href: '/contacto',            label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#C8923A] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Secciones</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/libros?category=biblias',      label: 'Biblias' },
                { href: '/libros?category=devocionales', label: 'Devocionales' },
                { href: '/libros?category=teologia',     label: 'Teología' },
                { href: '/libros?category=literatura',   label: 'Literatura Cristiana' },
                { href: '/libros?category=crecimiento',  label: 'Crecimiento Espiritual' },
                { href: '/libros?category=familia',      label: 'Familia y Matrimonio' },
                { href: '/libros?category=apologetica',  label: 'Apologética' },
                { href: '/libros?category=infantil',     label: 'Infantil y Juvenil' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#C8923A] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-[#C8923A] flex-shrink-0 mt-0.5" />
                <span>Calle Mayor 42, 28013 Madrid</span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone size={16} className="text-[#C8923A] flex-shrink-0 mt-0.5" />
                <a href="tel:+34912345678" className="text-gray-400 hover:text-white transition-colors">
                  +34 912 345 678
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail size={16} className="text-[#C8923A] flex-shrink-0 mt-0.5" />
                <a href="mailto:hola@librerialighthouse.es" className="text-gray-400 hover:text-white transition-colors">
                  hola@librerialighthouse.es
                </a>
              </li>
            </ul>
            <div className="mt-5 text-sm text-gray-400">
              <p className="font-medium text-gray-300 mb-1">Horario</p>
              <p>Lun–Vie: 9:00 – 20:00</p>
              <p>Sáb: 10:00 – 14:00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Librería Lighthouse. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Términos</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
