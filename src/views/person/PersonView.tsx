import { LinkGroup, Loading } from '@/components';
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from '@/core/constants';
import type { PersonResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <Loading />
    </div>
  );
  if (!data) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-screen-2xl mx-auto px-6 py-8 space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          ← Back
        </button>

        {/* Person header */}
        <div className="flex gap-8 items-start">
          {data.profile_path ? (
            <img
              src={`${IMAGE_BASE_URL}${data.profile_path}`}
              alt={data.name}
              className="w-48 rounded shadow-2xl border border-zinc-800 shrink-0"
            />
          ) : (
            <div className="w-48 h-64 bg-zinc-900 border border-zinc-800 rounded shrink-0 flex items-center justify-center">
              <span className="text-zinc-600 text-4xl">👤</span>
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white">{data.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
              {data.known_for_department && (
                <span className="bg-red-600/20 border border-red-600/40 text-red-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  {data.known_for_department}
                </span>
              )}
              {data.birthday && <span>Born: {data.birthday}</span>}
              {data.deathday && <span className="text-zinc-600">Died: {data.deathday}</span>}
              {data.place_of_birth && <span>📍 {data.place_of_birth}</span>}
            </div>
            {data.biography && (
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl line-clamp-4">
                {data.biography}
              </p>
            )}
          </div>
        </div>

        {/* Nested nav */}
        <LinkGroup
          links={[
            { label: 'Career', to: `/person/${id}/career` },
            { label: 'Images', to: `/person/${id}/images` },
          ]}
        />
        <Outlet />
      </div>
    </div>
  );
};
