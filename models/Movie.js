const { Schema, model } = require('mongoose');

const Movie = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

Movie.index({title: 1, year: 1}, { unique: true});

module.exports = model('Movie', Movie);
