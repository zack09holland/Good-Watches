const { Schema, model } = require('mongoose');

const User = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    ratings: {
        type: Map,
        of: Number
    }, // keys are movie ids as strings
    rejects: [Schema.Types.ObjectId], // movies the user does not want to see
    saves: [Schema.Types.ObjectId] // movies the user wants to see
});

module.exports = model('User', User);