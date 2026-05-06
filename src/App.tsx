import { MainLayout } from '@/layouts/MainLayout';
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
} from '@/views';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/movies" element={<Navigate to="/movies/now_playing" replace />} />
        <Route path="/movies/:category" element={<MoviesView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
        <Route path="/television" element={<Navigate to="/television/airing_today" replace />} />
        <Route path="/television/:category" element={<TelevisionView />} />
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
        <Route path="/trending" element={<Navigate to="/trending/movie?interval=day" replace />} />
        <Route path="/trending/:mediaType" element={<TrendingView />} />
        <Route path="/genre" element={<Navigate to="/genre/movie/action" replace />} />
        <Route path="/genre/:mediaType/:genre" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
