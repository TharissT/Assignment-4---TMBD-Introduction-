import { ButtonGroup, ImageGrid, Loading, Pagination, SectionHeader } from '@/components';
import { TV_AIRING_TODAY, TV_ON_THE_AIR, TV_POPULAR, TV_TOP_RATED } from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { label: 'Airing Today', value: 'airing_today', endpoint: TV_AIRING_TODAY },
  { label: 'On The Air', value: 'on_the_air', endpoint: TV_ON_THE_AIR },
  { label: 'Popular', value: 'popular', endpoint: TV_POPULAR },
  { label: 'Top Rated', value: 'top_rated', endpoint: TV_TOP_RATED },
];

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [page, setPage] = useState(1);

  const active = CATEGORIES.find((c) => c.value === category)!;
  const { data, loading } = useTmdb<MoviesResponse>(active.endpoint, { page }, [page, category]);

  const gridData = (data?.results ?? []).map((r) => ({
    id: r.id,
    imagePath: r.poster_path,
    primaryText: r.name ?? r.original_title ?? '',
  }));

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setPage(1);
  };

  return (
    <section className="space-y-6">
      <SectionHeader title="TV Shows">
        <ButtonGroup
          value={category}
          options={CATEGORIES.map((c) => ({ label: c.label, value: c.value }))}
          onClick={handleCategoryChange}
        />
      </SectionHeader>

      {loading ? <Loading /> : (
        <>
          <ImageGrid results={gridData} onClick={(id) => navigate(`/tv/${id}`)} />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </>
      )}
    </section>
  );
};
