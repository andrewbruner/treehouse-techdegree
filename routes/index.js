const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
// use code below to hash a new user's password
// user.password = bcryptjs.hashSync(user.password);
const auth = require('basic-auth');
const db = require('../models');
const { User } = db.models;
const { Course } = db.models;

// authentication middleware
const authenticateUser = (req, res, next) => {
   let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  if (credentials) {
    // Attempt to retrieve the user from the database by their email address (i.e. the user's "key" from the Authorization header).
    const user = User.findOne({
        where: {
            emailAddress: credentials.name
        }
    });

    // If a user was successfully retrieved from the database...
    if (user) {
      // Use the bcryptjs npm package to compare the user's password (from the Authorization header) to the user's password that was retrieved from the database.
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);

      // If the passwords match...
      if (authenticated) {
        console.log(`Authentication successful for email address: ${user.emailAddress}`);

        // Then store the retrieved user object on the request object so any middleware functions that follow this middleware function will have access to the user's information.
        req.currentUser = user;
      } else {
        message = `Authentication failure for email address: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for email address: ${credentials.emailAddress}`;
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
createUser = require('./user/create-user');
readCourses = require('./course/read-courses');
readCourse = require('./course/read-course');
createCourse = require('./course/create-course');
updateCourse = require('./course/update-course');
deleteCourse = require('./course/delete-course');



router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll();
    res.json(courses);
}));

module.exports = router;