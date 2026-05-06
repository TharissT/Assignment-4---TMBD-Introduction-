import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-sm border border-zinc-800 bg-zinc-950 shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-zinc-900/80 p-1.5 text-zinc-400 transition-colors hover:text-white"
        >
          <FiX size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};
