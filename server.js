// dotenv is used to keep variable Secret (even Locally)
require("dotenv").config();

// npm package loading
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

// npm passport configuration information
const auth = require('./config/passport-init');

// express routes
const router = require('./routes');

// loads the MongoDB URI; Sets Default Parms; Attempts connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/watches';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(MONGODB_URI, (err) => {
    if (err) throw err;
});

// Port Value for Express Application
const PORT = process.env.PORT || 8080;

// loads express into app
const app = express();

// configures express app for urlEncoded and Json support
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if the NODE_ENV is production (HEROKU Default) then static load the client/build path
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// inititialze Passport into express app.use and set configuration
app.use(passport.initialize());
auth(passport);

// initialize routes into express app.use
app.use(router);

// start app listening on Port
app.listen(PORT, () => console.log('Listening on ' + PORT));
module.exports = app;
