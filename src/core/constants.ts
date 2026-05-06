export const API_KEY = import.meta.env.VITE_TMDB_API_KEY
export const ORIGINAL_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const MOVIE_ENDPOINT = 'https://api.themoviedb.org/3/movie'
export const TV_ENDPOINT = 'https://api.themoviedb.org/3/tv'
export const PERSON_ENDPOINT = 'https://api.themoviedb.org/3/person'
export const DISCOVER_MOVIE_ENDPOINT = 'https://api.themoviedb.org/3/discover/movie'
export const DISCOVER_TV_ENDPOINT = 'https://api.themoviedb.org/3/discover/tv'
export const SEARCH_MOVIE_ENDPOINT = 'https://api.themoviedb.org/3/search/movie'
export const SEARCH_TV_ENDPOINT = 'https://api.themoviedb.org/3/search/tv'
export const SEARCH_PERSON_ENDPOINT = 'https://api.themoviedb.org/3/search/person'
export const TRENDING_ENDPOINT = 'https://api.themoviedb.org/3/trending'

export const MOVIE_CATEGORIES = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
]

export const TV_CATEGORIES = [
  { label: 'Airing Today', value: 'airing_today' },
  { label: 'On The Air', value: 'on_the_air' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
]

export const MOVIE_GENRES = [
  { label: 'Action', value: '28' },
  { label: 'Adventure', value: '12' },
  { label: 'Animation', value: '16' },
  { label: 'Crime', value: '80' },
  { label: 'Family', value: '10751' },
  { label: 'Fantasy', value: '14' },
  { label: 'History', value: '36' },
  { label: 'Horror', value: '27' },
  { label: 'Mystery', value: '9648' },
  { label: 'Sci-Fi', value: '878' },
]

export const TV_GENRES = [
  { label: 'Action', value: '10759' },
  { label: 'Animation', value: '16' },
  { label: 'Comedy', value: '35' },
  { label: 'Crime', value: '80' },
  { label: 'Documentary', value: '99' },
  { label: 'Drama', value: '18' },
  { label: 'Family', value: '10751' },
  { label: 'Kids', value: '10762' },
  { label: 'Mystery', value: '9648' },
  { label: 'Sci-Fi', value: '10765' },
]
