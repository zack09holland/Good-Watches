const router = require('express').Router();
const { User, Movie } = require('../models');
const { Types } = require('mongoose');
const axios = require('axios');

// Get a specific user by _id or all users if none specified.
router.get('/user/:_id?', (req, res) => {
    console.log(req.path);
    const { _id } = req.params;
    if (!_id) {
        res.sendStatus(400);
        return;
    }
    const promise = _id ? User.findById(Types.ObjectId(_id)) : User.find();
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

// Delete a user by _id or delete fields from user as specified in body.
router.delete('/user', (req, res) => {
    if (!req.user) {
        res.sendStatus(530);
        return;
    }
    const { _id } = req.user;
    if (!_id) res.sendStatus(400);
    const { fields } = req.body;
    if (fields)
        // Delete fields from the user.
        User.findByIdAndUpdate(Types.ObjectId(_id)).then(user => {
            deepDelete(fields, user);
            res.send(user);
        }).catch(err => res.send(err));
    else
        // Delete the user.
        User.findByIdAndDelete(Types.ObjectId(_id))
            .then(res.send)
            .catch(err => res.send(err));

});


// Given a relative url and queryParams from the page, return the url for TMD.
const createMovieDbUrl = ({ relativeUrl, queryParams }) => {
    let url = `https://api.themoviedb.org/3${relativeUrl}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`;
    if (queryParams) {
        Object.keys(queryParams)
            .forEach(paramName => url += `&${paramName}=${queryParams[paramName]}`);
    }
    console.log(url);
    return url;
};

// Get a specific movie by _id, titles starting with given string (case insensitive),
// or movies returned by given query to TMD.
router.put('/movies', (req, res) => {
    console.log(req.path, req.body);
    if (!req.body) res.sendStatus(400);
    const { _id, title, query } = req.body;
    // Create a promise based on whether the request is by _id, title, or TMD query.
    const promise = _id ? Movie.findById(Types.ObjectId(_id)) :
        title ? Movie.find({ title: new RegEx('^' + title, 'i') }) :
            query ? axios.get(createMovieDbUrl(query)) : null;
    if (!promise) {
        res.sendStatus(400);
        return;
    }
    promise.then(result => {
        if (query) {
            // Query contained data for TMD.
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
        } else if (title) {
            // Searched database by title.
            console.log(result);
            res.send(result);
        } else
            res.send(result);
    }).catch(err => res.send(err));
});

// Delete a movie by _id.
router.delete('/movies/:_id', (req, res) => {
    const { _id } = req.params._id;
    if (!_id) res.sendStatus(400);
    Movie.findByIdAndDelete(Types.ObjectId(_id))
        .then(result => res.send(result))
        .catch(err => res.send(err));
});

// Copy all members/elements in from into to, converting _ids and movies into ObjectIds.
const deepCopy = (from, to) => {
    for (let item in from) {
        const value = from[item];
        if (typeof value === 'object')
            deepCopy(value, to[item]);
        else
            to[item] = item === '_id' || item === 'movie' ? Types.ObjectId(value) : value;
    }
};

// Modify a user with given _id. All fields in body will be copied into user.
router.put('/user', (req, res) => {
    if (!req.user) res.sendStatus(530);
    const { _id } = req.user;
    if (!_id) res.sendStatus(400);
    // Delete _id property of body so that it won't be copied.
    delete req.body._id;
    User.findByIdAndUpdate(Types.ObjectId(_id)).then(user => {
        deepCopy(req.body, user);
        res.sendStatus(200);
    });
});

/* Given an array of movie ids and a user _id as strings,
 * return movies the user hasn't saved, rated, or rejected. */
const unseen = (_id, movies) => {
    movies = movies.map(movie => Types.ObjectId(movie));
    User.findById(Types.ObjectId(_id), user =>
        movies.filter(movie => {
            for (let item of ['ratings', 'rejects', 'saves'])
                if (user[item].includes(movie))
                    return false;
            return true;
        }));
};


// Get recommendations on a given movie id.
router.get('/recommendations/:_id', (req, res) => {
    if (!req.params._id) {
        res.sendStatus(400);
        return;
    }
    // Find the movie in the database.
    Movie.findById(Types.ObjectId(req.params._id), movie => {
        axios.get(createMovieDbUrl({ relativeUrl: `/movie/${movie.tmdId}/recommendations` }))
            .then(tmdMovies => {
                // Find movies in database matching tmdIds of recommendations.
                Movie.find({ tmdId: { $in: tmdMovies.map(tmdMovie => tmdMovie.id) } },
                    (err, movies) => {
                        if (err) {
                            res.send(err);
                            return;
                        }
                        if (req.isAuthenticated())
                            // Send movies the user hasn't seen yet.
                            res.send(unseen(req.user._id, movies));
                        else
                            // Send all the movies.
                            res.send(movies);
                        if (movies.length < tmdMovies.length) {
                            // Find movies that are not in db.
                            const missingMovies = tmdMovies.filter(tmdMovie => 
                                !movies.find(e => e.tmdId === tmdMovie.id));
                            // Insert those movies into the db with titles and years.
                            Movie.insertMany(missingMovies.map(tmdMovie => ({
                                title: tmdMovie.title,
                                year: parseInt(result.release_date.slice(0, 4))
                            })),
                            (error, docs) => {
                                if (error) console.log('Insert error:', error);
                                else console.log('Movies inserted:', docs);
                            });
                        }
                    });
            });

    });
    
});


module.exports = router;