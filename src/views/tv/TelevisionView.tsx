import { ButtonGroup, ImageGrid, Loading, Pagination, SectionHeader } from '@/components'
import { TV_CATEGORIES, TV_ENDPOINT } from '@/core/constants'
import type { MoviesResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const TelevisionView = () => {
  const navigate = useNavigate()
  const { category = 'airing_today' } = useParams()
  const [page, setPage] = useState(1)

  const { data, loading } = useTmdb<MoviesResponse>(
    `${TV_ENDPOINT}/${category}`,
    { page },
    [page, category],
  )

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.poster_path,
    primaryText: r.name ?? r.original_title ?? r.title ?? '',
  }))

  const handleCategoryChange = (val: string) => {
    navigate(`/television/${val}`)
    setPage(1)
  }

  const label = TV_CATEGORIES.find((c) => c.value === category)?.label ?? category

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <SectionHeader title={label}>
        <ButtonGroup
          value={category}
          options={TV_CATEGORIES}
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
              navigate(`/tv/${id}`)
            }}
          />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </div>
      )}
    </section>
  )
}
