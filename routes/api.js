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

// Get all movies, a specific movie by id, or titles starting with given title string.
router.get('/movies', (req, res) => {
    console.log(req.path);
    const id = req.body ? req.body.id : null;
    const title = req.body ? req.body.title : null;
    const promise = id ? Movie.findById(id) :
        title ? Movie.find({ title: new RegEx('^' + title) }) :
            Movie.find();
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
        user.ratings.push({
            movie: Types.ObjectId(req.body.movie),
            rating: req.body.rating
        });
        res.sendStatus(200);
    }).catch(err => res.send(err));
});

function deepCopy(from, to) {
    if (Array.isArray(from))
        to = to.concat(from)
    else
        for (let item in from) {
            const fromItem = from[item];
            switch (typeof (fromItem)) {
                case 'object':
                    deepCopy(fromItem, to[item]);
                    break;
                case 'number':
                    to[item] = fromItem;
                    break;
                case 'string':
                    to[item] = Types.ObjectId(fromItem);
                    break;
            }
        }
}

// Modify a user with given id.
router.put('/users', (req, res) => {
    if (!req.body) res.sendStatus(400);
    const { id } = req.body;
    delete req.body.id;
    User.updateOne({ _id: Types.ObjectId(id) }).then(user => {
        deepCopy(req.body, user);
        res.sendStatus(200);
    });
});

/* Given an array of movie ids and a user id,
 * return movies the user hasn't saved, rated, or rejected. */
router.get('/unseen', (req, res) => {
    if (!req.body) res.sendStatus(400);
    const { id, movies } = req.body;
    User.findById(id).then(user => {
        for (let movie of movies)
            for (let item of []);
    });
});


module.exports = router;