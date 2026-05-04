import { ImageGrid, Loading, Pagination, SectionHeader } from '@/components'
import { SEARCH_MOVIE_ENDPOINT, SEARCH_PERSON_ENDPOINT, SEARCH_TV_ENDPOINT } from '@/core/constants'
import type { SearchResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ENDPOINTS: Record<string, string> = {
  movie: SEARCH_MOVIE_ENDPOINT,
  tv: SEARCH_TV_ENDPOINT,
  person: SEARCH_PERSON_ENDPOINT,
}

export const SearchView = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const filter = searchParams.get('filter') || 'movie'
  const [page, setPage] = useState(1)

  const { data, loading } = useTmdb<SearchResponse>(
    query ? ENDPOINTS[filter] : '',
    { query, page },
    [query, page, filter],
  )

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.profile_path ?? r.poster_path ?? null,
    primaryText: r.name ?? r.title ?? r.original_title ?? 'Unknown',
  }))

  const handleClick = (id: number) => {
    if (filter === 'person') navigate(`/person/${id}`)
    else if (filter === 'tv') navigate(`/tv/${id}`)
    else navigate(`/movie/${id}`)
  }

  return (
    <section className="space-y-6">
      <SectionHeader title="Search Results" />

      {!query ? (
        <p className="py-20 text-center text-sm text-zinc-600">
          Use the search bar above to find movies, TV shows, and people...
        </p>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          {data && (
            <p className="text-sm text-zinc-500">
              Found <span className="font-bold text-white">{data.total_results}</span> results for{' '}
              <span className="font-bold text-red-400">"{query}"</span>
            </p>
          )}
          {gridData.length ? (
            <>
              <ImageGrid results={gridData} onClick={handleClick} />
              <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
            </>
          ) : (
            <p className="py-10 text-center text-zinc-600">No results found.</p>
          )}
        </>
      )}
    </section>
  )
}