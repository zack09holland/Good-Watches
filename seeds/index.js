const mongoose = require('mongoose');
const { Movie } = require('../models');
const fs = require('fs');
const readline = require('readline');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(MONGODB_URI, (err) => {
    if (err) throw err;
    console.log('Connected: ', MONGODB_URI);
    const rl = readline.createInterface({
        input: fs.createReadStream('./data.tsv'),
        console: false
    });

    let fields, fieldCount, movies = [];

    rl.on('line', line => {
        const cells = line.split('\t');
        if (!fields) {
            fields = cells;
            fieldCount = fields.length;
            return;
        }
        const movie = {};
        for (let i = 0; i < fieldCount; ++i)
            movie[fields[i]] = cells[i];
        if (!(movie.titleType === 'movie' || movie.titleType === 'tvSeries') || movie.isAdult === '1')
            // non-adult movies and tv series only
            return;
        const year = parseInt(movie.startYear);
        // no movies without years, future releases, or silent films
        if (isNaN(year) || year < 2013 || year > 2013) return;
        movies.push({
            title: movie.primaryTitle,
            year: year,
            serial: movie.titleType === 'tvSeries'
        });
    });
    rl.on('close', () => {
        Movie.insertMany(movies)
            .then(results => {
                console.log(results);
                mongoose.connection.close();
            }).catch(console.error);
    });
});