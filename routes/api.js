const router = require('express').Router();
const {User, Movie} = require('../models');
const {Types} = require('mongoose');

// Get all movies or a specific movie by id.
router.get('movies', (req, res) => {
  console.log(req.path);
  const id = req.body.id;
  const promise = id ? Movie.findById(id) : Movie.find();
  promise.then(results => res.send(results)).catch(err => res.send(err));
});

// Delete a movie.
router.delete('movies', (req, res) => {
  const id = req.body.id;
  Movie.findByIdAndDelete(id)
      .then(result => res.send(result))
      .catch(err => res.send(err));
});

// Create a movie.
router.post('users', (req, res) => {
  Movie.create(req.body)
      .then(result => res.send(result))
      .catch(err => res.send(err));
});

// Get all users or a specific user by id.
router.get('users', (req, res) => {
  console.log(req.path);
  const id = req.body.id;
  const promise = id ?
      User.findById(id).populate('ratings').populate('rejects').populate(
          'saves') :
      User.find();
  promise.then(results => res.send(results)).catch(err => res.send(err));
});

// Delete a specific user.
router.delete('users', (req, res) => {
  const id = req.body.id;
  User.findByIdAndDelete(id)
      .then(result => res.send(result))
      .catch(err => res.send(err));
});

// Create a user.
router.post('users', (req, res) => {
  User.create(req.body)
      .then(result => res.send(result))
      .catch(err => res.send(err));
});

module.exports = router;