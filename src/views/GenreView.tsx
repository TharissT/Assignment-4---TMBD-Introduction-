import { ButtonGroup, ImageGrid, Loading, Pagination, SectionHeader } from '@/components';
import {
  DISCOVER_MOVIE_ENDPOINT,
  DISCOVER_TV_ENDPOINT,
  MOVIE_GENRES,
  TV_GENRES,
} from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MEDIA_TYPES = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
];

export const GenreView = () => {
  const navigate = useNavigate();
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [page, setPage] = useState(1);

  const genres = mediaType === 'movie' ? MOVIE_GENRES : TV_GENRES;
  const [selectedGenre, setSelectedGenre] = useState(genres[0].value);

  const endpoint = mediaType === 'movie' ? DISCOVER_MOVIE_ENDPOINT : DISCOVER_TV_ENDPOINT;
  const { data, loading } = useTmdb<MoviesResponse>(endpoint, { with_genres: selectedGenre, page }, [selectedGenre, page, mediaType]);

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.poster_path,
    primaryText: r.original_title ?? r.name ?? r.title ?? '',
  }));

  const handleMediaChange = (val: string) => {
    setMediaType(val as 'movie' | 'tv');
    const newGenres = val === 'movie' ? MOVIE_GENRES : TV_GENRES;
    setSelectedGenre(newGenres[0].value);
    setPage(1);
  };

  const handleGenreChange = (val: string) => {
    setSelectedGenre(val);
    setPage(1);
  };

  return (
    <section className="space-y-6">
      <SectionHeader title="Browse by Genre">
        <ButtonGroup value={mediaType} options={MEDIA_TYPES} onClick={handleMediaChange} />
      </SectionHeader>

      {/* Genre pills */}
      <div className="flex flex-wrap gap-2">
        {genres.map((g) => (
          <button
            key={g.value}
            onClick={() => handleGenreChange(g.value)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-200 cursor-pointer ${
              selectedGenre === g.value
                ? 'bg-red-600 border-red-600 text-white'
                : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-red-600 hover:text-red-400'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {loading ? <Loading /> : (
        <>
          <ImageGrid
            results={gridData}
            onClick={(id) => navigate(mediaType === 'tv' ? `/tv/${id}` : `/movie/${id}`)}
          />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </>
      )}
    </section>
  );
};
