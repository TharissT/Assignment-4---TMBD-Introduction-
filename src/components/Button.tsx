import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  className?: string
}

export const Button = ({ children, onClick, variant = 'primary', disabled, className = '' }: ButtonProps) => {
  const base =
    'cursor-pointer transition-all duration-200 font-semibold uppercase tracking-wider text-sm disabled:opacity-40 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 rounded border border-zinc-700',
    ghost: 'text-zinc-400 hover:text-white px-4 py-2',
  }

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
