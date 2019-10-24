//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const { User, Movie } = require('../models');

//Require the dev-dependencies
const chai = require('chai');
const { expect } = chai;
const server = require('../server');

chai.use(require('chai-http'));

describe('API', () => {
    before(() => {
        const MONGODB_URI = 'mongodb://localhost/test';
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(MONGODB_URI, (err) => {
            if (err) throw err;
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET user', () => {
        it('should GET all the users', () =>
            chai.request(server)
                .get('/api/users')
                .then(res => {
                    expect(res.body).to.be.an('array');
                })
        );
    });

});