const { Movie } = require('../models');

const request = require('supertest'),
    server = require('../server'),
    assert = require('assert');



describe('Save movie', function () {
    it('Favorites some movie', function (done) {
        request(server)
            .put('/api/user/favorite')
            .send({ tmdId: null })
            .expect(200)
            .then(done());
    })
})

describe('Title Search', function () {
    it('finds movies by title', function (done) {
        request(server)
            .get('/api/movies/search/The Wind')
            .then(function (err, res) {
                console.error(err);
                console.log('response body:', res.body);
                assert(Array.isArray(res.body));
                done();
            });
    });
    after(function () {
        server.close();
        process.exit();
    })
});