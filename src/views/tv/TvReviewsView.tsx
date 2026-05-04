import { Loading, Pagination } from '@/components'
import { TV_ENDPOINT } from '@/core/constants'
import type { ReviewsResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const TvReviewsView = () => {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const { data, loading } = useTmdb<ReviewsResponse>(`${TV_ENDPOINT}/${id}/reviews`, { page }, [id, page])

  if (loading) return <Loading />
  if (!data) return null

  return (
    <section className="space-y-4 pb-6">
      {data.results.length ? (
        <>
          {data.results.map((review) => (
            <div key={review.id} className="space-y-2 rounded border border-zinc-800 bg-zinc-900 p-4">
              <div className="flex items-center justify-between">
                <p className="font-bold text-white">{review.author}</p>
                <p className="text-xs text-zinc-600">
                  {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
                </p>
              </div>
              <p className="line-clamp-5 text-sm leading-relaxed text-zinc-400">{review.content}</p>
            </div>
          ))}
          <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
        </>
      ) : (
        <p className="py-10 text-center text-zinc-600">No reviews available.</p>
      )}
    </section>
  )
}
