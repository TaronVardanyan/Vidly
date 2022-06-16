const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router.get('/', (req, res) => {
    Customer
        .find()
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, date: 1  })
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.get('/:id', (req, res) => {
    Customer
        .findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.post('/', (req, res) => {
    if(!req?.body?.name || req.body.name.length < 3) {
        res.status(400).send('bad request');
        return;
    }

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone
    });

    customer
        .save()
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.put('/:id', (req, res) => {
    if(!req?.body?.name || req.body.name.length < 3) {
        res.status(400).send('bad request');
        return;
    }

    Customer
        .findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            phone: req.body.phone
        }
    }, { new: true })
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.delete('/:id', (req, res) => {
    Customer
        .findByIdAndDelete(req.params.id, { new: true })
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

module.exports = router;