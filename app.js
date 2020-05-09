'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const db = require('./models');
// const auth = require('basic-auth');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup request body json parsing
app.unsubscribe(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// authentication middleware
// const authenticateUser = (req, res, next) => {
//   let message = null;

//   // Parse the user's credentials from the Authorization header.
//   const credentials = auth(req);

//   // If the user's credentials are available...
//   if (credentials) {
//     // Attempt to retrieve the user from the data store by their username (i.e. the user's "key" from the Authorization header).
//     const user = users.find(u => u.username === credentials.name);

//     // If a user was successfully retrieved from the data store...
//     if (user) {
//       // Use the bcryptjs npm package to compare the user's password (from the Authorization header) to the user's password that was retrieved from the data store.
//       const authenticated = bcryptjs.compareSync(credentials.pass, user.password);

//       // If the passwords match...
//       if (authenticated) {
//         console.log(`Authentication successful for username: ${user.username}`);

//         // Then store the retrieved user object on the request object so any middleware functions that follow this middleware function will have access to the user's information.
//         req.currentUser = user;
//       } else {
//         message = `Authentication failure for username: ${user.username}`;
//       }
//     } else {
//       message = `User not found for username: ${credentials.name}`;
//     }
//   } else {
//     message = 'Auth header not found';
//   }

//   // If user authentication failed...
//   if (message) {
//     console.warn(message);

//     // Return a response with a 401 Unauthorized HTTP status code.
//     res.status(401).json({ message: 'Access Denied' });
//   } else {
//     // Or if user authentication succeeded...
//     // Call the next() method.
//     next();
//   }
// };

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
