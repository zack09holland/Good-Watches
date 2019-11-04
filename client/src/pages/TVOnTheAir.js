import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import MovieBrowser from '../components/TV/tv-browser/tv-browser.container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Container } from "../components/Grid";
import "../otherPages.css"
class TVOnTheAir extends Component {
  state = {
    movies: null,
    loading: false,
 
  };

  render() {
    return (
      
      <MuiThemeProvider>
        <Jumbotron>
          <Container>
            <h1 className="text-center" id="title">TV Shows On the Air</h1>
            <p className="text-center" id="titleContext">Current TV Shows you can watch on your TV right now!</p>
          </Container>
          </Jumbotron>
        <MovieBrowser location={this.props.location.pathname} />
      </MuiThemeProvider>
    );
  }
}

export default TVOnTheAir;
