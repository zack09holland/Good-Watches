// e.g. { getTopMovies, ... }
import { Col, Row, Container } from "../../Grid";
import React from 'react';
import {connect} from 'react-redux';
// import {AppBar, TextField, RaisedButton} from 'material-ui';
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
      currentMovies: [],
    };
    this.handleScroll = this.handleScroll.bind(this);
    }
  
  componentDidMount() {
    window.onscroll = this.handleScroll;
    if(this.props.location === "/topratedmovies"){
        console.log(this.props.location)
        
        this.props.getTopMovies(this.state.currentPage);    
    }
    else if(this.props.location === "/upcoming"){
        console.log(this.props.location)
        this.props.getUpcoming(this.state.currentPage);
    }
    else if(this.props.location === "/popular"){
        console.log(this.props.location)
        this.props.getPopular(this.state.currentPage);
    }
    else if(this.props.location === "/nowplaying"){
        console.log(this.props.location)
        this.props.getNowPlaying(this.state.currentPage);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const {topMovies} = this.props;
    if (!topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getScrollDownPercentage(window);
      if (percentageScrolled > .8) {
        const nextPage = this.state.currentPage + 1;
        if(this.props.location === '/topratedmovies'){
            this.props.getTopMovies(nextPage);    
        }else if(this.props.location === '/upcoming'){
            this.props.getUpcoming(nextPage);
        }else if(this.props.location === '/nowplaying'){
            this.props.getNowPlaying(nextPage);
        }else if(this.props.location === '/popular'){
            this.props.getPopular(nextPage);
        }else if(this.props.location === '/recommendations'){
            this.props.getRecommendations(nextPage);
        }
        
        this.setState({currentPage: nextPage});
      }
    }
  }

  render() {
    const {topMovies, newMovies, nowPlayingMovies, popMovies, recMovies} = this.props;
    let movies = movieHelpers.getMoviesList(topMovies.response);
    
    if(this.props.location === "/topratedmovies"){
        movies = movieHelpers.getMoviesList(topMovies.response);
        console.log(movies)
    }else if(this.props.location === "/upcoming"){
        movies = movieHelpers.getMoviesList(newMovies.response);
    }else if(this.props.location === "/nowplaying"){
        movies = movieHelpers.getMoviesList(nowPlayingMovies.response);
    }else if(this.props.location === "/popular"){
        movies = movieHelpers.getMoviesList(popMovies.response);
    }else if(this.props.location === "/recommendations"){
        movies = movieHelpers.getMoviesList(recMovies.response);
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
    popMovies : state.movieBrowser.popMovies,
    recMovies : state.movieBrowser.recMovies
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);