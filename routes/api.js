const router = require('express').Router();
const { User } = require('../models');
const { Types } = require('mongoose');

router.get('/users/:id?', (req, res) => {
    console.log(req.path);
    const id = req.params.id;
    const promise = id ? User.findOne({ _id: Types.ObjectId(id) }) : User.find();
    promise.then(results => res.send(results)).catch(err => res.send(err));
});

router.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    User.remove({ _id: Types.ObjectId(id) }).then(result => res.send(result)).catch(err => res.send(err));
});

router.post('/users', (req, res) => {
    User.create(req.body).then(result => res.send(result)).catch(err => res.send(err));
});

router.post('/users/:id/:movie/:rating', (req, res) => {
    User.updateOne({ _id: Types.ObjectId(id) }).then(user => {
        user.ratings.push(
    });
});

module.exports = router;