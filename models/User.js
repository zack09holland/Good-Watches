const { Schema, model } = require('mongoose');

const User = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    ratings: [{
        rating: Number,
        movie: Schema.Types.ObjectId
    }],
    rejects: [Schema.Types.ObjectId],
    saves: [Schema.Types.ObjectId]
});

module.exports = model('User', User);