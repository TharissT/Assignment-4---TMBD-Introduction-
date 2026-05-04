import type { ChangeEvent } from 'react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
  return (
    <input
      type="search"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-5 py-3 text-sm text-white placeholder-zinc-500 transition-all duration-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600/50"
    />
  )
}
