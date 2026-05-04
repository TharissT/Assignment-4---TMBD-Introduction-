import { ImageGrid, Loading } from '@/components'
import { PERSON_ENDPOINT } from '@/core/constants'
import type { PersonCreditsResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { useNavigate, useParams } from 'react-router-dom'

export const CareerView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading } = useTmdb<PersonCreditsResponse>(`${PERSON_ENDPOINT}/${id}/combined_credits`, {}, [id])

  if (loading) return <Loading />
  if (!data) return null

  const seen = new Set<number>()
  const sorted = [...data.cast]
    .sort((a, b) => {
      const aDate = a.release_date ?? a.first_air_date ?? ''
      const bDate = b.release_date ?? b.first_air_date ?? ''
      return bDate.localeCompare(aDate)
    })
    .filter((item) => {
      if (seen.has(item.id)) return false
      seen.add(item.id)
      return true
    })

  const gridData = sorted.map((r) => ({
    id: r.id,
    imagePath: r.poster_path,
    primaryText: r.title ?? r.name ?? 'Unknown',
    secondaryText: r.character,
  }))

  return (
    <section className="space-y-4">
      <p className="text-sm text-zinc-500">
        <span className="font-bold text-white">{sorted.length}</span> credits
      </p>
      {gridData.length ? (
        <ImageGrid
          results={gridData}
          onClick={(itemId) => {
            const item = data.cast.find((c) => c.id === itemId)
            if (item?.media_type === 'tv') navigate(`/tv/${itemId}`)
            else navigate(`/movie/${itemId}`)
          }}
        />
      ) : (
        <p className="py-10 text-center text-zinc-600">No career credits found.</p>
      )}
    </section>
  )
}
