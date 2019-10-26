// e.g. { getTopMovies, ... }
import { Col, Row, Container } from "../../Grid";
import React from 'react';
import {connect} from 'react-redux';
// import {AppBar, TextField, RaisedButton} from 'material-ui';
import * as movieActions from './tv-browser.actions';
import * as movieHelpers from './tv-browser.helpers';
import MovieList from './tv-list/tv-list.component';
import * as scrollHelpers from '../common/scroll.helpers';
import MovieModal from './tv-modal/tv-modal.container';
import "./tv-browser.css";


class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: [],
    };
    this.handleScroll = this.handleScroll.bind(this);
    }
  
  componentDidMount() {
    window.onscroll = this.handleScroll;
    if(this.props.location === "/topratedtv"){
        console.log(this.props.location)
        
        this.props.getTopMovies(this.state.currentPage);    
    }
    else if(this.props.location === "/latestshows"){
        console.log(this.props.location)
        this.props.getUpcoming(this.state.currentPage);
    }
    else if(this.props.location === "/populartv"){
        console.log(this.props.location)
        this.props.getPopular(this.state.currentPage);
    }
    else if(this.props.location === "/ontheair"){
        console.log(this.props.location)
        this.props.getNowPlaying(this.state.currentPage);
    }
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
        if(this.props.location === '/topratedtv'){
            this.props.getTopMovies(nextPage);    
        }else if(this.props.location === '/latestshows'){
            this.props.getUpcoming();
        }else if(this.props.location === '/ontheair'){
            this.props.getNowPlaying(nextPage);
        }else if(this.props.location === '/populartv'){
            this.props.getPopular(nextPage);
        }
        
        this.setState({currentPage: nextPage});
      }
    }
  }

  render() {
    const {topMovies, newMovies, nowPlayingMovies, popMovies} = this.props;
    let movies = movieHelpers.getMoviesList(topMovies.response);
    
    if(this.props.location === "/topratedtv"){
        movies = movieHelpers.getMoviesList(topMovies.response);
        console.log(movies)
    }else if(this.props.location === "/latestshows"){
        movies = movieHelpers.getMoviesList(newMovies.response);
    }else if(this.props.location === "/ontheair"){
        movies = movieHelpers.getMoviesList(nowPlayingMovies.response);
    }else if(this.props.location === "/populartv"){
        movies = movieHelpers.getMoviesList(popMovies.response);
    }
    
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
    topMovies : state.movieBrowser.topMovies,
    newMovies : state.movieBrowser.newMovies,
    nowPlayingMovies : state.movieBrowser.nowPlayingMovies,
    popMovies : state.movieBrowser.popMovies
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);