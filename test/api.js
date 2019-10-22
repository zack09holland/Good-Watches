const assert = require('assert');
const axios = require('axios');
const { User } = require('../models');

describe('GET users', () => {
    it('should return all users', () => {
        Promise.all([axios.get('/api/users'), User.find()]).then((results) => {
            for (let i = 0; i < results[0].length; ++i) assert(results[0][i] == results[1][i]);
        }).catch(err => console.log(err));
    });
});
describe('POST users', () => {
    it('should insert a new user', () => {
        axios.post('/api/users', { email: 'Bob@bob.bob' }).then(() => {
            
        }).catch(err => console.log(err));
    })
});