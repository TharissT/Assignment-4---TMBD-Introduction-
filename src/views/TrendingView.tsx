import { ButtonGroup, ImageGrid, Loading, Pagination, SectionHeader } from '@/components'
import { TRENDING_ENDPOINT } from '@/core/constants'
import type { TrendingResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useState } from 'react'
import { FiFilm, FiTv } from 'react-icons/fi'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const MEDIA_TYPES = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
]

const INTERVALS = [
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
]

export const TrendingView = () => {
  const navigate = useNavigate()
  const { mediaType = 'movie' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const interval = searchParams.get('interval') ?? 'day'
  const [page, setPage] = useState(1)

  const { data, loading } = useTmdb<TrendingResponse>(
    `${TRENDING_ENDPOINT}/${mediaType}/${interval}`,
    { page },
    [mediaType, interval, page],
  )

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.poster_path,
    primaryText: r.title ?? r.name ?? r.original_title ?? '',
  }))

  const handleMediaChange = (val: string) => {
    navigate(`/trending/${val}?interval=${interval}`)
    setPage(1)
  }

  const handleIntervalChange = (val: string) => {
    setSearchParams({ interval: val })
    setPage(1)
  }

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <SectionHeader title="Trending">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
            {mediaType === 'movie' ? <FiFilm size={13} /> : <FiTv size={13} />}
          </div>
          <ButtonGroup value={mediaType} options={MEDIA_TYPES} onClick={handleMediaChange} />
          <ButtonGroup value={interval} options={INTERVALS} onClick={handleIntervalChange} />
        </div>
      </SectionHeader>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <ImageGrid
            results={gridData}
            onClick={(id) => {
              if (mediaType === 'tv') {
                navigate(`/tv/${id}`)
              } else {
                navigate(`/movie/${id}`)
              }
            }}
          />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </div>
      )}
    </section>
  )
}
