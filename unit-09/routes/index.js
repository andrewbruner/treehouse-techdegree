const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const db = require('../models');
const { User } = db.models;
const { Course } = db.models;

// Authentication Middleware
const authenticateUser = async (req, res, next) => {
   let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  if (credentials) {
    // Attempt to retrieve the user from the database by their email address
    const user = await User.findOne({
        where: {
            emailAddress: credentials.name
        }
    });

    // If a user was successfully retrieved from the database...
    if (user) {
      // Compare passwords
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);

      // If the passwords match...
      if (authenticated) {
        console.log(`Authentication successful for email address: ${user.emailAddress}`);

        // Then store the retrieved user object on the request object as currentUser 
        req.currentUser = user;
      } else {
        message = `Authentication failure for email address: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for email address: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }

  // If user authentication failed...
  if (message) {
    console.warn(message);

    // Return a response with a 401 Unauthorized HTTP status code.
    res.status(401).json({ message: 'Access Denied' });
  } else {
    // Or if user authentication succeeded...
    // Call the next() method.
    next();
  }
};

// Async Helper Function
const asyncHandler = cb => (
    async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

readUser = require('./user/read-user')(router, authenticateUser, asyncHandler, User);
createUser = require('./user/create-user')(router, asyncHandler, bcryptjs, User);
readCourses = require('./course/read-courses')(router, asyncHandler, Course, User);
readCourse = require('./course/read-course')(router, asyncHandler, Course, User);
createCourse = require('./course/create-course')(router, authenticateUser, asyncHandler, Course);
updateCourse = require('./course/update-course')(router, authenticateUser, asyncHandler, Course);
deleteCourse = require('./course/delete-course')(router, authenticateUser, asyncHandler, Course);

module.exports = router;
