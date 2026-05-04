import { ImageGrid, Loading, Pagination, SectionHeader } from '@/components'
import { SEARCH_MOVIE_ENDPOINT, SEARCH_PERSON_ENDPOINT, SEARCH_TV_ENDPOINT } from '@/core/constants'
import type { SearchResponse } from '@/core/types'
import { useDebounce, useTmdb } from '@/hooks'
import { useEffect, useState } from 'react'
import { FiFilm, FiSearch, FiTv, FiUser } from 'react-icons/fi'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FILTERS = [
  { label: 'Movies', value: 'movie', icon: <FiFilm size={14} />, endpoint: SEARCH_MOVIE_ENDPOINT },
  { label: 'TV', value: 'tv', icon: <FiTv size={14} />, endpoint: SEARCH_TV_ENDPOINT },
  { label: 'Person', value: 'person', icon: <FiUser size={14} />, endpoint: SEARCH_PERSON_ENDPOINT },
]

export const SearchView = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filter, setFilter] = useState('movie')
  const [page, setPage] = useState(1)
  const debouncedQuery = useDebounce(query, 400)

  const activeFilter = FILTERS.find((f) => f.value === filter)!

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery })
      setPage(1)
    }
  }, [debouncedQuery])

  const { data, loading } = useTmdb<SearchResponse>(
    debouncedQuery ? activeFilter.endpoint : '',
    { query: debouncedQuery, page },
    [debouncedQuery, page, filter],
  )

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.profile_path ?? r.poster_path ?? null,
    primaryText: r.name ?? r.title ?? r.original_title ?? 'Unknown',
  }))

  const handleClick = (id: number) => {
    if (filter === 'person') navigate(`/person/${id}`)
    else if (filter === 'tv') navigate(`/tv/${id}`)
    else navigate(`/movie/${id}`)
  }

  const handleFilterChange = (val: string) => {
    setFilter(val)
    setPage(1)
  }

  return (
    <section className="space-y-6">
      <SectionHeader title="Search" />

      {/* Search bar + filter pill buttons — matches teacher demo */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-xl flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3 pl-10 pr-5 text-sm text-white placeholder-zinc-500 transition-all duration-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600/50"
          />
        </div>

        <div className="flex items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                filter === f.value
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {!debouncedQuery ? (
        <p className="py-20 text-center text-sm text-zinc-600">Start typing to search movies, TV shows, and people...</p>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          {data && (
            <p className="text-sm text-zinc-500">
              Found <span className="font-bold text-white">{data.total_results}</span> results for{' '}
              <span className="font-bold text-red-400">"{debouncedQuery}"</span>
            </p>
          )}
          {gridData.length ? (
            <>
              <ImageGrid results={gridData} onClick={handleClick} />
              <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
            </>
          ) : (
            <p className="py-10 text-center text-zinc-600">No results found.</p>
          )}
        </>
      )}
    </section>
  )
}
