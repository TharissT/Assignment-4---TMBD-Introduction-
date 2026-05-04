import { Loading } from '@/components'
import { TV_ENDPOINT } from '@/core/constants'
import type { TrailersResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useParams } from 'react-router-dom'

export const TvTrailersView = () => {
  const { id } = useParams()
  const { data, loading } = useTmdb<TrailersResponse>(`${TV_ENDPOINT}/${id}/videos`, {}, [id])

  if (loading) return <Loading />
  if (!data) return null

  const trailers = data.results.filter((v) => v.site === 'YouTube' && v.type === 'Trailer')
  const others = data.results.filter((v) => v.site === 'YouTube' && v.type !== 'Trailer')
  const all = [...trailers, ...others]

  return (
    <section className="space-y-4 pb-6">
      {all.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {all.map((video) => (
            <div key={video.id} className="space-y-2">
              <div className="aspect-video overflow-hidden rounded border border-zinc-800">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allowFullScreen
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {video.type} · {video.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-zinc-600">No trailers available.</p>
      )}
    </section>
  )
}
