import { Loading } from '@/components'
import { IMAGE_BASE_URL, TV_ENDPOINT } from '@/core/constants'
import type { EpisodesResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { FiChevronLeft, FiStar } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams()
  const navigate = useNavigate()
  const { data, loading } = useTmdb<EpisodesResponse>(
    `${TV_ENDPOINT}/${id}/season/${seasonNumber}`,
    {},
    [id, seasonNumber],
  )

  if (loading) { return <Loading /> }
  if (!data) { return null }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <div className="space-y-4">
        <button
          onClick={() => {
            navigate(-1)
          }}
          className="flex cursor-pointer items-center gap-1 text-sm font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-white"
        >
          <FiChevronLeft size={16} />
          Back
        </button>
        <h2 className="flex items-center gap-2 text-lg font-black uppercase tracking-wider text-white">
          <span className="text-red-600">|</span> Season {seasonNumber} Episodes
        </h2>
      </div>
      <div className="space-y-3">
        {data.episodes.length ? (
          data.episodes.map((ep) => (
            <div
              key={ep.id}
              className="flex gap-4 rounded border border-zinc-800 bg-zinc-900 p-3 transition-all hover:border-red-600/40"
            >
              {ep.still_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${ep.still_path}`}
                  alt={ep.name}
                  className="h-20 w-32 shrink-0 rounded object-cover"
                />
              ) : (
                <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded bg-zinc-800">
                  <span className="text-xs text-zinc-600">No image</span>
                </div>
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-red-600">E{ep.episode_number}</span>
                  <p className="font-bold text-white">{ep.name}</p>
                  {ep.vote_average > 0 && (
                    <span className="ml-auto flex items-center gap-1 text-xs font-bold text-yellow-400">
                      <FiStar size={12} />
                      {ep.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
                {ep.air_date && <p className="text-xs text-zinc-600">{ep.air_date}</p>}
                {ep.overview && <p className="line-clamp-2 text-xs text-zinc-400">{ep.overview}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="py-10 text-center text-zinc-600">No episodes available.</p>
        )}
      </div>
    </div>
  )
}
