const router = require('express').Router();
const { User, Movie } = require('../models');
const { Types } = require('mongoose');
const axios = require('axios');

// Get a specific user by id or all users if none specified.
router.put('/users', (req, res) => {
    console.log(req.path);
    if (!req.body) res.sendStatus(400);
    const { id } = req.body;
    const promise = id ? User.findById(Types.ObjectId(id)) : User.find();
    promise.then(result => res.send(result)).catch(err => res.send(err));
});

const deepDelete = (from, to) => {
    for (let item in from) {
        const value = from[item];
        if (typeof value === 'object')
            deepDelete(value, to[item]);
        else
            delete to[item];
    }
};

// Delete a user by id or delete fields from user as specified in body.
router.delete('/users', (req, res) => {
    if (!req.body) res.sendStatus(400);
    const { id } = req.body.id;
    if (!id) res.sendStatus(400);
    delete req.body.id;
    if (req.body.keys)
        // Delete fields from the user.
        User.findByIdAndUpdate(Types.ObjectId(id)).then(user => {
            deepDelete(req.body, user);
            res.send(user);
        }).catch(err => res.send(err));
    else
        // Delete the user.
        User.findByIdAndDelete(Types.ObjectId(id)).then(res.send).catch(err => res.send(err));

});

// Create a new user.
router.post('/users', (req, res) => {
    User.create(req.body).then(result => res.send(result)).catch(err => res.send(err));
});

const createMovieDbUrl = ({ relativeUrl, queryParams }) => {
    let url = `https://api.themoviedb.org/3${relativeUrl}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`;
    if (queryParams) {
        Object.keys(queryParams)
            .forEach(paramName => url += `&${paramName}=${queryParams[paramName]}`);
    }
    return url;
};

// Get all movies, a specific movie by id, titles starting with given string, or movies returned by given query to TMD.
router.put('/movies', (req, res) => {
    console.log(req.path, req.body);
    if (!req.body) res.sendStatus(400);
    const { id, title, query } = req.body;
    const promise = id ? Movie.findById(Types.ObjectId(id)) :
        title ? Movie.find({ title: new RegEx('^' + title) }) :
            query ? axios.get(createMovieDbUrl(query)) : null;
    if (promise)
        promise.then(result => {
            console.log(result);
            res.send(query ? result.data : result);
        }).catch(err => res.send(err));
    else
        res.sendStatus(400);
});

// Delete a movie by id.
router.delete('/movies', (req, res) => {
    if (!req.body) res.sendStatus(400);
    const { id } = req.body;
    movie.findByIdAndDelete(Types.ObjectId(id)).then(result => res.send(result)).catch(err => res.send(err));
});

// Create a new movie.
router.post('/movies', (req, res) => {
    movie.create(req.body).then(result => res.send(result)).catch(err => res.send(err));
});

// Copy all members/elements in object from into object to, converting ids and movies into ObjectIds.
const deepCopy = (from, to) => {
    for (let item in from) {
        const value = from[item];
        if (typeof value === 'object')
            deepCopy(value, to[item]);
        else
            to[item] = item === 'id' || item === 'movie' ? Types.ObjectId(value) : value;
    }
};

// Modify a user with given id. All fields in body will be copied into user.
router.put('/users', (req, res) => {
    if (!req.body) res.sendStatus(400);
    const { id } = req.body;
    if (!id) res.sendStatus(400);
    // Delete id property of body so that it won't be copied.
    delete req.body.id;
    User.findByIdAndUpdate(Types.ObjectId(id)).then(user => {
        deepCopy(req.body, user);
        res.sendStatus(200);
    });
});

/* Given an array of movie ids and a user id,
 * return movies the user hasn't saved, rated, or rejected. */
router.get('/unseen', (req, res) => {
    if (!req.body) res.sendStatus(400);
    const { id, movies } = req.body;
    movies = movies.map(movie => Types.ObjectId(movie));
    User.findById(Types.ObjectId(id)).then(user => {
        res.send(movies.filter(movie => {
            for (let item of ['ratings', 'rejects', 'saves'])
                if (user[item].find(e => e === movie))
                    return false;
            return true;
        }));
    });
});


module.exports = router;