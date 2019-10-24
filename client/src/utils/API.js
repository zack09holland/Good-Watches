import axios from "axios";

const BASEURL = "https://api.themoviedb.org/3/discover/movie?api_key="
// "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
const APIKEY = "d9761b9f704ad5a0f60b04f11dbf4503";





export default {
  // Gets books from the Google API
  getBooks: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  // Gets all saved books
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  // Deletes the saved book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves an book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
