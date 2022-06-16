const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const {Genre} = require("../models/genre");

router.get('/', async (req, res) => {
    const movies = await Movie.find().select({ name: 1 , title: 1, genre: 1 });
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { title , numberInStock, dailyRentalRate, genre } = req.body;
    if(!title && !numberInStock && !dailyRentalRate) {
        return res.send('bad request');
    }

    const genreData = await Genre.findById(genre);
    if(!genreData) res.status(404).send("genre not found");

    const movie = new Movie({
        title,
        numberInStock,
        dailyRentalRate,
        genre: {
            _id: genreData._id,
            name: genreData.name
        }
    });
    await movie.save();
    res.send(movie);
});

module.exports = router;