const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    date: {type: Date, default: Date.now()}
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;