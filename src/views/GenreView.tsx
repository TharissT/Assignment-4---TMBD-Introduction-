import { ButtonGroup, ImageGrid, Loading, Pagination, SectionHeader } from '@/components';
import { DISCOVER_MOVIE_ENDPOINT, DISCOVER_TV_ENDPOINT, MOVIE_GENRES, TV_GENRES } from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MEDIA_TYPES = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
];

export const GenreView = () => {
  const navigate = useNavigate();
  const { mediaType: paramMedia, genre: paramGenreName } = useParams<{ mediaType?: string; genre?: string }>();
  const mediaType = (paramMedia === 'tv' ? 'tv' : 'movie') as 'movie' | 'tv';
  const genres = mediaType === 'movie' ? MOVIE_GENRES : TV_GENRES;
  const currentGenre = genres.find((g) => g.label.toLowerCase() === paramGenreName?.toLowerCase()) || genres[0];
  const selectedGenreId = currentGenre.value;
  const [page, setPage] = useState(1);
  const endpoint = mediaType === 'movie' ? DISCOVER_MOVIE_ENDPOINT : DISCOVER_TV_ENDPOINT;
  const { data, loading } = useTmdb<MoviesResponse>(endpoint, { with_genres: selectedGenreId, page }, [selectedGenreId, page, mediaType]);
  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.poster_path,
    primaryText: r.original_title ?? r.name ?? r.title ?? '',
  }));

  const handleMediaChange = (val: string) => {
    const newGenres = val === 'movie' ? MOVIE_GENRES : TV_GENRES;
    const firstName = newGenres[0].label.toLowerCase();
    navigate(`/genre/${val}/${firstName}`);
    setPage(1);
  };

  const handleGenreChange = (val: string) => {
    const genreObj = genres.find((g) => g.value === val);
    const name = genreObj ? genreObj.label.toLowerCase() : 'action';
    navigate(`/genre/${mediaType}/${name}`);
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <SectionHeader title={currentGenre.label}>
        <ButtonGroup value={mediaType} options={MEDIA_TYPES} onClick={handleMediaChange} />
      </SectionHeader>
      <div className="flex flex-wrap gap-2">
        {genres.map((g) => (
          <button
            key={g.value}
            onClick={() => {
              handleGenreChange(g.value);
            }}
            className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              selectedGenreId === g.value
                ? 'border-red-600 bg-red-600 text-white'
                : 'border-zinc-700 bg-transparent text-zinc-400 hover:border-red-600 hover:text-red-400'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <ImageGrid
            results={gridData}
            onClick={(id) => {
              if (mediaType === 'tv') {
                navigate(`/tv/${id}`);
              } else {
                navigate(`/movie/${id}`);
              }
            }}
          />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </div>
      )}
    </section>
  );
};
