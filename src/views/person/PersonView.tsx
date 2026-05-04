import { LinkGroup, Loading } from '@/components'
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from '@/core/constants'
import type { PersonResponse } from '@/core/types'
import { useTmdb } from '@/hooks'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

export const PersonView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {}, [id])

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loading />
      </div>
    )
  if (!data) return null

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-screen-2xl space-y-8 px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer text-sm font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-white"
        >
          ← Back
        </button>

        <div className="flex items-start gap-8">
          {data.profile_path ? (
            <img
              src={`${IMAGE_BASE_URL}${data.profile_path}`}
              alt={data.name}
              className="w-48 shrink-0 rounded border border-zinc-800 shadow-2xl"
            />
          ) : (
            <div className="flex h-64 w-48 shrink-0 items-center justify-center rounded border border-zinc-800 bg-zinc-900">
              <span className="text-4xl text-zinc-600">👤</span>
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white">{data.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
              {data.known_for_department && (
                <span className="rounded border border-red-600/40 bg-red-600/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
                  {data.known_for_department}
                </span>
              )}
              {data.birthday && <span>Born: {data.birthday}</span>}
              {data.deathday && <span className="text-zinc-600">Died: {data.deathday}</span>}
              {data.place_of_birth && <span>📍 {data.place_of_birth}</span>}
            </div>
            {data.biography && (
              <p className="max-w-2xl line-clamp-4 text-sm leading-relaxed text-zinc-400">{data.biography}</p>
            )}
          </div>
        </div>

        <LinkGroup
          links={[
            { label: 'Career', to: `/person/${id}/career` },
            { label: 'Images', to: `/person/${id}/images` },
          ]}
        />
        <Outlet />
      </div>
    </div>
  )
}
