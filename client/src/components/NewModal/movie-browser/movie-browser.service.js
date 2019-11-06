// const BASEURL = "https://api.themoviedb.org/3/discover/movie?api_key="
// "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

// WARNING: Don't check your actual API key into GitHub

import axios from 'axios';

export const getTopMovies = async ({ page }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: '/movie/top_rated',
      params: {
        page: page
      }
    }
  });
};

export const getUpcoming = async ({ page }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: '/movie/upcoming',
      params: {
        page: page
      }
    }
  });
};

export const getNowPlaying = async ({ page }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: '/movie/now_playing',
      params: {
        page: page
      }
    }
  });
};

export const getPopular = async ({ page }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: '/movie/popular',
      params: {
        page: page
      }
    }
  });
};

export const getRecommendations = async ({ movieId }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: `/movie/${movieId}/recommendations`
    }
  });
};


export const searchMovies = async ({ page, query }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: '/search/movie',
      params: {
        page: page
      }
    }
  });
};

export const getMovieDetails = async ({ movieId }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: `/movie/${movieId}`
    }
  });
};

export const getMovieCredits = async ({ movieId }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: `/movie/${movieId}/credits`
    }
  });
};