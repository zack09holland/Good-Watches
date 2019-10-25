const { Schema, model } = require('mongoose');

const MovieRef = {
    type: Schema.Types.ObjectId,
    ref: 'Movie'
}

const User = new Schema({
    email: {
        type: String,
        required: true
    },
    token: String,
    name: String,
    ratings: [{
        movie: MovieRef,
        rating: Number
    }],
    rejects: [MovieRef],
    saves: [MovieRef]
});

module.exports = model('User', User);