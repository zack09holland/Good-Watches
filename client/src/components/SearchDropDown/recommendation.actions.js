import {createAsyncActionCreator} from './redux.helpers';
import * as movieService from './recommendation-service.js';

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

export const getRecommendations = (movieId) => createAsyncActionCreator(
  keys.GET_MOVIE_DETAILS,
  movieService.getRecommendations, 
  {movieId}
);

export const searchMovies = (query, page) => createAsyncActionCreator(
  keys.SEARCH_MOVIES,
  movieService.searchMovies, 
  {query, page}
);