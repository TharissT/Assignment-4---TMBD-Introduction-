import type { ReactNode } from 'react'

export const Loading = () => (
  <div className="flex min-h-64 items-center justify-center">
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2.5 w-2.5 animate-bounce rounded-full bg-red-600"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
)

type SectionHeaderProps = {
  title: string
  children?: ReactNode
}

export const SectionHeader = ({ title, children }: SectionHeaderProps) => (
  <div className="mb-6 flex items-center justify-between">
    <h1 className="text-2xl font-black uppercase tracking-wider text-white">
      <span className="text-red-600">|</span> {title}
    </h1>
    {children}
  </div>
)
