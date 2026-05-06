import type { ReactNode } from 'react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-2.5 w-2.5 animate-bounce rounded-full bg-red-600" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
};

type SectionHeaderProps = {
  title: string;
  children?: ReactNode;
};

export const SectionHeader = ({ title, children }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-lg font-black uppercase tracking-wider text-white">
        <span className="text-red-600">|</span> {title}
      </h2>
      {children}
    </div>
  );
};
