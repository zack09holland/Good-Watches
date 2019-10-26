// e.g. { getTopMovies, ... }
import { Col, Row, Container } from "../../Grid";
import React from 'react';
import {connect} from 'react-redux';
import {AppBar, TextField, RaisedButton} from 'material-ui';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../common/scroll.helpers';
import MovieModal from './movie-modal/movie-modal.container';
import "./movie-browser.css";


class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: []
    };

    this.handleScroll = this.handleScroll.bind(this);
    
  }


  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getTopMovies(this.state.currentPage);
    // this.props.getUpcoming(this.state.currentPage);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const {topMovies, upcomingMovies} = this.props;
    if (!topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getScrollDownPercentage(window);
      if (percentageScrolled > .8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage);
        this.props.getUpcoming(nextPage);
        this.setState({currentPage: nextPage});
      }
    }
  }

  render() {
    const {topMovies} = this.props;
    console.log(this.props)
    const movies = movieHelpers.getMoviesList(topMovies.response);
    console.log(movies)
    
    return (
      <div>
        {/* <TextField onChange={e => console.log(e.currentTarget.value)} placeholder ="Search for a movie here" fullWidth="true"/> */}
        <Container>
          <Row>
            <MovieList movies={movies} isLoading={topMovies.isLoading} />
            
          </Row>
        </Container>
        <MovieModal />
      </div>
    );
  }
}

export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    topMovies: state.movieBrowser.topMovies,
    upcomingMovies: state.movieBrowser.upcomingMovies
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);