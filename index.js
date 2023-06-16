// Imports
const express = require('express');
const mongoose = require('mongoose');

// Middleware
const helmet = require('helmet')
const logger = require('./middleware/logger')
const morgan = require('morgan')
const config = require('config')
const secretkey = config.get('secretkey');
console.log(secretkey)

// Routes
const home = require('./routes/home')
const pets = require('./routes/pets')
const owners = require('./routes/owners')
const users = require('./routes/users')
const login = require('./routes/login')

const app = express();

mongoose.connect('mongodb://localhost:27017/pets')
    .then(() => { console.log('connected'); })
    .catch((err => { console.log('error', err); }))

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
}

// This middleware creates endpoints for anything within the Public Foldder
app.use(express.static('public'))
app.use(express.json())
app.use(helmet())
app.use(logger)
app.use('/', home)
app.use('/api/pets', pets)
app.use('/api/owners', owners)
app.use('/api/users', users)
app.use('/api/login', login)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(' Listening on Port 3000'));