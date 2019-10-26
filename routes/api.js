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

const objectId = (item, value) => {
    if (item === 'id' || item === 'movie')
        return Types.ObjectId(value);
    return value;
};

const deepCopy = (from, to) => {
    const copy = (value, item) => {
        if (typeof value == 'object')
            deepCopy(value, to[item]);
        else
            to[item] = objectId(value);
    };
    if (Array.isArray(from))
        from.forEach(copy);
    else
        for (let item in from)
            copy(from[item], item);
};

// Modify a user with given id. All fields in body will be copied into given user.
router.put('/users', (req, res) => {
    if (!req.body) res.sendStatus(400);
    const { id } = req.body;
    if (!id) res.sendStatus(400);
    // Delete id property of body so that it won't be copied.
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
        res.send(movies.filter(movie => {
            for (let item of ['ratings', 'rejects', 'saves'])
                if (user[item].find(movie))
                    return false;
            return true;
        }));
    });
});


module.exports = router;