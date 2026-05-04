import { ButtonGroup, ImageGrid, Loading, Pagination, SectionHeader } from '@/components'
import { MOVIE_NOW_PLAYING, MOVIE_POPULAR, MOVIE_TOP_RATED, MOVIE_UPCOMING } from '@/core/constants'
import type { MoviesResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { label: 'Now Playing', value: 'now_playing', endpoint: MOVIE_NOW_PLAYING },
  { label: 'Popular', value: 'popular', endpoint: MOVIE_POPULAR },
  { label: 'Top Rated', value: 'top_rated', endpoint: MOVIE_TOP_RATED },
  { label: 'Upcoming', value: 'upcoming', endpoint: MOVIE_UPCOMING },
]

export const MoviesView = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState(CATEGORIES[0].value)
  const [page, setPage] = useState(1)

  const active = CATEGORIES.find((c) => c.value === category)!
  const { data, loading } = useTmdb<MoviesResponse>(active.endpoint, { page }, [page, category])

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.poster_path,
    primaryText: r.original_title ?? r.title ?? r.name ?? '',
  }))

  const handleCategoryChange = (val: string) => {
    setCategory(val)
    setPage(1)
  }

  return (
    <section className="space-y-6">
      <SectionHeader title="Movies">
        <ButtonGroup
          value={category}
          options={CATEGORIES.map((c) => ({ label: c.label, value: c.value }))}
          onClick={handleCategoryChange}
        />
      </SectionHeader>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}`)} />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </>
      )}
    </section>
  )
}
