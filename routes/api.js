const router = require('express').Router();
const { User, Movie } = require('../models');
const mongoose = require('mongoose');

router.get('users/:id?', (req, res) => {
    const id = req.params.id;
    User.find(id ? { _id: mongoose.Types.ObjectId(id) } : null)
        .then(results => res.send(results)).catch(err => res.send(err));
});

router.post('users', (req, res) => {
    User.create(req.body).then(result => res.send(result)).catch(err => res.send(err));
});

router.post('users/:id/:movie?')

module.exports = router;