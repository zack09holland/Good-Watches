import {combineReducers} from 'redux';
import { createReducer, createAsyncReducer } from '../common/redux.helpers';
import { keys as movieActionKeys } from './movie-browser.actions';
import movieModalReducer from './movie-modal/movie-modal.reducer';

// This will create a new state with both the existing 
// movies and new pages of movies
const moviesSuccessReducer = (state, action) => {
  const existingMovies = state.response ? state.response.results : [];
  // Create a new state object to be returned
  // When creating the new state, be sure to include any
  // existing properties we want to persist
  return {
    ...state,
    isLoading: false,
    response: {
      ...action.response,
      results: [
        ...existingMovies,
        ...action.response.results
      ]
    }
  };
}

// Combines our movie browser related reducers to build our movieBrowser reducer
const movieBrowserReducer = combineReducers({
  movieModal: movieModalReducer,
  topMovies: createAsyncReducer(movieActionKeys.GET_TOP_MOVIES, {
    [`${movieActionKeys.GET_TOP_MOVIES}_SUCCESS`]: moviesSuccessReducer
  }),
  newMovies: createAsyncReducer(movieActionKeys.GET_NEW_RELEASES, {
    [`${movieActionKeys.GET_NEW_RELEASES}_SUCCESS`]: moviesSuccessReducer
  }),
  popMovies: createAsyncReducer(movieActionKeys.GET_POPULAR, {
    [`${movieActionKeys.GET_POPULAR}_SUCCESS`]: moviesSuccessReducer
  }),
  nowPlayingMovies: createAsyncReducer(movieActionKeys.GET_NOW_PLAYING, {
    [`${movieActionKeys.GET_NOW_PLAYING}_SUCCESS`]: moviesSuccessReducer
  }),
  movieSearch: createAsyncReducer(movieActionKeys.SEARCH_MOVIES, {
    [`${movieActionKeys.SEARCH_MOVIES}_SUCCESS`]: moviesSuccessReducer
  }),
  recMovies: createAsyncReducer(movieActionKeys.GET_RECOMMENDATIONS, {
    [`${movieActionKeys.GET_RECOMMENDATIONS}_SUCCESS`]: moviesSuccessReducer
  }),
  movieDetails: createAsyncReducer(movieActionKeys.GET_MOVIE_DETAILS),
  movieCredits: createAsyncReducer(movieActionKeys.GET_MOVIE_CREDITS),
});

export default movieBrowserReducer;