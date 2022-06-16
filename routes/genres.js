const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre } = require('../models/genre');
const router = express.Router();

router.get('/', (req, res) => {
    Genre
        .find()
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, date: 1  })
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.message));
});

router.get('/:id', (req, res) => {
    Genre
        .findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.post('/', auth, (req, res) => {
    if(!req?.body?.name || req.body.name.length < 3) {
        res.status(400).send('bad request');
        return;
    }

    const genre = new Genre({
        name: req.body.name
    });

    genre
        .save()
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.put('/:id', (req, res) => {
    if(!req?.body?.name || req.body.name.length < 3) {
        res.status(400).send('bad request');
        return;
    }

    Genre
        .findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        }
    }, { new: true })
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.delete('/:id', [auth, admin], (req, res) => {
   Genre
       .findByIdAndDelete(req.params.id, { new: true })
       .then(result => res.send(result))
       .catch(err => res.send(err.message));
});

module.exports = router;