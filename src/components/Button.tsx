import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'grey';
  disabled?: boolean;
  onClick: () => void;
};

const baseStyles = 'inline-block px-12 py-4 rounded-full transition-all duration-300 font-black uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-95';

const variants = {
  primary: 'bg-red-600 hover:bg-red-500 text-white hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] border-t border-white/20',
  grey: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400',
};

export const Button = ({ children, variant = 'primary', disabled = false, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${baseStyles} ${disabled ? variants['grey'] : variants[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};