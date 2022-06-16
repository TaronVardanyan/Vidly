const startupDebugger = require('debug')('app:startup');
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const port = process.env.PORT || 3000;

if(!config.get('jwtPrivateKey')) {
    console.log("FATAL ERROR: JWT is not defined");
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly').then(() => console.log('connected to MongoDb')).catch(err => console.error('Could not connect to db', err));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/genres', genres);
app.use('/customers', customers);
app.use('/movies', movies);
app.use('/rentals', rentals);
app.use('/users', users);
app.use('/auth', auth);

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

app.listen(port, () => console.log(`Listening on port ${port}...`));