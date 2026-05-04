export type MoviesResponse = {
  results: Array<{
    id: number
    original_title?: string
    name?: string
    title?: string
    poster_path: string
    media_type?: string
  }>
  total_pages: number
}

export type MovieRepsonse = {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date?: string
  first_air_date?: string
  vote_average: number
  number_of_seasons?: number
  videos?: {
    results: Array<{
      id: string
      key: string
      name: string
      site: string
      type: string
    }>
  }
}

export type CreditsResponse = {
  cast: Array<{
    id: number
    name: string
    profile_path: string | null
    character: string
  }>
}

export type ReviewsResponse = {
  results: Array<{
    id: string
    author: string
    content: string
    created_at: string
  }>
  total_pages: number
}

export type SearchResponse = {
  results: Array<{
    id: number
    name?: string
    title?: string
    original_title?: string
    profile_path: string | null
    poster_path?: string | null
    media_type?: string
  }>
  total_pages: number
  total_results: number
}

export type TrailersResponse = {
  results: Array<{
    id: string
    key: string
    name: string
    site: string
    type: string
  }>
}

export type GenreListResponse = {
  genres: Array<{ id: number; name: string }>
}

export type SeasonsResponse = {
  id: number
  name: string
  seasons: Array<{
    id: number
    name: string
    season_number: number
    episode_count: number
    poster_path: string | null
    overview: string
  }>
}

export type EpisodesResponse = {
  episodes: Array<{
    id: number
    name: string
    episode_number: number
    still_path: string | null
    overview: string
    air_date: string
    vote_average: number
  }>
}

export type PersonResponse = {
  id: number
  name: string
  biography: string
  birthday: string | null
  deathday: string | null
  place_of_birth: string | null
  profile_path: string | null
  known_for_department: string
}

export type PersonCreditsResponse = {
  cast: Array<{
    id: number
    title?: string
    name?: string
    character: string
    poster_path: string | null
    media_type?: string
    release_date?: string
    first_air_date?: string
  }>
}

export type PersonImagesResponse = {
  profiles: Array<{
    file_path: string
    width: number
    height: number
  }>
}
