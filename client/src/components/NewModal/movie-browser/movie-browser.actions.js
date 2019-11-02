import {createAsyncActionCreator} from '../common/redux.helpers';
import * as movieService from './movie-browser.service';

export const keys = {
  'GET_TOP_MOVIES': 'GET_TOP_MOVIES',
  'GET_NEW_RELEASES': 'GET_NEW_RELEASES',
  'GET_POPULAR': 'GET_POPULAR',
  'GET_NOW_PLAYING': 'GET_NOW_PLAYING',
  'SEARCH_MOVIES': 'SEARCH_MOVIES',
  'GET_MOVIE_DETAILS': 'GET_MOVIE_DETAILS',
  'GET_MOVIE_CREDITS': 'GET_MOVIE_CREDITS',
  'GET_RECOMMENDATIONS': 'GET_RECOMMENDATIONS',
};

export const getTopMovies = (page) => createAsyncActionCreator(
  // actionType
  keys.GET_TOP_MOVIES,
  // requestFn
  movieService.getTopMovies, 
  // requestParams
  {page}
);
export const getUpcoming = (page) => createAsyncActionCreator(
  // actionType
  keys.GET_NEW_RELEASES,
  // requestFn
  movieService.getUpcoming, 
  // requestParams
  {page}
);
export const getPopular = (page) => createAsyncActionCreator(
  // actionType
  keys.GET_POPULAR,
  // requestFn
  movieService.getPopular, 
  // requestParams
  {page}
);
export const getNowPlaying = (page) => createAsyncActionCreator(
  // actionType
  keys.GET_NOW_PLAYING,
  // requestFn
  movieService.getNowPlaying, 
  // requestParams
  {page}
);

export const getRecommendations = (movieId) => createAsyncActionCreator(
  keys.GET_RECOMMENDATIONS,
  movieService.getRecommendations, 
  {movieId}
);
export const searchMovies = (query, page) => createAsyncActionCreator(
  keys.SEARCH_MOVIES,
  movieService.searchMovies, 
  {query, page}
);

export const getMovieDetails = (movieId) => createAsyncActionCreator(
  keys.GET_MOVIE_DETAILS,
  movieService.getMovieDetails, 
  {movieId}
);

export const getMovieCredits = (movieId) => createAsyncActionCreator(
  keys.GET_MOVIE_CREDITS,
  movieService.getMovieCredits, 
  {movieId}
);
