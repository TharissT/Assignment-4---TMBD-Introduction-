import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

type LinkProps = {
  to: string
  children: ReactNode
  className?: string
}

export const Link = ({ to, children, className = '' }: LinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `border-b-2 px-1 py-0.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
          isActive ? 'border-red-600 text-white' : 'border-transparent text-zinc-400 hover:border-zinc-600 hover:text-white'
        } ${className}`
      }
    >
      {children}
    </NavLink>
  )
}
