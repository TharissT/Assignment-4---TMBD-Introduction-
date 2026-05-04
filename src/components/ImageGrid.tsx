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

const Placeholder = ({ text }: { text: string }) => (
  <div className="flex h-64 w-full items-center justify-center border border-zinc-800 bg-zinc-900">
    <span className="px-2 text-center text-xs text-zinc-600">{text}</span>
  </div>
)

export const ImageGrid = ({ results, onClick }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
      {results.map((result) => (
        <div
          key={result.id}
          onClick={() => onClick?.(result.id)}
          className={`group rounded-sm border border-zinc-800 bg-zinc-900 overflow-hidden transition-all duration-300 ${
            onClick ? 'cursor-pointer hover:scale-[1.03] hover:border-red-600/60 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]' : ''
          }`}
        >
          {result.imagePath ? (
            <img
              className="h-64 w-full object-cover transition-all duration-300 group-hover:brightness-75"
              src={`${IMAGE_BASE_URL}${result.imagePath}`}
              alt={result.primaryText}
            />
          ) : (
            <Placeholder text={result.primaryText} />
          )}
          <div className="p-2.5">
            <p className="truncate text-sm font-semibold text-white transition-colors group-hover:text-red-400">
              {result.primaryText}
            </p>
            {result.secondaryText && <p className="mt-0.5 truncate text-xs text-zinc-500">{result.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
