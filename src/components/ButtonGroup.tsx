type Option = { label: string; value: string }

type ButtonGroupProps = {
  value: string
  options: Option[]
  onClick: (value: string) => void
}

export const ButtonGroup = ({ value, options, onClick }: ButtonGroupProps) => {
  return (
    <div className="flex overflow-hidden rounded border border-zinc-700">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onClick(opt.value)}
          className={`cursor-pointer px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
            value === opt.value ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
