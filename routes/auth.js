const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { password, email } = req.body;

        if(!email || !password) {
            return res.status(400).send('Invalid request')
        }

        let user = await User.findOne({ email });
        if(!user) return res.status(400).send("Invalid email or password");

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).send('Password is not valid');

        const token = user.generateAuthToken();
        res.send(token);
    } catch (err) {
        res.send(err.message)
    }
});

module.exports = router;