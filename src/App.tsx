import { MainLayout } from '@/layouts/MainLayout'
import {
  CareerView,
  CreditsView,
  EpisodeView,
  ErrorView,
  GenreView,
  HomeView,
  ImagesView,
  MovieView,
  MoviesView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  TelevisionView,
  TrailersView,
  TrendingView,
  TvCreditsView,
  TvReviewsView,
  TvTrailersView,
  TvView,
} from '@/views'
import { Route, Routes } from 'react-router-dom'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />

      <Route element={<MainLayout />}>
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>

        <Route path="/television" element={<TelevisionView />} />
        <Route path="/tv/:id" element={<TvView />}>
          <Route path="credits" element={<TvCreditsView />} />
          <Route path="trailers" element={<TvTrailersView />} />
          <Route path="reviews" element={<TvReviewsView />} />
          <Route path="seasons" element={<SeasonsView />} />
        </Route>
        <Route path="/tv/:id/seasons/:seasonNumber" element={<EpisodeView />} />

        <Route path="/person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>

        <Route path="/trending" element={<TrendingView />} />
        <Route path="/genre" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
      </Route>

      <Route path="*" element={<ErrorView />} />
    </Routes>
  )
}
