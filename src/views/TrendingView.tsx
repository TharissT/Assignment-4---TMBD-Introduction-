import { ButtonGroup, ImageGrid, Loading, Pagination, SectionHeader } from '@/components'
import type { MoviesResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const MEDIA = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
]

const INTERVALS = [
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
]

export const TrendingView = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const interval = searchParams.get('interval') || 'day'
  const media = searchParams.get('media') || 'movie'

  const { data, loading } = useTmdb<MoviesResponse>(
    `https://api.themoviedb.org/3/trending/${media}/${interval}`,
    { page },
    [page, interval, media],
  )

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.poster_path,
    primaryText: r.original_title ?? r.name ?? r.title ?? '',
  }))

  const update = (key: string, val: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set(key, val)
      return next
    })
    setPage(1)
  }

  return (
    <section className="space-y-6">
      <SectionHeader title="Trending">
        <div className="flex items-center gap-3">
          <ButtonGroup value={media} options={MEDIA} onClick={(v) => update('media', v)} />
          <ButtonGroup value={interval} options={INTERVALS} onClick={(v) => update('interval', v)} />
        </div>
      </SectionHeader>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ImageGrid results={gridData} onClick={(id) => navigate(media === 'tv' ? `/tv/${id}` : `/movie/${id}`)} />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </>
      )}
    </section>
  )
}
