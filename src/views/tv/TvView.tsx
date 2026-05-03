import { LinkGroup, Loading, Modal } from '@/components';
import { IMAGE_BASE_URL, ORIGINAL_IMAGE_BASE_URL, TV_ENDPOINT } from '@/core/constants';
import type { MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const TvView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useTmdb<MovieRepsonse>(`${TV_ENDPOINT}/${id}`, {}, [id]);

  if (loading) return <Modal onClose={() => navigate(-1)}><Loading /></Modal>;
  if (!data) return null;

  const title = data.name ?? data.title ?? 'Unknown';
  const date = data.first_air_date ?? '';
  const year = date ? new Date(date).getFullYear() : '';
  const score = typeof data.vote_average === 'number' ? data.vote_average.toFixed(1) : '—';

  return (
    <Modal onClose={() => navigate(-1)}>
      {data.backdrop_path && (
        <div className="relative h-56 overflow-hidden">
          <img
            src={`${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path}`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
      )}

      <div className="flex gap-6 p-6 -mt-20 relative">
        {data.poster_path && (
          <img
            src={`${IMAGE_BASE_URL}${data.poster_path}`}
            alt={title}
            className="w-36 shrink-0 rounded shadow-2xl border border-zinc-800"
          />
        )}
        <div className="flex-1 pt-20 space-y-3">
          <h2 className="text-3xl font-black text-white">{title}</h2>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            {year && <span>{year}</span>}
            {data.number_of_seasons && (
              <span>{data.number_of_seasons} Season{data.number_of_seasons > 1 ? 's' : ''}</span>
            )}
            <span className="flex items-center gap-1 text-yellow-400 font-bold">⭐ {score}</span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">{data.overview}</p>
        </div>
      </div>

      <div className="px-6">
        <LinkGroup
          links={[
            { label: 'Credits', to: `/tv/${id}/credits` },
            { label: 'Trailers', to: `/tv/${id}/trailers` },
            { label: 'Reviews', to: `/tv/${id}/reviews` },
            { label: 'Seasons', to: `/tv/${id}/seasons` },
          ]}
        />
        <Outlet />
      </div>
    </Modal>
  );
};
