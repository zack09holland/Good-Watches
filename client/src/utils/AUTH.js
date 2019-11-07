import axios from "axios";

export default {
    // Gets movies from TMD
    isAuthenticated: function () {
      return axios.get("/auth/authenticated");
    }
  };