export const Loading = () => (
  <div className="flex items-center justify-center min-h-64">
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

type SectionHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export const SectionHeader = ({ title, children }: SectionHeaderProps) => (
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-black uppercase tracking-wider text-white">
      <span className="text-red-600">|</span> {title}
    </h1>
    {children}
  </div>
);
