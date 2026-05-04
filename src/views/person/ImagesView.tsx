import { Loading } from '@/components'
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from '@/core/constants'
import type { PersonImagesResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useParams } from 'react-router-dom'

export const ImagesView = () => {
  const { id } = useParams()
  const { data, loading } = useTmdb<PersonImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {}, [id])

  if (loading) return <Loading />
  if (!data) return null

  return (
    <section className="space-y-4">
      <p className="text-sm text-zinc-500">
        <span className="font-bold text-white">{data.profiles.length}</span> photos
      </p>
      {data.profiles.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data.profiles.map((img, i) => (
            <div key={i} className="overflow-hidden rounded border border-zinc-800 transition-all hover:border-red-600/50">
              <img
                src={`${IMAGE_BASE_URL}${img.file_path}`}
                alt={`Photo ${i + 1}`}
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-zinc-600">No images available.</p>
      )}
    </section>
  )
}
