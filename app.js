'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const db = require('./models');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup request body json parsing
app.unsubscribe(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// authentication middleware
const authenticateUser = (req, res, next) => {
  // Parse the user's credentials from the Authorization header.

  // If the user's credentials are available...
  // Attempt to retrieve the user from the data store
  // by their username (i.e. the user's "key"
  // from the Authorization header).

  // If a user was successfully retrieved from the data store...
  // Use the bcryptjs npm package to compare the user's password
  // (from the Authorization header) to the user's password
  // that was retrieved from the data store.

  // If the passwords match...
  // Then store the retrieved user object on the request object
  // so any middleware functions that follow this middleware function
  // will have access to the user's information.

  // If user authentication failed...
  // Return a response with a 401 Unauthorized HTTP status code.

  // Or if user authentication succeeded...
  // Call the next() method.
};

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// add routes
app.use('/api', routes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// test database connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
