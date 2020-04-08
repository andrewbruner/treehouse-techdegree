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
	res.render('views/about');
});

// dynamic projects route
app.get('/project/:id', (req, res) => {
	res.render('project', { id: req.params.id, projects: data.projects });
});




// LISTENER

// start server on port 3000
app.listen(3000, () => {
	console.log('Server is listening on port 3000...');
});