
import axios from 'axios';

export const getTopMovies = async ({ page }) => {
  return axios.put('/api/tv', {
    query: {
      relativeUrl: '/tv/top_rated',
      params: {
        page: page
      }
    }
  });
};

export const getUpcoming = async ({ page }) => {
  return axios.put('/api/tv', {
    query: {
      relativeUrl: '/tv/airing_today',
      params: {
        page: page
      }
    }
  });
};

export const getNowPlaying = async ({ page }) => {
  return axios.put('/api/tv', {
    query: {
      relativeUrl: '/tv/on_the_air',
      params: {
        page: page
      }
    }
  });
};

export const getPopular = async ({ page }) => {
  return axios.put('/api/tv', {
    query: {
      relativeUrl: '/tv/popular',
      params: {
        page: page
      }
    }
  });
};

export const getRecommendations = async ({ movieId }) => {
  return axios.put('/api/tv', {
    query: {
      relativeUrl: `/tv/${movieId}/recommendations`
    }
  });
};


export const searchMovies = async ({ page, query }) => {
  return axios.put('/api/tv', {
    query: {
      relativeUrl: '/search/tv',
      params: {
        page: page
      }
    }
  });
};

export const getMovieDetails = async ({movieId}) => {
  return axios.put('/api/tv', {
    query: {
      relativeUrl: `/tv/${movieId}`
    }
  });
}
export const getMovieCredits = async ({movieId}) => {
  return axios.put('/api/tv', {
    query: {
      relativeUrl: `/tv/${movieId}/credits`
    }
  });
}