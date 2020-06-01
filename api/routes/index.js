// Dependencies
const express = require('express');
const router = express.Router();
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const db = require('../models');
const { User } = db.models;
const { Course } = db.models;

// Authentication Middleware
const authenticateUser = async (req, res, next) => {

  // Error Message
  let message = null;

  // Credential Retrieval ({ name, pass, })
  const credentials = auth(req);

  // Successful Credentail Retrieval
  if (credentials) {

    // User Retrieval
    const user = await User.findOne({
      where: {
        emailAddress: credentials.name,
      },
    });

    // Successful User Retrieval
    if (user) {

      // User Authentication
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);

      // Successful User Authentication
      if (authenticated) {

        console.log(`Authentication successful for email address: ${user.emailAddress}`);

        // Current User Storage
        req.currentUser = user;

      // Unsuccessful User Authentication
      } else {

        message = `Authentication failure for email address: ${user.emailAddress}`;
      
      }

    // Unsuccessful User Retrieval
    } else {
      
      message = `User not found for email address: ${credentials.name}`;

    }

  // Unsuccessful Credential Retrieval
  } else {
  
    message = 'Auth header not found';
  
  }

  // Unsuccessful Authentication
  if (message) {

    console.warn(message);

    res.status(401).json({ message: 'Access Denied', });

  // Successful Authentication
  } else {

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
