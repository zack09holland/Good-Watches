import Axios from "axios";


export const getTopMovies = async ({ page }) => {
  return Axios.put('/api/movies', {
    query: {
      relativeUrl: '/movie/top_rated',
      params: {
        page: page
      }
    }
  });
};


export const getRecommendations = async (movieId) => {
  console.log(movieId)
  return Axios.put('/api/movies', {
    relativeUrl: `/movie/${movieId}/recommendations`
  });
}


export const searchMovies = async ({ page, query }) => {
  return Axios.get('/api/movies/search' + query);
}

export const getMovieDetails = async ({ movieId }) => {
  const fullUrl = `/tv/${movieId}`;
  return fetch(fullUrl);
}
export const getMovieCredits = async ({ movieId }) => {
  const fullUrl = `/tv/${movieId}/credits`;
  return fetch(fullUrl);
}