import { MainLayout } from '@/layouts/MainLayout';
import {
  CareerView,
  CreditsView,
  ErrorView,
  EpisodeView,
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
} from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      {/* Home - no layout */}
      <Route path="/" element={<HomeView />} />

      {/* All routes with Header/Footer layout */}
      <Route element={<MainLayout />}>
        {/* Movies */}
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>

        {/* TV */}
        <Route path="/television" element={<TelevisionView />} />
        <Route path="/tv/:id" element={<TvView />}>
          <Route path="credits" element={<TvCreditsView />} />
          <Route path="trailers" element={<TvTrailersView />} />
          <Route path="reviews" element={<TvReviewsView />} />
          <Route path="seasons" element={<SeasonsView />} />
        </Route>

        {/* TV Episodes - standalone page */}
        <Route path="/tv/:id/seasons/:seasonNumber" element={<EpisodeView />} />

        {/* Person */}
        <Route path="/person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>

        {/* Shared */}
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/genre" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
