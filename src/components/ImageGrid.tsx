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

export const ImageGrid = ({ results, onClick }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(180px,1fr))] gap-5">
      {results.map((result) => (
        <div
          key={result.id}
          className="block bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition"
          onClick={() => onClick?.(result.id)}
        >
          <img className="w-full h-[280px] object-cover" src={`${IMAGE_BASE_URL}${result.imagePath}`} alt={result.primaryText} />
          <div className="p-3 text-center">
            <p className="text-sm font-semibold truncate">{result.primaryText}</p>
            {result.secondaryText && <p className="text-gray-400 text-xs">{result.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
