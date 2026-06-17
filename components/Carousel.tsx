'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export default function Carousel({ title, subtitle, children, className = '' }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-carousel-item]')
    const cardWidth = card ? card.getBoundingClientRect().width + 16 : 260
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' })
  }

  return (
    <div className={className}>
      <div className="flex items-end justify-between mb-4 gap-3">
        <div>
          <h3 className="font-serif text-xl lg:text-2xl font-bold text-navy">{title}</h3>
          {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
        </div>
        <div className="hidden sm:flex gap-2 flex-shrink-0">
          <button
            onClick={() => scrollByAmount('left')}
            aria-label="Anterior"
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gold hover:border-gold transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollByAmount('right')}
            aria-label="Siguiente"
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gold hover:border-gold transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </div>
    </div>
  )
}
