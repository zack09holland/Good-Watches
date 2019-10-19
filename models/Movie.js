const { Schema } = require('mongoose');

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

module.exports = Movie;

