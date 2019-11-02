const router = require('express').Router();
const { User, Movie } = require('../models');
const { Types } = require('mongoose');
const axios = require('axios');

// Get a specific user by id or all users if none specified.
router.get('/user/:id', (req, res) => {
    console.log(req.path);
    if (!req.body) res.sendStatus(400);
    const { id } = req.body;
    const promise = id ? User.findById(Types.ObjectId(id)) : User.find();
    promise.then(result => res.send(result)).catch(err => res.send(err));
});


// Delete all fields in object to that are in object from.
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
    const { id } = req.body;
    if (!id) res.sendStatus(400);
    if (req.body.keys)
        // Delete fields from the user.
        User.findByIdAndUpdate(Types.ObjectId(id)).then(user => {
            deepDelete(req.body.keys, user);
            res.send(user);
        }).catch(err => res.send(err));
    else
        // Delete the user.
        User.findByIdAndDelete(Types.ObjectId(id))
            .then(res.send)
            .catch(err => res.send(err));

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
    console.log(url);
    return url;
};

// Get a specific movie by id, titles starting with given string (case insensitive),
// or movies returned by given query to TMD.
router.put('/movies', (req, res) => {
    console.log(req.path, req.body);
    if (!req.body) res.sendStatus(400);
    const { id, title, query } = req.body;
    // Create a promise based on whether the request is by id, title, or TMD query.
    const promise = id ? Movie.findById(Types.ObjectId(id)) :
        title ? Movie.find({ title: new RegEx('^' + title, 'i') }) :
            query ? axios.get(createMovieDbUrl(query)) : null;
    if (!promise) {
        res.sendStatus(400);
        return;
    }
    promise.then(result => {
        if (query) {
            const { data } = result;
            const queries = data.results.map(result =>
                new Promise((resolve, reject) => {
                    Movie.updateOne({
                        // Find title case-insensitively.
                        title: new RegExp(result.title, 'i'),
                        year: parseInt(result.release_date.slice(0, 4)),
                        serial: false
                    }, {
                        $set: {
                            // Set title to match TMD.
                            title: result.title,
                            tmdId: result.id
                        }
                    }, {
                        // Insert movie if not found.
                        upsert: true
                    }, (err, raw) => {
                        if (err) reject(err);
                        resolve(raw);
                    });
                })
            );
            res.send(data);
            console.log('response sent');
            Promise.all(queries).then(console.log)
                .catch(console.error);
        } else
            res.send(result);
    }).catch(err => res.send(err));
});

// Delete a movie by id.
router.delete('/movies/:id', (req, res) => {
    const { id } = req.params.id;
    if (!id) res.sendStatus(400);
    Movie.findByIdAndDelete(Types.ObjectId(id)).then(result => res.send(result)).catch(err => res.send(err));
});

// Create a new movie.
router.post('/movies', (req, res) => {
    Movie.create(req.body).then(result => res.send(result)).catch(err => res.send(err));
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

/* Given an array of movie ids and a user id as strings,
 * return movies the user hasn't saved, rated, or rejected. */
const unseen = (id, movies) => {
    movies = movies.map(movie => Types.ObjectId(movie));
    User.findById(Types.ObjectId(id), user =>
        movies.filter(movie => {
            for (let item of ['ratings', 'rejects', 'saves'])
                if (user[item].find(e => e === movie))
                    return false;
            return true;
        }));
};


module.exports = router;