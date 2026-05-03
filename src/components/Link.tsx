import { NavLink } from 'react-router-dom';

type LinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export const Link = ({ to, children, className = '' }: LinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-semibold uppercase tracking-wider transition-colors duration-200 px-1 py-0.5 border-b-2 ${
          isActive
            ? 'text-white border-red-600'
            : 'text-zinc-400 border-transparent hover:text-white hover:border-zinc-600'
        } ${className}`
      }
    >
      {children}
    </NavLink>
  );
};
