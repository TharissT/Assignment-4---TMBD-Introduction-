import { ButtonGroup, ImageGrid, Loading, Pagination, SectionHeader } from '@/components'
import { MOVIE_CATEGORIES, MOVIE_ENDPOINT } from '@/core/constants'
import type { MoviesResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const MoviesView = () => {
  const navigate = useNavigate()
  const { category = 'now_playing' } = useParams()
  const [page, setPage] = useState(1)

  const { data, loading } = useTmdb<MoviesResponse>(
    `${MOVIE_ENDPOINT}/${category}`,
    { page },
    [page, category],
  )

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.poster_path,
    primaryText: r.original_title ?? r.title ?? r.name ?? '',
  }))

  const handleCategoryChange = (val: string) => {
    navigate(`/movies/${val}`)
    setPage(1)
  }

  const label = MOVIE_CATEGORIES.find((c) => c.value === category)?.label ?? category

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <SectionHeader title={label}>
        <ButtonGroup
          value={category}
          options={MOVIE_CATEGORIES}
          onClick={handleCategoryChange}
        />
      </SectionHeader>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <ImageGrid
            results={gridData}
            onClick={(id) => {
              navigate(`/movie/${id}`)
            }}
          />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </div>
      )}
    </section>
  )
}
