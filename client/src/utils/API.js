import axios from "axios";

export default {
  // Gets movies from TMD
  getMovies: function (q) {
    return axios.get("/api/movies", { query: q });
  },
  // Deletes from the given user id and category the given movie index. Category is one of ratings, rejects, or saves.
  deleteMovie: function (id, category, movie) {
    return axios.delete("/api/users/", { id: id, [category]: movie });
  },
  // Saves a movie to the database
  saveMovie: function (movie) {
    return axios.post("/api/movies", movie);
  }
};
