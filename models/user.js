const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: 5,
        maxLength: 255,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024,
    },
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 10,
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model("User", userSchema);

module.exports = User;