import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import MovieBrowser from '../components/TV/tv-browser/tv-browser.container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Col, Row, Container } from "../components/Grid";

class TVPopular extends Component {
  state = {
    movies: null,
    loading: false,
 
  };

  render() {
    return (
      
      <MuiThemeProvider>
        <Jumbotron>
          <Container>
            <h1 className="text-center" id="title">Popular TV Shows</h1>
            <p className="text-center" id="titleContext">Current popular movies on TMDB</p>
          </Container>
          </Jumbotron>
        <MovieBrowser location={this.props.location.pathname} />
      </MuiThemeProvider>
    );
  }
}

export default TVPopular;
