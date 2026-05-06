import { Link } from '@/components/Link'
import { useDebounce } from '@/hooks'
import { useEffect, useState } from 'react'
import { FiFilm, FiSearch, FiTrendingUp, FiTv, FiUser } from 'react-icons/fi'
import { MdOutlineCategory } from 'react-icons/md'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FILTERS = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV', value: 'tv' },
  { label: 'Person', value: 'person' },
]

export const Header = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filter, setFilter] = useState('movie')
  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}&filter=${filter}`)
    }
  }, [debouncedQuery, filter])

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        <Link to="/" className="text-lg font-black uppercase tracking-widest text-red-600 border-none!">
          Netflix
        </Link>
        <div className="flex items-center gap-5">
          <Link to="/movies">
            <span className="flex items-center gap-1.5">
              <FiFilm size={13} />
              Movies
            </span>
          </Link>
          <Link to="/television">
            <span className="flex items-center gap-1.5">
              <FiTv size={13} />
              TV
            </span>
          </Link>
          <Link to="/trending">
            <span className="flex items-center gap-1.5">
              <FiTrendingUp size={13} />
              Trending
            </span>
          </Link>
          <Link to="/genre">
            <span className="flex items-center gap-1.5">
              <MdOutlineCategory size={13} />
              Genre
            </span>
          </Link>
        </div>
        <div className="flex-1" />
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            placeholder="Search..."
            className="w-48 rounded-xl border border-zinc-700 bg-zinc-800/80 py-2 pl-9 pr-4 text-sm text-white placeholder-zinc-500 transition-all duration-200 focus:w-64 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600/50"
          />
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFilter(f.value)
              }}
              className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                filter === f.value
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {f.value === 'movie' && <FiFilm size={13} />}
              {f.value === 'tv' && <FiTv size={13} />}
              {f.value === 'person' && <FiUser size={13} />}
              {f.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
