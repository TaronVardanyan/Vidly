const mongoose = require('mongoose');
const {genreSchema} = require("./genre");

const movieSchema = new mongoose.Schema({
    genre: {
        type: genreSchema,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
    },
    numberInStock: {
        type: Number,
        default: 0,
        min: 0,
        max: 255,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255,
    },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;