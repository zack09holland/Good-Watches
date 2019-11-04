const { Movie } = require('../models');

const request = require('supertest'),
    server = require('../server'),
    assert = require('assert');

describe('Title Search', function () {
    it('finds movies by title', function (done) {
        request(server)
            .put('/api/movies')
            .send({
                title: 'The Wind'
            })
            .end(function (err, res) {
                assert(Array.isArray(res.body));
                done();
            });
    });
    after(function () {
        server.close();
    })
});