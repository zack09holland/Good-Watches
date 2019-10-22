const router = require('express').Router();
const { User, Movie } = require('../models');
const mongoose = require('mongoose');

router.get('/users/:id?', (req, res) => {
    console.log(req.path);
    const id = req.params.id;
    User.find(id ? { _id: mongoose.Types.ObjectId(id) } : null)
        .then(results => res.send(results)).catch(err => res.send(err));
});

router.post('users', (req, res) => {
    User.create(req.body).then(result => res.send(result)).catch(err => res.send(err));
});

router.post('users/:id/:movie?', (req, res) => {
    User.findOne({ _id: mongoose.Types.ObjectId(id) }).then(user => {

    });
});

module.exports = router;