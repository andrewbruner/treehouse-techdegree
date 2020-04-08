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
// note to self: res.render() begins looking in views folder by default

// index route
app.get('/', (req, res) => {
	res.render('index', { projects: data.projects });
});

// about route
app.get('/about', (req, res) => {
	res.render('about');
});

// dynamic projects route
// note to self: parameter variables are declared with ':' (:variablename) and accessible through 'req.params.variablename'
app.get('/project/:id', (req, res) => {
	res.render('project', { id: req.params.id, projects: data.projects });
});

// nonexistent route (404)
// note to self: keep at bottom of call stack
app.use((req, res) => {
	res.status(404).send('Sorry, the page you\'re looking for doesn\'t exist.');
});




// LISTENER

// start server on port 3000
app.listen(3000, () => {
	console.log('Server is listening on port 3000...');
});