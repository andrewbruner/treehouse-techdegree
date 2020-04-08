// DEPENDENCIES

// import express module and set up main app
const express = require('express');
const app = express();

// import data.json file
const data = require('./data.json');

// import path module
const path = require('path');




// MIDDLEWARE //

// set 'view engine' to 'pug'
app.set('view engine', 'pug');

// set up static files
app.use('/static', express.static('public'));




// ROUTES //

// index route
app.get('/', (req, res) => {
	res.render('views/index', { projects: data.projects });
});

// about route
app.get('/about', (req, res) => {

});

// dynamic projects route
app.get('/projects', (req, res) => {

});