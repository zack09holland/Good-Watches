const { Movie } = require('../models');

const request = require('supertest'),
    server = require('../server'),
    assert = require('assert');

describe('Title Search', function () {
    it('finds movies by title', function (done) {
        request(server)
            .get('/api/movies/search/The Wind')
            .end(function (err, res) {
                console.error(err);
                console.log(res.body);
                assert(Array.isArray(res.body));
                done();
            });
    });
    after(function () {
        server.close();
        process.exit();
    })
});