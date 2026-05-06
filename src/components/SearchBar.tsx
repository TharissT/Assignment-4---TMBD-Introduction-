import type { ChangeEvent } from 'react'
import { FiSearch } from 'react-icons/fi'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
      <input
        type="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value)
        }}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3 pl-10 pr-5 text-sm text-white placeholder-zinc-500 transition-all duration-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600/50"
      />
    </div>
  )
}
