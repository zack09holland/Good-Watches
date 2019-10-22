const { Schema, model } = require('mongoose');

const Movie = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: Number
});

Movie.index({title: 1, year: 1}, { unique: true});

const User = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    ratings: [Movie],
    rejects: [Movie],
    saves: [Movie]
});

module.exports = {
    User: model('User', User),
    Movie: model('Movie', Movie)
};