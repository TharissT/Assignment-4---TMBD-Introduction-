import { Loading } from '@/components';
import { IMAGE_BASE_URL, TV_ENDPOINT } from '@/core/constants';
import type { EpisodesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useTmdb<EpisodesResponse>(
    `${TV_ENDPOINT}/${id}/season/${seasonNumber}`,
    {},
    [id, seasonNumber]
  );

  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-screen-2xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-black uppercase tracking-wider">
            <span className="text-red-600">|</span> Season {seasonNumber} Episodes
          </h1>
        </div>

        <div className="space-y-3">
          {data.episodes.length ? (
            data.episodes.map((ep) => (
              <div
                key={ep.id}
                className="flex gap-4 bg-zinc-900 border border-zinc-800 rounded p-3 hover:border-red-600/40 transition-all"
              >
                {ep.still_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${ep.still_path}`}
                    alt={ep.name}
                    className="w-32 h-20 object-cover rounded shrink-0"
                  />
                ) : (
                  <div className="w-32 h-20 bg-zinc-800 rounded shrink-0 flex items-center justify-center">
                    <span className="text-zinc-600 text-xs">No image</span>
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-red-600 font-black text-sm">E{ep.episode_number}</span>
                    <p className="font-bold text-white">{ep.name}</p>
                    {ep.vote_average > 0 && (
                      <span className="text-yellow-400 text-xs font-bold ml-auto">⭐ {ep.vote_average.toFixed(1)}</span>
                    )}
                  </div>
                  {ep.air_date && <p className="text-zinc-600 text-xs">{ep.air_date}</p>}
                  {ep.overview && <p className="text-zinc-400 text-xs line-clamp-2">{ep.overview}</p>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-600 text-center py-10">No episodes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
