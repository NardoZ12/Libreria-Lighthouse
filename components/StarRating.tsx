import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md'
  showCount?: boolean
}

export default function StarRating({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
}: StarRatingProps) {
  const iconSize = size === 'sm' ? 12 : 16
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {stars.map((star) => {
          const filled = star <= Math.floor(rating)
          const partial = !filled && star <= rating + 0.5
          return (
            <span key={star} className="relative inline-block">
              <Star
                size={iconSize}
                className="text-gray-200"
                fill="currentColor"
              />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : '50%' }}
                >
                  <Star
                    size={iconSize}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                </span>
              )}
            </span>
          )
        })}
      </div>
      <span className={`font-semibold text-gray-700 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={`text-gray-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  )
}
