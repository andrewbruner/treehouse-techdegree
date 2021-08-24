//////////////////
// DEPENDENCIES //
//////////////////

// import express module and set up main app
const express = require('express');
const app = express();

// import data.json file
const data = require('./data.json');

// import path module
const path = require('path');


//////////////
// SETTINGS //
//////////////

// set 'view engine' to 'pug'
app.set('view engine', 'pug');

// set up static files
app.use('/static', express.static('public'));


/////////////
// TESTING //
/////////////

// use this middleware to test for general error handling...
// app.use((req, res, next) => {
// 	const err = new Error('Something went wrong!');
// 	err.status = 500;
// 	next(err);
// });


/////////////
// ROUTING //
/////////////
// note to self: res.render() begins looking in 'views' folder by default

// BASIC ROUTES

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
app.get('/project:id', (req, res, next) => {
	// if :id does not line up with an existing project index...
	if (!data.projects[req.params.id]) {
		// send 404 to error handler
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	// else render project template
	} else {
		res.render('project', { id: req.params.id, projects: data.projects });
	}
});

// NOT FOUND AND ERROR HANDLING

// nonexistent route (404)
// note to self: keep at bottom of call stack, just before error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	console.error(err);
	res.render('error', { error: err })
});

// error handler
app.use((err, req, res, next) => {
	console.error(err);
	res.render('error', { error: err });
});


///////////////
// LISTENING //
///////////////

// start server on port 3000
app.listen(3000, () => {
	console.log('Server is listening on port 3000...');
});