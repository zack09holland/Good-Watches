const router = require('express').Router();
const { User, Movie } = require('../models');
const { Types } = require('mongoose');

// Get all users or a specific user by id.
router.get('/users', (req, res) => {
    console.log(req.path);
    const id = req.body ? req.body.id : null;
    const promise = id ? User.findById(id) : User.find();
    promise.then(results => res.send(results)).catch(err => res.send(err));
});

// Delete a user by id.
router.delete('/users', (req, res) => {
    const id = req.body ? req.body.id : null;
    User.findByIdAndDelete(id).then(result => res.send(result)).catch(err => res.send(err));
});

// Create a new user.
router.post('/users', (req, res) => {
    User.create(req.body).then(result => res.send(result)).catch(err => res.send(err));
});

// Get all movies or a specific movie by id.
router.get('/movies', (req, res) => {
    console.log(req.path);
    const id = req.body ? req.body.id : null;
    const promise = id ? Movie.findById(id) : Movie.find();
    promise.then(results => res.send(results)).catch(err => res.send(err));
});

// Delete a movie by id.
router.delete('/movies', (req, res) => {
    const id = req.body ? req.body.id : null;
    movie.findByIdAndDelete(id).then(result => res.send(result)).catch(err => res.send(err));
});

// Create a new movie.
router.post('/movies', (req, res) => {
    movie.create(req.body).then(result => res.send(result)).catch(err => res.send(err));
});

// Add a rating to a user.
router.put('/rating', (req, res) => {
    const id = req.body ? req.body.id : null;
    User.updateOne({ _id: Types.ObjectId(id) }).then(user => {
        user.set(req.body.movie, req.body.rating);
        res.sendStatus(200);
    }).catch(err => res.send(err));
});

module.exports = router;