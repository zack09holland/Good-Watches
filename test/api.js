const assert = require('assert');
const axios = require('axios');
const { User } = require('../models');

describe('GET users', () => {
    it('should return all users', () => {
        Promise.all([axios.get('/api/users'), User.find()]).then((results) => {
            for (let i = 0; i < results[1].length; ++i) assert(results[0][i] === results[1][i]);
        }).catch(err => assert(!err));
    });
});
describe('POST users', () => {
    it('should insert a new user', () => {
        const testUser = { email: 'Bob@bob.bob' };
        axios.post('/api/users', testUser).then(() => {
            User.findOne({ testUser }).then(result => {
                assert(result);
            });
        }).catch(err => assert(!err));
    })
});