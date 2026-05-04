import { Loading } from '@/components'
import { IMAGE_BASE_URL, TV_ENDPOINT } from '@/core/constants'
import type { SeasonsResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useNavigate, useParams } from 'react-router-dom'

export const SeasonsView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {}, [id])

  if (loading) return <Loading />
  if (!data) return null

  return (
    <section className="space-y-3 pb-6">
      {data.seasons.length ? (
        data.seasons.map((season) => (
          <div
            key={season.id}
            onClick={() => navigate(`/tv/${id}/seasons/${season.season_number}`)}
            className="group flex cursor-pointer gap-4 rounded border border-zinc-800 bg-zinc-900 p-3 transition-all duration-200 hover:border-red-600/50"
          >
            {season.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${season.poster_path}`}
                alt={season.name}
                className="h-20 w-14 shrink-0 rounded object-cover"
              />
            ) : (
              <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded bg-zinc-800">
                <span className="text-xs text-zinc-600">?</span>
              </div>
            )}
            <div className="flex flex-1 flex-col justify-center gap-1">
              <p className="font-bold text-white transition-colors group-hover:text-red-400">{season.name}</p>
              <p className="text-xs text-zinc-500">{season.episode_count} episodes</p>
              {season.overview && <p className="line-clamp-2 text-xs text-zinc-600">{season.overview}</p>}
            </div>
          </div>
        ))
      ) : (
        <p className="py-10 text-center text-zinc-600">No seasons available.</p>
      )}
    </section>
  )
}
