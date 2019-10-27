require("dotenv").config();
const path = require('path');
const express = require('express');

const passport = require('passport');
const auth = require('./config/passport-init');
const cookieSession = require('cookie-session');

const router = require('./routes');

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/watches';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(MONGODB_URI, (err) => {
    if (err) throw err;
});

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(passport.initialize());
auth(passport);

app.use('/',router);
app.listen(PORT, () => console.log('Listening on ' + PORT));

module.exports = app;
