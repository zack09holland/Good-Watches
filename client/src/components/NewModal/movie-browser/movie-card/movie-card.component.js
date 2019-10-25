import React from 'react';
import {connect} from 'react-redux';
import {Card, CardTitle, CardMedia} from 'material-ui';
import {openMovieModal} from '../movie-modal/movie-modal.actions';
import classes from "../../../Movies/Movie.module.css";
// These are inline styles
// You can pass styles as objects using this convention
const styles = {
  cardTitle: {
    backgroundColor: "black"
  },
  cardMedia: {
    maxHeight: 394,
    overflow: 'hidden',
    
  },
  card: {
    cursor: 'pointer',
    height: 400,
    overflow: 'hidden',
    
    
  },
  bgImage: {
    width: '100%'
  }
};

class MovieCardComponent extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the movie card
    this.state = {
      isMouseOver: false
    };
  }
  
  render() {
    const {movie, openMovieModal} = this.props;
    // The CardTitle.subtitle won't render if it's null
    const subtitle = this.state.isMouseOver ? movie.overview : null;

    return (
      
      <Card
        style={styles.card}
        onMouseOver={() => this.setState({isMouseOver: true})}
        onMouseLeave={() => this.setState({isMouseOver: false})}
        onClick= {() => openMovieModal(movie.id)}
      >
        <div className={classes.VoteContainer}>
        <span className={classes.Vote}>{movie.vote_average}</span>
      </div>
        <CardMedia
          style={styles.cardMedia}
          
          overlay={
            <CardTitle
              title={movie.title} 
              subtitle={subtitle}
              style={styles.cardTitle} 
            />
          }
        >
          <img style={styles.bgImage} src={movie.poster_path} alt={movie.title} />
        </CardMedia>
      </Card>
    );
  }
}

export default connect(
  () => ({}),
  { openMovieModal }
)(MovieCardComponent);