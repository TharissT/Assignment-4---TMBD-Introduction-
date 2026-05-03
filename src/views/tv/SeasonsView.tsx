import { IMAGE_BASE_URL, TV_ENDPOINT } from '@/core/constants';
import type { SeasonsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { Loading } from '@/components';
import { useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);

  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <section className="pb-6 space-y-3">
      {data.seasons.length ? (
        data.seasons.map((season) => (
          <div
            key={season.id}
            onClick={() => navigate(`/tv/${id}/seasons/${season.season_number}`)}
            className="flex gap-4 bg-zinc-900 border border-zinc-800 rounded p-3 cursor-pointer hover:border-red-600/50 hover:bg-zinc-900/80 transition-all duration-200 group"
          >
            {season.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${season.poster_path}`}
                alt={season.name}
                className="w-14 h-20 object-cover rounded shrink-0"
              />
            ) : (
              <div className="w-14 h-20 bg-zinc-800 rounded shrink-0 flex items-center justify-center">
                <span className="text-zinc-600 text-xs">?</span>
              </div>
            )}
            <div className="flex-1 flex flex-col justify-center gap-1">
              <p className="font-bold text-white group-hover:text-red-400 transition-colors">{season.name}</p>
              <p className="text-zinc-500 text-xs">{season.episode_count} episodes</p>
              {season.overview && (
                <p className="text-zinc-600 text-xs line-clamp-2">{season.overview}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-zinc-600 text-center py-10">No seasons available.</p>
      )}
    </section>
  );
};
