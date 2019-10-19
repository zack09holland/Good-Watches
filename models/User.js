const { Schema } = require('mongoose');
const Movie = require('./Movie');

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

module.exports = User;
    
