import { ImageGrid, Loading, Pagination, SectionHeader } from '@/components'
import { API_KEY, SEARCH_MOVIE_ENDPOINT, SEARCH_PERSON_ENDPOINT, SEARCH_TV_ENDPOINT } from '@/core/constants'
import type { SearchResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const SearchView = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const filter = searchParams.get('filter') ?? 'movie'
  const [page, setPage] = useState(1)

  const endpointMap: Record<string, string> = {
    movie: SEARCH_MOVIE_ENDPOINT,
    tv: SEARCH_TV_ENDPOINT,
    person: SEARCH_PERSON_ENDPOINT,
  }

  const { data, loading } = useTmdb<SearchResponse>(
    query ? endpointMap[filter] ?? SEARCH_MOVIE_ENDPOINT : '',
    { query, page },
    [query, filter, page],
  )

  useEffect(() => {
    setPage(1)
  }, [query, filter])

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.poster_path ?? r.profile_path ?? null,
    primaryText: r.title ?? r.name ?? r.original_title ?? 'Unknown',
  }))

  const handleClick = (id: number) => {
    if (filter === 'person') {
      navigate(`/person/${id}`)
    } else if (filter === 'tv') {
      navigate(`/tv/${id}`)
    } else {
      navigate(`/movie/${id}`)
    }
  }

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <SectionHeader title={query ? `Results for "${query}"` : 'Search'}>
        {data && (
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-600">
            {data.total_results?.toLocaleString()} results
          </p>
        )}
      </SectionHeader>
      {!query && (
        <p className="py-10 text-center text-zinc-600">Start typing to search...</p>
      )}
      {query && loading && <Loading />}
      {query && !loading && (
        <div className="space-y-6">
          {gridData.length ? (
            <>
              <ImageGrid results={gridData} onClick={handleClick} />
              <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
            </>
          ) : (
            <p className="py-10 text-center text-zinc-600">No results found.</p>
          )}
        </div>
      )}
    </section>
  )
}
