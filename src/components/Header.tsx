import { Link } from '@/components/Link'
import { useState } from 'react'
import { FiFilm, FiSearch, FiTrendingUp, FiTv } from 'react-icons/fi'
import { MdOutlineCategory } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    if (val.trim()) navigate(`/search?q=${encodeURIComponent(val.trim())}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black/95 shadow-[0_2px_20px_rgba(0,0,0,0.8)] backdrop-blur">
      <nav className="mx-auto flex max-w-screen-2xl items-center gap-6 px-6 py-3">
        <Link to="/" className="border-none! text-2xl! font-black! tracking-tight! text-red-600!">
          NETFLIX
        </Link>

        <div className="flex flex-1 items-center gap-5">
          <Link to="/movies">
            <span className="flex items-center gap-1.5">
              <FiFilm size={14} />
              Movies
            </span>
          </Link>
          <Link to="/television">
            <span className="flex items-center gap-1.5">
              <FiTv size={14} />
              TV Shows
            </span>
          </Link>
          <Link to="/trending">
            <span className="flex items-center gap-1.5">
              <FiTrendingUp size={14} />
              Trending
            </span>
          </Link>
          <Link to="/genre">
            <span className="flex items-center gap-1.5">
              <MdOutlineCategory size={14} />
              Genre
            </span>
          </Link>
        </div>

        <div className="relative w-56">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-2.5 pl-9 pr-4 text-sm text-white placeholder-zinc-500 transition-all duration-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600/50"
          />
        </div>
      </nav>
    </header>
  )
}
