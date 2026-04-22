import type { ReactNode } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

type LinkProps = {
  children: ReactNode;
  to: string;
  match?: string[];
};

export const Link = ({ children, to, match = [] }: LinkProps) => {
  const { pathname } = useLocation();
  const matched = match.some((pattern) => matchPath({ path: pattern, end: false }, pathname));

  return (
    <NavLink
      replace
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md transition-all duration-200 border ${
          isActive || matched
            ? 'bg-white text-gray-900 border-white shadow-lg scale-105'
            : 'bg-gray-700 text-gray-300 border-gray-700 hover:bg-gray-600 hover:text-white hover:border-gray-500'
        }`
      }
    >
      {children}
    </NavLink>
  );
};
