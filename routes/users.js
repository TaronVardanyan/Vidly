const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    const users = await User.find().sort('name')
    if(!users) return res.status(404).send('Could not find users');
    res.send(users);
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
});

router.post('/', auth, async (req, res) => {
  try {
      const { name, password, email } = req.body;

      if(!name || !email || !password) {
          return res.status(400).send('Invalid request')
      }

      let user = await User.findOne({ email });
      if(user) res.status(400).send("User already registered");

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      user = new User({
          name,
          email,
          password: hashed,
      });

      await user.save();

      const token = user.generateAuthToken();

      res.header('x-auth-token', token).send({
          name: user.name,
          email: user.email,
          _id: user._id
      });
  } catch (err) {
      res.send(err.message)
  }
});

module.exports = router;