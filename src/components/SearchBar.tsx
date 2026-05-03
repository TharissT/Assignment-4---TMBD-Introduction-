import type { ChangeEvent } from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchBar = ({ value, onChange, placeholder = 'Search movies, shows, people...' }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3.5 rounded bg-zinc-900 border border-zinc-700
                   text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 
                   focus:ring-1 focus:ring-red-600/50 transition-all duration-200 text-sm"
      />
    </div>
  );
};
