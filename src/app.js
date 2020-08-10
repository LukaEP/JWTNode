const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const auth = require('./middleware/authenticate');

// Configure the app to use body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Load Routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

module.exports = app;