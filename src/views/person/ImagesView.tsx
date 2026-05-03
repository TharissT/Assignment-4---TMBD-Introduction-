import { Loading } from '@/components';
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from '@/core/constants';
import type { PersonImagesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const ImagesView = () => {
  const { id } = useParams();
  const { data, loading } = useTmdb<PersonImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {}, [id]);

  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <section className="space-y-4">
      <p className="text-zinc-500 text-sm">
        <span className="text-white font-bold">{data.profiles.length}</span> photos
      </p>
      {data.profiles.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {data.profiles.map((img, i) => (
            <div key={i} className="rounded overflow-hidden border border-zinc-800 hover:border-red-600/50 transition-all">
              <img
                src={`${IMAGE_BASE_URL}${img.file_path}`}
                alt={`Photo ${i + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-600 text-center py-10">No images available.</p>
      )}
    </section>
  );
};
