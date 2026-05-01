// @/views/movies/TrailersView.tsx
import { ImageGrid } from '@/components';
import { MOVIE_ENDPOINT } from '@/core/constants';
import type { MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();

  if (!id) {
    return <p className="text-center text-gray-400">Movie ID not found.</p>;
  }

  const { data } = useTmdb<MovieRepsonse>(`${MOVIE_ENDPOINT}/${id}`, {}, [] as any);
  const gridData = (data?.videos?.results ?? [])
    .filter((v) => v.type === 'Trailer')
    .map((result) => ({
      id: result.id,
      imagePath: `https://img.youtube.com/vi/${result.key}/hqdefault.jpg`,
      primaryText: result.name,
      secondaryText: result.site,
    }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="text-2xl font-bold mb-6">Trailers</h2>

      {gridData.length > 0 ? (
        <ImageGrid results={gridData} />
      ) : (
        <p className="text-gray-400 text-center">No trailers available.</p>
      )}
    </section>
  );
};
