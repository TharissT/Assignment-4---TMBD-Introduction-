import { IMAGE_BASE_URL } from '@/core/constants';

type ImageGridProps = {
  results: Array<{
    id: number;
    imagePath: string | null;
    primaryText: string;
    secondaryText?: string;
  }>;
  onClick?: (id: number) => void;
};

const Placeholder = ({ text }: { text: string }) => (
  <div className="w-full h-64 bg-zinc-900 flex items-center justify-center border border-zinc-800">
    <span className="text-zinc-600 text-xs text-center px-2">{text}</span>
  </div>
);

export const ImageGrid = ({ results, onClick }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
      {results.map((result) => (
        <div
          key={result.id}
          onClick={() => onClick?.(result.id)}
          className={`group bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 hover:border-red-600/60 transition-all duration-300 ${
            onClick ? 'cursor-pointer hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]' : ''
          }`}
        >
          {result.imagePath ? (
            <img
              className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300"
              src={`${IMAGE_BASE_URL}${result.imagePath}`}
              alt={result.primaryText}
            />
          ) : (
            <Placeholder text={result.primaryText} />
          )}
          <div className="p-2.5">
            <p className="text-sm font-semibold truncate text-white group-hover:text-red-400 transition-colors">{result.primaryText}</p>
            {result.secondaryText && (
              <p className="text-zinc-500 text-xs mt-0.5 truncate">{result.secondaryText}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
