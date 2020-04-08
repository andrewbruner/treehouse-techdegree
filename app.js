// DEPENDENCIES

// import express module and set up main app
const express = require('express');
const app = express();

// import data.json file
const data = require('./data.json');

// import path module
const path = require('path');




// SETTINGS

// set 'view engine' to 'pug'
app.set('view engine', 'pug');

// set up static files
// HOW CAN I USE THE PATH MODULE ABOVE IN THIS METHOD?
app.use('/static', express.static('public'));

// use this middleware to test for general error handling...
//app.use((req, res, next) => {
//	const err = new Error('Something went wrong!');
//	err.status = 500;
//	next(err);
//});




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




// NOT FOUND AND ERROR HANDLING

// nonexistent route (404)
// creates new error with message and status and passes to error handler
// note to self: keep at bottom of call stack, just before error handler
app.use((req, res, next) => {
	//res.status(404).send('<h1>Sorry, the page you\'re looking for doesn\'t exist.</h1>');
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	res.send(`<h1>${err.message}</h1><h2>${err.status}</h2><pre>${err.stack}</pre>`);
});




// LISTENER

// start server on port 3000
app.listen(3000, () => {
	console.log('Server is listening on port 3000...');
});