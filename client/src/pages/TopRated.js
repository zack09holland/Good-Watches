import React, { Component } from "react";
import Form from "../components/Form";

import { search } from "../utils/utils.js";
import Movies from "../components/Movies/Movies";
import { Jumbotron } from "react-bootstrap";
import MovieBrowser from '../components/NewModal/movie-browser/movie-browser.container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Col, Row, Container } from "../components/Grid";

class TopRated extends Component {
  state = {
    movies: null,
    loading: false,
 
  };

  render() {
    return (
      
      <MuiThemeProvider>
        <Jumbotron>
          <Container>
            <h1 className="text-center" id="title">Top Rated Movies</h1>
            <p className="text-center" id="titleContext">Current top rated movies on TMDB</p>
          </Container>
          </Jumbotron>
        <MovieBrowser location={this.props.location.pathname} />
      </MuiThemeProvider>
    );
  }
}

export default TopRated;
