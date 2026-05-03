import { Loading, Pagination } from '@/components';
import { TV_ENDPOINT } from '@/core/constants';
import type { ReviewsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const TvReviewsView = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading } = useTmdb<ReviewsResponse>(`${TV_ENDPOINT}/${id}/reviews`, { page }, [id, page]);

  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <section className="pb-6 space-y-4">
      {data.results.length ? (
        <>
          {data.results.map((review) => (
            <div key={review.id} className="bg-zinc-900 border border-zinc-800 rounded p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-bold text-white">{review.author}</p>
                <p className="text-zinc-600 text-xs">
                  {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
                </p>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-5">{review.content}</p>
            </div>
          ))}
          <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
        </>
      ) : (
        <p className="text-zinc-600 text-center py-10">No reviews available.</p>
      )}
    </section>
  );
};
