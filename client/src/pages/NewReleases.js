import React, { Component } from "react";
import Form from "../components/Form";

import { search } from "../utils/utils.js";
import Movies from "../components/Movies/Movies";
import { Jumbotron } from "react-bootstrap";
import MovieBrowser from '../components/NewModal/movie-browser/movie-browser.container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class NewReleases extends Component {
  state = {
    movies: null,
    loading: false,
 
  };


  render() {
    return (
        
      <MuiThemeProvider>
        <Jumbotron><h1 className="text-center" id="title">New Releases</h1></Jumbotron>
        <MovieBrowser />
      </MuiThemeProvider>
    );
  }
}

export default NewReleases;
