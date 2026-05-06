import { IMAGE_BASE_URL } from '@/core/constants'

type ImageGridProps = {
  results: Array<{
    id: number
    imagePath: string | null
    primaryText: string
    secondaryText?: string
  }>
  onClick?: (id: number) => void
}

export const ImageGrid = ({ results, onClick }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {results.map((result) => (
        <div
          key={result.id}
          onClick={() => {
            if (onClick) {
              onClick(result.id)
            }
          }}
          className={`group overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 transition-all duration-300 ${
            onClick
              ? 'cursor-pointer hover:scale-[1.03] hover:border-red-600/60 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]'
              : ''
          }`}
        >
          {result.imagePath ? (
            <img
              className="h-64 w-full object-cover transition-all duration-300 group-hover:brightness-75"
              src={`${IMAGE_BASE_URL}${result.imagePath}`}
              alt={result.primaryText}
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center bg-zinc-800 text-xs text-zinc-600">
              {result.primaryText}
            </div>
          )}
          <div className="p-2">
            <p className="truncate text-xs font-bold text-white">{result.primaryText}</p>
            {result.secondaryText && (
              <p className="truncate text-xs text-zinc-500">{result.secondaryText}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
