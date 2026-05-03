import { Link } from '@/components/Link';
import { SearchBar } from '@/components/SearchBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-zinc-900 shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
      <nav className="max-w-screen-2xl mx-auto flex items-center gap-6 px-6 py-3">
        {/* Logo */}
        <Link to="/" className="!text-red-600 !text-2xl !font-black !tracking-tight !border-none !uppercase mr-2">
          Netflix
        </Link>

        {/* Primary Nav */}
        <div className="flex items-center gap-4 flex-1">
          <Link to="/movies">Movies</Link>
          <Link to="/television">TV Shows</Link>
          <Link to="/trending">Trending</Link>
          <Link to="/genre">Genre</Link>
        </div>

        {/* Search */}
        <div className="w-64">
          <SearchBar value={query} onChange={handleSearch} placeholder="Search..." />
        </div>
      </nav>
    </header>
  );
};
