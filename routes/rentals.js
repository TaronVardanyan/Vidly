const express = require('express');
const router = express.Router();
const {Rental } = require('../models/rental');
const Customer = require('../models/customer');
const Movie = require('../models/movie');
const Fawn = require('fawn');
const mongoose = require("mongoose");

Fawn.init('mongodb://localhost/vidly');

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut')
    if(!rentals) return res.status(404).send('could not find rentals');
    res.send(rentals);
})

router.post('/', async (req, res) => {
    const { customerId, movieId } = req.body;
    if(!customerId || !movieId) {
        return res.status(400).send("Not valid request");
    }

    if(!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).send('customer not found');
    }
    const customer = await Customer.findById(customerId);
    if(!customer) res.status(404).send('Customer not found');

    if(!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).send('movie not found');
    }
    const movie = await Movie.findById(movieId);
    if(!movie) res.status(404).send('Movie not found');

    if(!movie?.numberInStock) res.send('Movie not in stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        new Fawn.Task().save('rentals', rental).update('movies', { _id: movie._id }, {
            $inc: { numberInStock: -1 }
        }).run();
        res.send(rental);
    } catch(err) {
        res.status(500).send(err);
    }
})

module.exports = router;