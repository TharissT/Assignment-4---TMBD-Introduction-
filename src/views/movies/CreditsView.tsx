import { ImageGrid, Loading } from '@/components'
import { MOVIE_ENDPOINT } from '@/core/constants'
import type { CreditsResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useNavigate, useParams } from 'react-router-dom'

export const CreditsView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading } = useTmdb<CreditsResponse>(`${MOVIE_ENDPOINT}/${id}/credits`, {}, [id])

  if (loading) return <Loading />
  if (!data) return null

  const gridData = data.cast.map((p) => ({
    id: p.id,
    imagePath: p.profile_path,
    primaryText: p.name,
    secondaryText: p.character,
  }))

  return (
    <section className="pb-6">
      {data.cast.length ? (
        <ImageGrid results={gridData} onClick={(personId) => navigate(`/person/${personId}`)} />
      ) : (
        <p className="py-10 text-center text-zinc-600">No credits available.</p>
      )}
    </section>
  )
}
