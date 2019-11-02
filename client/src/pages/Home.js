import React, { Component } from 'react';

import Card from '../components/Card';
import Footer from '../components/Footer';
import Form from '../components/Form';
import { Col, Container, Row } from '../components/Grid';
import Jumbotron from '../components/Jumbotron';
import { List } from '../components/List';
import Movie from '../components/Movies/Movie.js';
import API from '../utils/API';
import "../homepage.css"
class Home extends Component {
  state = {
    movies: [],
    q: '',
    message: 'Search a movie or genre to find what you should watch!'
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getMovies = () => {
    API.getMovies(this.state.q)
      .then(res => this.setState({ movies: res.data }))
      .catch(err => this.setState({
        movies: [],
        message: err || 'No new movies found, try a different query.'
      }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getMovies();
  };

  handleMovieSave = id => {
    const movie = this.state.movies.find(movie => movie.id === id);

    API.saveMovie(movie).then(this.getMovies);
  };

  render() {
    
    return (
        
          <Container>
            <Jumbotron fluid>
            <Col size='md-12'>
              
              <h1 className='text-center'>
                <strong>Having trouble finding something to watch?</strong>
              </h1>
              <h2 className='text-center'>Try our movie-roulette to find something good to watch!.</h2>

            </Col>
            <Row>
              
              <Col size='md-12'>
                <Card title='Movie Recommendation' icon='far fa-movie'>
                  <Form
                    handleInputChange={this.handleInputChange} handleFormSubmit=
                    {this.handleFormSubmit} q=
                    {
                      this.state.q
                    } />
                </Card >
              </Col>
            </Row>
            
            <Row>
              <Col size='md-12'>
                <Card title='Results'> {
                  this.state.movies.length ?
                    (<List>{this.state.movies.map((movie, i) => (
                      <Movie
                        key={i}
                        title={movie.title}
                        link={movie.link}
                        Button={() => (
                          <button
                            onClick={() => this.handleMovieSave(movie.id)}
                            className='btn btn-primary ml-2'
                          >
                            Save
                            </button>
                        )}
                      />
                    ))}
                    </List>
                    ) : (
                      <h2 className="text-center">{this.state.message}</h2>
                    )}
                </Card>
              </Col>
            </Row>
            </Jumbotron>
            <Footer />
            
          </Container>
        
    );
  }
}

export default Home;
