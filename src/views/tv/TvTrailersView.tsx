import { Loading } from '@/components';
import { TV_ENDPOINT } from '@/core/constants';
import type { TrailersResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const TvTrailersView = () => {
  const { id } = useParams();
  const { data, loading } = useTmdb<TrailersResponse>(`${TV_ENDPOINT}/${id}/videos`, {}, [id]);

  if (loading) return <Loading />;
  if (!data) return null;

  const trailers = data.results.filter((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const others = data.results.filter((v) => v.site === 'YouTube' && v.type !== 'Trailer');
  const all = [...trailers, ...others];

  return (
    <section className="pb-6 space-y-4">
      {all.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {all.map((video) => (
            <div key={video.id} className="space-y-2">
              <div className="aspect-video rounded overflow-hidden border border-zinc-800">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allowFullScreen
                />
              </div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                {video.type} · {video.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-600 text-center py-10">No trailers available.</p>
      )}
    </section>
  );
};
