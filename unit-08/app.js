/* ---------- EXPRESS ---------- */

// Include Express Module
const express = require('express');

// Create Express Application
const app = express();


/* ---------- CONFIGURATION ---------- */

// Template Engine Configuration
app.set('view engine', 'pug');

// Static Files Hosting Configuration
app.use('/static', express.static('public'));

// Enable Access to Request Body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* ---------- DATABASE ---------- */

const db = require('./models');
const { Book } = db.models;


/* ---------- ROUTES ---------- */

// Require routes File
const routes = require('./routes')(app, db, Book);


/* ---------- INITIALIZATION IIFE ---------- */
(async () => {

  // Test Database Connection
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }

  // Force-Sync All Database Models
  try {
    await db.sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database: ', error);
  }

  // Initialize Server
  try {
    app.listen(3000, () => console.log('Server listening on port 3000...'));
  } catch (error) {
    console.error('Server connection error: ', error);
  }
})();