import { Loading } from '@/components'
import { MOVIE_ENDPOINT } from '@/core/constants'
import type { TrailersResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useParams } from 'react-router-dom'

export const TrailersView = () => {
  const { id } = useParams()
  const { data, loading } = useTmdb<TrailersResponse>(`${MOVIE_ENDPOINT}/${id}/videos`, {}, [id])

  if (loading) { return <Loading /> }
  if (!data) { return null }

  const trailers = data.results.filter((v) => v.site === 'YouTube' && v.type === 'Trailer')
  const others = data.results.filter((v) => v.site === 'YouTube' && v.type !== 'Trailer')
  const all = [...trailers, ...others]

  return (
    <div className="py-4">
      {all.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {all.map((video) => (
            <div key={video.id} className="overflow-hidden rounded border border-zinc-800">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allowFullScreen
                />
              </div>
              <p className="p-2 text-xs text-zinc-500">
                {video.type} · {video.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-zinc-600">No trailers available.</p>
      )}
    </div>
  )
}
