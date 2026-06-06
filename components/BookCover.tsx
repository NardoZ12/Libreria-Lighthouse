interface BookCoverProps {
  title: string
  author: string
  coverColors: string[]
  category?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'h-36 w-24',
  md: 'h-52 w-36',
  lg: 'h-72 w-48',
  xl: 'h-96 w-64',
}

export default function BookCover({
  title,
  author,
  coverColors,
  category,
  size = 'md',
  className = '',
}: BookCoverProps) {
  const [c1, c2, c3] = coverColors
  const gradient = `linear-gradient(150deg, ${c1} 0%, ${c2} 55%, ${c3 ?? c2} 100%)`

  return (
    <div
      className={`relative rounded-lg overflow-hidden flex-shrink-0 shadow-lg ${sizeClasses[size]} ${className}`}
      style={{ background: gradient }}
    >
      {/* Spine effect */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20" />

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="absolute inset-0 p-3 flex flex-col justify-between">
        {category && (
          <span className="text-white/70 text-[9px] font-semibold tracking-widest uppercase">
            {category}
          </span>
        )}
        <div className="mt-auto">
          <div className="w-8 h-0.5 bg-white/40 mb-2" />
          <p className="text-white font-bold leading-tight text-xs line-clamp-3 mb-1">{title}</p>
          <p className="text-white/60 text-[9px] leading-tight">{author}</p>
        </div>
      </div>

      {/* Gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    </div>
  )
}
