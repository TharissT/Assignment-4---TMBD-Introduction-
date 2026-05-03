import { ImageGrid, Loading, Pagination, SearchBar, SectionHeader } from '@/components';
import { SEARCH_ENDPOINT } from '@/core/constants';
import type { SearchResponse } from '@/core/types';
import { useDebounce } from '@/hooks';
import { useTmdb } from '@/hooks';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
      setPage(1);
    }
  }, [debouncedQuery]);

  const { data, loading } = useTmdb<SearchResponse>(
    debouncedQuery ? SEARCH_ENDPOINT : '',
    { query: debouncedQuery, page },
    [debouncedQuery, page]
  );

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.profile_path ?? r.poster_path ?? null,
    primaryText: r.name ?? r.title ?? r.original_title ?? 'Unknown',
    secondaryText: r.media_type ? r.media_type.toUpperCase() : undefined,
  }));

  const handleClick = (id: number) => {
    const result = data?.results.find((r) => r.id === id);
    if (!result) return;
    if (result.media_type === 'person') navigate(`/person/${id}`);
    else if (result.media_type === 'tv') navigate(`/tv/${id}`);
    else navigate(`/movie/${id}`);
  };

  return (
    <section className="space-y-6">
      <SectionHeader title="Search" />

      <SearchBar value={query} onChange={setQuery} />

      {!debouncedQuery ? (
        <p className="text-zinc-600 text-center py-20 text-sm">Start typing to search movies, TV shows, and people...</p>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          {data && (
            <p className="text-zinc-500 text-sm">
              Found <span className="text-white font-bold">{data.total_results}</span> results for{' '}
              <span className="text-red-400 font-bold">"{debouncedQuery}"</span>
            </p>
          )}
          {gridData.length ? (
            <>
              <ImageGrid results={gridData} onClick={handleClick} />
              <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
            </>
          ) : (
            <p className="text-zinc-600 text-center py-10">No results found.</p>
          )}
        </>
      )}
    </section>
  );
};
