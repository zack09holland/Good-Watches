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
    serial: Boolean,
    tmdId: {
        type: Number,
        unique: true
    }
});

// No duplicate movies.
Movie.index({ title: 1, year: -1 }, { unique: true });

Movie.index({ title: 1 });

module.exports = model('Movie', Movie);
