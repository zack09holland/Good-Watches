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

mongoose.connect(MONGODB_URI, async (err) => {
    if (err) throw err;
    console.log('Connected: ', MONGODB_URI);
    await Movie.syncIndexes();
    const rl = readline.createInterface({
        input: fs.createReadStream('./data.tsv'),
        console: false
    });

    let fields, fieldCount, progress = 0;

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
        if (isNaN(year) || year < 1927 || year > 2020) return;
        Movie.create({
            title: movie.primaryTitle,
            year: year,
            serial: movie.titleType === 'tvSeries'
        }, () => { console.log(++progress); });
    });
    rl.on('close', () => {
        mongoose.connection.close();
    });
});