const mongoose. { Schema } = require('mongoose');

module.exports = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    
