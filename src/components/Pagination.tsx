import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type PaginationProps = {
  page: number
  maxPages: number
  onClick: (page: number) => void
}

export const Pagination = ({ page, maxPages, onClick }: PaginationProps) => {
  const capped = Math.min(maxPages, 500)

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => {
          onClick(page - 1)
        }}
        disabled={page <= 1}
        className="flex cursor-pointer items-center gap-1 rounded bg-zinc-800 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <FiChevronLeft size={16} />
        Prev
      </button>
      <span className="text-sm text-zinc-400">
        Page <span className="font-bold text-white">{page}</span> of{' '}
        <span className="font-bold text-white">{capped}</span>
      </span>
      <button
        onClick={() => {
          onClick(page + 1)
        }}
        disabled={page >= capped}
        className="flex cursor-pointer items-center gap-1 rounded bg-zinc-800 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Next
        <FiChevronRight size={16} />
      </button>
    </div>
  )
}
