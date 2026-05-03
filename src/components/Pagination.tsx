type PaginationProps = {
  page: number;
  maxPages: number;
  onClick: (page: number) => void;
};

export const Pagination = ({ page, maxPages, onClick }: PaginationProps) => {
  const capped = Math.min(maxPages, 500);

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <button
        onClick={() => onClick(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 bg-zinc-800 text-white rounded text-sm font-semibold hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
      >
        ← Prev
      </button>

      <span className="text-zinc-400 text-sm">
        Page <span className="text-white font-bold">{page}</span> of{' '}
        <span className="text-white font-bold">{capped}</span>
      </span>

      <button
        onClick={() => onClick(page + 1)}
        disabled={page >= capped}
        className="px-4 py-2 bg-zinc-800 text-white rounded text-sm font-semibold hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
      >
        Next →
      </button>
    </div>
  );
};
