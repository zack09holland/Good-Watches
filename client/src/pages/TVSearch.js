import React, { Component } from "react";
import Form from "../components/Form";

import { search } from "../utils/utils.js";
import Movies from "../components/Movies/Movies";

class TVSearch extends Component {
  state = {
    movies: null,
    loading: false,
    value: "",
  };

  showModal = () => {
    this.setState({ show: true });
  }
  
  hideModal = () => {
    this.setState({ show: false });
  }
  
  search = async val => {
    this.setState({ loading: true });
    const results = await search( 
      `https://api.themoviedb.org/3/search/movie?query=${val}&api_key=d9761b9f704ad5a0f60b04f11dbf4503`
    );
    const movies = results;

    this.setState({ movies, loading: false });
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderMovies() {
    let movies = <h1 className="text-center">Search for a tv show to find information about it!</h1>;
    if (this.state.movies) {
      movies = <Movies list={this.state.movies} />;
    }

    return movies;
  }

  render() {
    return (
      <div>
        <Form 
            handleInputChange={e => this.onChangeHandler(e)}
            handleFormSubmit={this.handleFormSubmit}
            q={this.state.value}
        />
        {this.renderMovies}
        
      </div>
    );
  }
}

export default TVSearch;
